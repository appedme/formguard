import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "@/stack/server";
import { getUserByStackAuthId } from "@/db/actions/user.actions";
import { getFormById } from "@/db/actions/form.actions";
import { createInsight, deleteInsight, getMonthlyInsightCount } from "@/db/actions/insight.actions";
import { generateInsight } from "@/lib/insight-engine";
import { PLAN_LIMITS } from "@/lib/plans";

export async function POST(
	req: NextRequest,
	{ params }: { params: Promise<{ formId: string }> }
) {
	try {
		const stackUser = await stackServerApp.getUser();
		if (!stackUser) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const dbUser = await getUserByStackAuthId(stackUser.id);
		if (!dbUser) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		// Check plan allows AI
		const limits = PLAN_LIMITS[dbUser.plan];
		if (!limits.aiInsights) {
			return NextResponse.json(
				{ error: "AI Insights require a Pro or Growth plan. Upgrade from Settings." },
				{ status: 403 }
			);
		}

		// Check monthly generation limit
		const monthlyCount = await getMonthlyInsightCount(dbUser.id);
		if (monthlyCount >= limits.aiInsightsPerMonth) {
			return NextResponse.json(
				{
					error: `Monthly limit reached (${monthlyCount}/${limits.aiInsightsPerMonth}). ${dbUser.plan === "pro" ? "Upgrade to Growth for unlimited insights." : "Try again next month."}`,
					monthlyCount,
					monthlyLimit: limits.aiInsightsPerMonth,
				},
				{ status: 429 }
			);
		}

		const { formId } = await params;
		const form = await getFormById(formId, dbUser.id);
		if (!form) {
			return NextResponse.json({ error: "Form not found" }, { status: 404 });
		}

		// Generate insight
		const summary = await generateInsight(formId);
		const insight = await createInsight(formId, summary);

		return NextResponse.json({
			insight,
			usage: {
				used: monthlyCount + 1,
				limit: limits.aiInsightsPerMonth,
			},
		}, { status: 201 });
	} catch (error) {
		console.error("Insight generation error:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}

export async function DELETE(
	req: NextRequest,
	{ params }: { params: Promise<{ formId: string }> }
) {
	try {
		const stackUser = await stackServerApp.getUser();
		if (!stackUser) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const dbUser = await getUserByStackAuthId(stackUser.id);
		if (!dbUser) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		const body = await req.json() as { insightId?: string };
		const { insightId } = body;
		if (!insightId) {
			return NextResponse.json({ error: "insightId is required" }, { status: 400 });
		}

		await deleteInsight(insightId, dbUser.id);
		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Insight deletion error:", error);
		return NextResponse.json({ error: "Failed to delete insight" }, { status: 500 });
	}
}
