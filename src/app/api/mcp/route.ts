import { NextRequest, NextResponse } from "next/server";
import { validateApiKey } from "@/db/actions/api-key.actions";
import { db } from "@/db";
import { forms, submissions, insights } from "@/db/schema";
import { eq, desc, and } from "drizzle-orm";
import { nanoid } from "nanoid";

/**
 * MCP over HTTP (Streamable HTTP) implementation for Next.js App Router
 * NOTE: Must use Node.js runtime (not edge) because validateApiKey imports a 'use server' module.
 */

const SERVER_NAME = "formguard-server";
const SERVER_VERSION = "1.1.0";

const TOOLS = [
    {
        name: "list_forms",
        description: "List all forms in the FormGuard account",
        inputSchema: { type: "object", properties: {} },
    },
    {
        name: "get_form_details",
        description: "Get detailed settings and fields for a specific form",
        inputSchema: {
            type: "object",
            properties: {
                endpointId: { type: "string", description: "The endpoint ID of the form" },
            },
            required: ["endpointId"],
        },
    },
    {
        name: "create_form",
        description: "Create a new form",
        inputSchema: {
            type: "object",
            properties: {
                name: { type: "string", description: "The name of the form" },
            },
            required: ["name"],
        },
    },
    {
        name: "delete_form",
        description: "Delete an existing form",
        inputSchema: {
            type: "object",
            properties: {
                endpointId: { type: "string", description: "The endpoint ID of the form to delete" },
            },
            required: ["endpointId"],
        },
    },
    {
        name: "update_form_settings",
        description: "Update form settings (webhooks, public page, redirection, etc.)",
        inputSchema: {
            type: "object",
            properties: {
                endpointId: { type: "string", description: "The endpoint ID of the form" },
                name: { type: "string" },
                redirectUrl: { type: "string" },
                webhookUrl: { type: "string" },
                webhookEnabled: { type: "boolean" },
                slackWebhookUrl: { type: "string" },
                discordWebhookUrl: { type: "string" },
                emailNotifications: { type: "boolean" },
                autoResponderEnabled: { type: "boolean" },
                autoResponderSubject: { type: "string" },
                autoResponderMessage: { type: "string" },
                isPublic: { type: "boolean" },
                publicFormDescription: { type: "string" },
                publicFormButtonText: { type: "string" },
                turnstileEnabled: { type: "boolean" },
            },
            required: ["endpointId"],
        },
    },
    {
        name: "get_recent_submissions",
        description: "Get the latest submissions for a form",
        inputSchema: {
            type: "object",
            properties: {
                endpointId: { type: "string", description: "The endpoint ID of the form" },
                limit: { type: "number", description: "Number of submissions to fetch (default 5)" },
            },
            required: ["endpointId"],
        },
    },
    {
        name: "get_ai_insights",
        description: "Get AI-generated insights for a form",
        inputSchema: {
            type: "object",
            properties: {
                endpointId: { type: "string", description: "The endpoint ID of the form" },
            },
            required: ["endpointId"],
        },
    },
];

async function handleToolCall(name: string, args: any, userId: string) {
    try {
        if (name === "list_forms") {
            const userForms = await db
                .select()
                .from(forms)
                .where(eq(forms.userId, userId))
                .orderBy(desc(forms.createdAt));
            return {
                content: [{ type: "text", text: JSON.stringify(userForms, null, 2) }],
            };
        }

        if (name === "create_form") {
            const [newForm] = await db.insert(forms).values({
                userId,
                name: args.name,
                endpointId: nanoid(12),
            }).returning();
            return {
                content: [{ type: "text", text: `Form created successfully: ${JSON.stringify(newForm, null, 2)}` }],
            };
        }

        const endpointId = args.endpointId;
        const [form] = await db
            .select()
            .from(forms)
            .where(and(eq(forms.endpointId, endpointId), eq(forms.userId, userId)))
            .limit(1);
        
        if (!form) throw new Error("Form not found or access denied");

        if (name === "get_form_details") {
            return {
                content: [{ type: "text", text: JSON.stringify(form, null, 2) }],
            };
        }

        if (name === "delete_form") {
            await db.delete(forms).where(eq(forms.id, form.id));
            return {
                content: [{ type: "text", text: `Form ${endpointId} deleted successfully.` }],
            };
        }

        if (name === "update_form_settings") {
            const { endpointId: _, ...updateData } = args;
            const [updatedForm] = await db.update(forms)
                .set(updateData)
                .where(eq(forms.id, form.id))
                .returning();
            return {
                content: [{ type: "text", text: `Form updated successfully: ${JSON.stringify(updatedForm, null, 2)}` }],
            };
        }

        if (name === "get_recent_submissions") {
            const limit = args.limit || 5;
            const recentSubmissions = await db
                .select()
                .from(submissions)
                .where(eq(submissions.formId, form.id))
                .orderBy(desc(submissions.createdAt))
                .limit(limit);

            return {
                content: [{ type: "text", text: JSON.stringify(recentSubmissions, null, 2) }],
            };
        }

        if (name === "get_ai_insights") {
            const formInsights = await db
                .select()
                .from(insights)
                .where(eq(insights.formId, form.id))
                .orderBy(desc(insights.createdAt));
            return {
                content: [{ type: "text", text: JSON.stringify(formInsights, null, 2) }],
            };
        }

        throw new Error(`Tool not found: ${name}`);
    } catch (error: any) {
        return {
            isError: true,
            content: [{ type: "text", text: error.message }],
        };
    }
}

export async function GET(req: NextRequest) {
    const authHeader = req.headers.get("x-api-key");
    if (!authHeader) return NextResponse.json({ error: "Missing API Key" }, { status: 401 });
    
    const apiKey = await validateApiKey(authHeader);
    if (!apiKey) return NextResponse.json({ error: "Invalid API Key" }, { status: 401 });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
        start(controller) {
            controller.enqueue(encoder.encode(`event: endpoint\ndata: ${req.nextUrl.pathname}\n\n`));
        }
    });

    return new Response(stream, {
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        },
    });
}

export async function POST(req: NextRequest) {
    const authHeader = req.headers.get("x-api-key");
    if (!authHeader) return NextResponse.json({ error: "Missing API Key" }, { status: 401 });
    
    const apiKey = await validateApiKey(authHeader);
    if (!apiKey) return NextResponse.json({ error: "Invalid API Key" }, { status: 401 });

    const body = await req.json() as any;
    const { method, params, id } = body;

    let result;

    if (method === "tools/list") {
        result = { tools: TOOLS };
    } else if (method === "tools/call") {
        result = await handleToolCall(params.name, params.arguments, apiKey.userId);
    } else if (method === "initialize") {
        result = {
            protocolVersion: "2024-11-05",
            capabilities: {
                tools: {},
            },
            serverInfo: {
                name: SERVER_NAME,
                version: SERVER_VERSION,
            },
        };
    } else {
        return NextResponse.json({
            jsonrpc: "2.0",
            error: { code: -32601, message: "Method not found" },
            id
        }, { status: 404 });
    }

    return NextResponse.json({
        jsonrpc: "2.0",
        result,
        id
    });
}
