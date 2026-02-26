import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "@/stack/server";
import { getUserByStackAuthId } from "@/db/actions/user.actions";
import { getFormById } from "@/db/actions/form.actions";
import { getAllFormSubmissions } from "@/db/actions/submission.actions";

export const dynamic = "force-dynamic";

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ formId: string }> }
) {
	const stackUser = await stackServerApp.getUser();
	if (!stackUser) return new NextResponse("Unauthorized", { status: 401 });

	const dbUser = await getUserByStackAuthId(stackUser.id);
	if (!dbUser) return new NextResponse("Unauthorized", { status: 401 });

	const { formId } = await params;
	const form = await getFormById(formId, dbUser.id);
	if (!form) return new NextResponse("Not Found", { status: 404 });

	const submissions = await getAllFormSubmissions(formId);

	if (submissions.length === 0) {
		return new NextResponse("No submissions to export", { status: 400 });
	}

	const format = request.nextUrl.searchParams.get("format") || "csv";

	if (format === "json") {
		const jsonData = submissions.map((sub) => ({
			id: sub.id,
			status: sub.isSpam ? "SPAM" : "CLEAN",
			date: new Date(sub.createdAt).toISOString(),
			ipAddress: sub.ipAddress || "",
			...(sub.payload as Record<string, any>),
		}));

		return new NextResponse(JSON.stringify(jsonData, null, 2), {
			headers: {
				"Content-Type": "application/json",
				"Content-Disposition": `attachment; filename="${form.name.toLowerCase().replace(/\s+/g, "_")}_submissions.json"`,
			},
		});
	}

	// CSV generation
	// Get all unique keys from payloads
	const allKeys = new Set<string>();
	submissions.forEach((sub) => {
		const payload = sub.payload as Record<string, any>;
		Object.keys(payload).forEach((key) => allKeys.add(key));
	});

	const headers = ["ID", "Status", "Date", "IP Address", ...Array.from(allKeys)];
	const csvRows = [headers.join(",")];

	submissions.forEach((sub) => {
		const payload = sub.payload as Record<string, any>;
		const row = [
			sub.id,
			sub.isSpam ? "SPAM" : "CLEAN",
			new Date(sub.createdAt).toISOString(),
			sub.ipAddress || "",
			...Array.from(allKeys).map((key) => {
				const val = payload[key];
				if (val === undefined || val === null) return "";
				// Escape quotes and wrap in quotes
				return `"${String(val).replace(/"/g, '""')}"`;
			}),
		];
		csvRows.push(row.join(","));
	});

	const csvString = csvRows.join("\n");

	return new NextResponse(csvString, {
		headers: {
			"Content-Type": "text/csv",
			"Content-Disposition": `attachment; filename="${form.name.toLowerCase().replace(/\s+/g, "_")}_submissions.csv"`,
		},
	});
}
