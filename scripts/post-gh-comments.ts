import { execSync } from 'child_process';
import fs from 'fs';

const artifactPath = '/Users/shaswatraj/.gemini/antigravity/brain/4a8571e1-6560-4a75-b7df-44f197316288/github_outreach_campaign.md';
const content = fs.readFileSync(artifactPath, 'utf8');

const targets: { url: string; owner: string; repo: string; number: string; comment: string }[] = [];

const sections = content.split('### ').slice(1);

for (const section of sections) {
  const urlMatch = section.match(/https:\/\/github\.com\/([^/]+)\/([^/]+)\/issues\/(\d+)/);
  if (!urlMatch) continue;
  
  const url = urlMatch[0];
  const owner = urlMatch[1];
  const repo = urlMatch[2];
  const number = urlMatch[3];
  
  const commentStart = section.indexOf('>');
  if (commentStart === -1) continue;
  
  const commentEnd = section.indexOf('\n\n', commentStart);
  let commentBox = section.substring(commentStart, commentEnd !== -1 ? commentEnd : section.length).trim();
  
  // Clean up the comment (remove > )
  const commentLines = commentBox.split('\n').map(line => line.replace(/^>\s?/, '').trim());
  const comment = commentLines.join(' ').trim();
  
  targets.push({ url, owner, repo, number, comment });
}

console.log(`Found ${targets.length} issues to comment on.`);

const TIER_1_TARGETS = targets.slice(7);

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function postComments() {
  for (const target of TIER_1_TARGETS) {
    console.log(`\nPosting to ${target.owner}/${target.repo}#${target.number}...`);
    try {
      const tempFile = `/tmp/gh-comment-${target.number}.txt`;
      fs.writeFileSync(tempFile, target.comment, 'utf8');
      const cmd = `gh issue comment https://github.com/${target.owner}/${target.repo}/issues/${target.number} --body-file ${tempFile}`;
      console.log(`Executing: ${cmd}`);
      execSync(cmd, { stdio: 'inherit' });
      console.log(`✅ Successfully posted on ${target.url}`);
      await sleep(15000); // Sleep 15s between comments to avoid spam limits
    } catch (e: any) {
      console.error(`❌ Failed to post on ${target.url}:`, e.message);
    }
  }
}

postComments();
