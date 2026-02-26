import { db } from "./src/db";
import { forms } from "./src/db/schema";
import { eq } from "drizzle-orm";

async function main() {
  const form = await db.select().from(forms).where(eq(forms.endpointId, "_kt01MFCZczx")).limit(1);
  if (form.length > 0) {
    console.log("Form emailNotifications:", form[0].emailNotifications);
    if (!form[0].emailNotifications) {
      await db.update(forms).set({ emailNotifications: true }).where(eq(forms.endpointId, "_kt01MFCZczx"));
      console.log("Enabled emailNotifications for form.");
    }
  }
}
main();
