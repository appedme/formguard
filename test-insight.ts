import { generateInsight } from "./src/lib/insight-engine";

async function main() {
  console.log("Generating insight...");
  const insight = await generateInsight("b067f911-a9c8-46f0-abee-a43173957559");
  console.log("Insight result:");
  console.log(insight);
}
main();
