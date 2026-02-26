import { db } from "../src/db";
import { forms, users } from "../src/db/schema";
import { eq } from "drizzle-orm";

async function main() {
  const result = await db
    .select({
      form: forms,
      userEmail: users.email
    })
    .from(forms)
    .leftJoin(users, eq(forms.userId, users.id))
    .where(eq(forms.endpointId, "_kt01MFCZczx"))
    .limit(1);
    
  if (result.length > 0) {
    console.log("User email:", result[0].userEmail);
    if (result[0].userEmail !== "sh20raj@gmail.com") {
      await db.update(users).set({ email: "sh20raj@gmail.com" }).where(eq(users.id, result[0].form.userId));
      console.log("Updated user email to sh20raj@gmail.com");
    }
  }
}
main();
