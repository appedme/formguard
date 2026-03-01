import Link from "next/link";
import { ArrowLeft, ExternalLink, FileSpreadsheet, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
	title: "Google Sheets Integration | FormGuard Docs",
	description: "Connect your FormGuard endpoints directly to Google Sheets in under 2 minutes.",
};

export default function GoogleSheetsDocPage() {
	return (
		<div className="bg-background min-h-screen pb-24">
			{/* Breadcrumbs & Header */}
			<section className="py-16 border-b border-border bg-muted/20">
				<div className="mx-auto max-w-4xl px-6">
					<Link href="/docs" className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground mb-8 transition-colors">
						<ArrowLeft className="w-3.5 h-3.5" /> Back to Documentation
					</Link>
					
					<div className="flex items-center gap-4 mb-6">
						<div className="p-3 bg-green-500/10 rounded-2xl border border-green-500/20">
							<FileSpreadsheet className="w-8 h-8 text-green-600" />
						</div>
						<h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
							Google Sheets Integration
						</h1>
					</div>
					<p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
						Seamlessly connect your FormGuard endpoints to any Google Sheet. Our verified Apps Script template safely routes and structures your incoming submissions automatically.
					</p>
					
					<div className="flex flex-wrap gap-4 mt-8">
						<a 
							href="https://script.google.com/d/1wtNjTNLtq20sPau_tNBmfCR4IDWir3X8-KZR2Yuns4WoCy2BRkQR4wiT/edit?usp=sharing" 
							target="_blank" 
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors shadow-sm"
						>
							View Demo Script <ExternalLink className="w-4 h-4 ml-1 opacity-70" />
						</a>
					</div>
				</div>
			</section>

			<div className="mx-auto max-w-4xl px-6 mt-16 space-y-16">
				{/* Step 1 */}
				<section>
					<div className="flex items-center gap-4 mb-6">
						<div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-black flex items-center justify-center">1</div>
						<h2 className="text-2xl font-bold tracking-tight">Prepare your Spreadsheet</h2>
					</div>
					<div className="pl-12 space-y-4 text-muted-foreground leading-relaxed">
						<p>
							Create a new Google Sheet (or open an existing one) where you want to collect your form submissions. You do not need to manually create columns or headers—our script will automatically detect the arriving fields and create headers on the first submission if the sheet is empty!
						</p>
					</div>
				</section>

				{/* Step 2 */}
				<section>
					<div className="flex items-center gap-4 mb-6">
						<div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-black flex items-center justify-center">2</div>
						<h2 className="text-2xl font-bold tracking-tight">Add the Apps Script Template</h2>
					</div>
					<div className="pl-12 space-y-6 text-muted-foreground leading-relaxed">
						<p>
							In your Google Sheet, click <strong>Extensions &gt; Apps Script</strong> from the top menu bar. This will open the Apps Script editor. Delete any existing code and paste the exact snippet below:
						</p>
						
						<div className="relative group rounded-xl overflow-hidden border border-border/40 bg-card/50">
							<div className="absolute top-0 left-0 w-full px-4 py-2 bg-muted/30 border-b border-border/40 flex items-center justify-between">
								<span className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider">doPost() Webhook Handler</span>
							</div>
							<pre className="p-6 pt-12 overflow-x-auto text-[13px] font-mono text-foreground/80 leading-relaxed scrollbar-thin">
{`function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Automatically add headers if the sheet is completely empty
    if (sheet.getLastRow() === 0) {
      var headers = Object.keys(data);
      headers.unshift('Timestamp'); // Add Timestamp as the first column
      sheet.appendRow(headers);
    }
    
    // Map the incoming JSON payload to the correct columns dynamically
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var rowData = headers.map(function(header) {
      if (header === 'Timestamp') return new Date();
      return data[header] !== undefined ? data[header] : '';
    });
    
    // Append the newly formed row
    sheet.appendRow(rowData);
    
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({ 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`}
							</pre>
						</div>
					</div>
				</section>

				{/* Step 3 */}
				<section>
					<div className="flex items-center gap-4 mb-6">
						<div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-black flex items-center justify-center">3</div>
						<h2 className="text-2xl font-bold tracking-tight">Deploy as Web App</h2>
					</div>
					<div className="pl-12 space-y-4 text-muted-foreground leading-relaxed">
						<p>Save your script by clicking the floppy disk icon. Then, deploy the integration:</p>
						<ol className="list-decimal list-outside ml-4 space-y-3 pt-2">
							<li>Click the blue <strong>Deploy</strong> button in the top right corner and select <strong>New deployment</strong>.</li>
							<li>Click the gear icon next to "Select type" and choose <strong>Web app</strong>.</li>
							<li>Set "Execute as" to <strong>Me</strong>.</li>
							<li><strong>CRUCIAL:</strong> Set "Who has access" to <strong>Anyone</strong>. (If this is not set to Anyone, FormGuard cannot securely POST to it without Google Authentication).</li>
							<li>Click <strong>Deploy</strong>. You may be asked to authorize access to your Google Account. Click "Review permissions", select your account, click "Advanced", and then "Go to project (unsafe)" to grant access.</li>
						</ol>
					</div>
				</section>

				{/* Step 4 */}
				<section>
					<div className="flex items-center gap-4 mb-6">
						<div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-black flex items-center justify-center">4</div>
						<h2 className="text-2xl font-bold tracking-tight">Connect to FormGuard</h2>
					</div>
					<div className="pl-12 space-y-4 text-muted-foreground leading-relaxed">
						<p>
							Once deployed, Google will provide you with a unique <strong>Web app URL</strong> (it starts with <code className="text-xs bg-muted px-1 py-0.5 rounded">https://script.google.com/macros/...</code>).
						</p>
						<p>
							Copy that exact URL, navigate back to your FormGuard Dashboard, open your Form, click the <strong>Integrations</strong> tab, and paste it into the Google Sheets input box. Click Save, and you're done!
						</p>
					</div>
				</section>
			</div>
		</div>
	);
}
