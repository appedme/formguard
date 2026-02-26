import { db } from "./src/db";
import { forms } from "./src/db/schema";

async function main() {
  const allForms = await db.select().from(forms).limit(1);
  if (allForms.length > 0) {
    console.log("Found form endpointId:", allForms[0].endpointId);
  } else {
    console.log("No forms found.");
  }
}
main();
