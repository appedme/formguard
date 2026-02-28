import { db } from "./src/db/index.js";
import { forms } from "./src/db/schema.js";

async function run() {
  const result = await db.select().from(forms).limit(1);
  console.log("Endpoint ID:", result[0]?.endpointId);
  process.exit(0);
}
run();
