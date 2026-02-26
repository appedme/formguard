import { db } from "./src/db";
import { forms, submissions } from "./src/db/schema";
import { eq, count } from "drizzle-orm";

async function check() {
    const endpointId = "_kt01MFCZczx";
    const result = await db.select().from(forms).where(eq(forms.endpointId, endpointId)).limit(1);
    const form = result[0];
    console.log("Form found:", form);

    if (form) {
        const totalResult = await db.select({ count: count() }).from(submissions).where(eq(submissions.formId, form.id));
        console.log("Total submissions count:", totalResult[0].count);

        const list = await db.select().from(submissions).where(eq(submissions.formId, form.id)).limit(10);
        console.log("Submissions list (first 10):", list);
    } else {
        console.log("Form not found for endpoint ID:", endpointId);
    }
}

check().catch(console.error);
