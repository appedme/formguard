"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  FileSpreadsheet,
  Send,
  BookOpen,
  Save,
  Check,
  Loader2,
  ExternalLink,
  Webhook,
  Zap,
} from "lucide-react";
import { updateForm } from "@/db/actions/form.actions";
import { toast } from "sonner";

interface IntegrationsClientProps {
  form: {
    id: string;
    googleSheetsUrl: string | null;
    telegramBotToken: string | null;
    telegramChatId: string | null;
    notionDatabaseId: string | null;
    notionToken: string | null;
    webhookUrl: string | null;
    webhookEnabled: boolean;
    endpointId: string;
  };
}

export function IntegrationsClient({ form }: IntegrationsClientProps) {
  const [saving, setSaving] = useState<string | null>(null);

  // Google Sheets state
  const [sheetsUrl, setSheetsUrl] = useState(form.googleSheetsUrl || "");

  // Telegram state
  const [tgToken, setTgToken] = useState(form.telegramBotToken || "");
  const [tgChatId, setTgChatId] = useState(form.telegramChatId || "");

  // Notion state
  const [notionToken, setNotionToken] = useState(form.notionToken || "");
  const [notionDbId, setNotionDbId] = useState(form.notionDatabaseId || "");

  const userId = ""; // Not needed for updateForm since it verifies ownership

  const handleSave = async (
    integration: string,
    data: Record<string, unknown>,
  ) => {
    setSaving(integration);
    try {
      await updateForm(form.id, userId, data);
      toast.success(`${integration} settings saved!`);
    } catch (error) {
      toast.error(`Failed to save ${integration} settings.`);
    } finally {
      setSaving(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Google Sheets */}
      <Card className="border-border/40 shadow-none rounded-2xl overflow-hidden">
        <CardHeader className="bg-green-500/5 border-b border-border/40 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-xl">
                <FileSpreadsheet className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-sm font-black">
                  Google Sheets
                </CardTitle>
                <CardDescription className="text-[10px] font-medium">
                  Auto-append submissions to a spreadsheet
                </CardDescription>
              </div>
            </div>
            <Badge
              variant={sheetsUrl ? "default" : "secondary"}
              className="text-[9px] uppercase font-black tracking-widest"
            >
              {sheetsUrl ? "Connected" : "Not Configured"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest opacity-60">
              Google Apps Script Web App URL
            </Label>
            <Input
              placeholder="https://script.google.com/macros/s/..."
              className="h-10 bg-muted/20 border-border/40 rounded-xl text-xs font-mono"
              value={sheetsUrl}
              onChange={(e) => setSheetsUrl(e.target.value)}
            />
          </div>
          <div className="p-4 bg-muted/20 rounded-xl border border-border/40">
            <p className="text-[10px] font-bold text-muted-foreground mb-2">
              HOW TO SET UP:
            </p>
            <ol className="text-[10px] text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Open Google Sheets &rarr; Extensions &rarr; Apps Script</li>
              <li>
                Paste the doPost handler code{" "}
                <a
                  href="https://developers.google.com/apps-script/guides/web#request_parameters"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  (View Google Docs)
                </a>
                <div className="mt-2 p-3 bg-background border border-border/40 rounded-lg">
                  <p className="font-semibold text-foreground select-none mb-2">
                    Apps Script Code Template:
                  </p>
                  <pre className="p-3 bg-muted rounded-md overflow-x-auto text-[10px] text-foreground font-mono select-all">
                    {`function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    if (sheet.getLastRow() === 0) {
      var headers = Object.keys(data);
      headers.push('Timestamp');
      sheet.appendRow(headers);
    }
    
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var rowData = headers.map(function(header) {
      if (header === 'Timestamp') return new Date();
      return data[header] !== undefined ? data[header] : '';
    });
    
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
              </li>
              <li>Deploy as Web App &rarr; Copy the URL above</li>
            </ol>
          </div>
          <Button
            className="h-10 rounded-xl text-xs font-bold"
            onClick={() =>
              handleSave("Google Sheets", {
                googleSheetsUrl: sheetsUrl || null,
              })
            }
            disabled={saving === "Google Sheets"}
          >
            {saving === "Google Sheets" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Save className="w-3.5 h-3.5 mr-2" /> Save
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Telegram */}
      <Card className="border-border/40 shadow-none rounded-2xl overflow-hidden">
        <CardHeader className="bg-blue-500/5 border-b border-border/40 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-xl">
                <Send className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <CardTitle className="text-sm font-black">
                  Telegram Bot
                </CardTitle>
                <CardDescription className="text-[10px] font-medium">
                  Get instant submission notifications in Telegram
                </CardDescription>
              </div>
            </div>
            <Badge
              variant={tgToken && tgChatId ? "default" : "secondary"}
              className="text-[9px] uppercase font-black tracking-widest"
            >
              {tgToken && tgChatId ? "Connected" : "Not Configured"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest opacity-60">
                Bot Token
              </Label>
              <Input
                placeholder="123456:ABC-DEF..."
                className="h-10 bg-muted/20 border-border/40 rounded-xl text-xs font-mono"
                value={tgToken}
                onChange={(e) => setTgToken(e.target.value)}
                type="password"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest opacity-60">
                Chat ID
              </Label>
              <Input
                placeholder="-1001234567890"
                className="h-10 bg-muted/20 border-border/40 rounded-xl text-xs font-mono"
                value={tgChatId}
                onChange={(e) => setTgChatId(e.target.value)}
              />
            </div>
          </div>
          <div className="p-4 bg-muted/20 rounded-xl border border-border/40">
            <p className="text-[10px] font-bold text-muted-foreground mb-2">
              HOW TO SET UP:
            </p>
            <ol className="text-[10px] text-muted-foreground space-y-1 list-decimal list-inside">
              <li>
                Message{" "}
                <a
                  href="https://t.me/BotFather"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  @BotFather
                </a>{" "}
                on Telegram &rarr; /newbot
              </li>
              <li>Copy the Bot Token above</li>
              <li>Add the bot to your group/channel, then get the Chat ID</li>
            </ol>
          </div>
          <Button
            className="h-10 rounded-xl text-xs font-bold"
            onClick={() =>
              handleSave("Telegram", {
                telegramBotToken: tgToken || null,
                telegramChatId: tgChatId || null,
              })
            }
            disabled={saving === "Telegram"}
          >
            {saving === "Telegram" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Save className="w-3.5 h-3.5 mr-2" /> Save
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Notion */}
      <Card className="border-border/40 shadow-none rounded-2xl overflow-hidden">
        <CardHeader className="bg-foreground/5 border-b border-border/40 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-foreground/10 rounded-xl">
                <BookOpen className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <CardTitle className="text-sm font-black">Notion</CardTitle>
                <CardDescription className="text-[10px] font-medium">
                  Create database entries from submissions
                </CardDescription>
              </div>
            </div>
            <Badge
              variant={notionToken && notionDbId ? "default" : "secondary"}
              className="text-[9px] uppercase font-black tracking-widest"
            >
              {notionToken && notionDbId ? "Connected" : "Not Configured"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest opacity-60">
                Integration Token
              </Label>
              <Input
                placeholder="ntn_..."
                className="h-10 bg-muted/20 border-border/40 rounded-xl text-xs font-mono"
                value={notionToken}
                onChange={(e) => setNotionToken(e.target.value)}
                type="password"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest opacity-60">
                Database ID
              </Label>
              <Input
                placeholder="abc123def456..."
                className="h-10 bg-muted/20 border-border/40 rounded-xl text-xs font-mono"
                value={notionDbId}
                onChange={(e) => setNotionDbId(e.target.value)}
              />
            </div>
          </div>
          <div className="p-4 bg-muted/20 rounded-xl border border-border/40">
            <p className="text-[10px] font-bold text-muted-foreground mb-2">
              HOW TO SET UP:
            </p>
            <ol className="text-[10px] text-muted-foreground space-y-1 list-decimal list-inside">
              <li>
                Go to{" "}
                <a
                  href="https://www.notion.so/my-integrations"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  Notion Integrations
                </a>{" "}
                &rarr; New Integration
              </li>
              <li>Copy the Internal Integration Token</li>
              <li>
                Share your database with the integration &rarr; copy the
                Database ID from the URL
              </li>
            </ol>
          </div>
          <Button
            className="h-10 rounded-xl text-xs font-bold"
            onClick={() =>
              handleSave("Notion", {
                notionToken: notionToken || null,
                notionDatabaseId: notionDbId || null,
              })
            }
            disabled={saving === "Notion"}
          >
            {saving === "Notion" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Save className="w-3.5 h-3.5 mr-2" /> Save
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Zapier / Make / n8n */}
      <Card className="border-border/40 shadow-none rounded-2xl overflow-hidden">
        <CardHeader className="bg-orange-500/5 border-b border-border/40 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500/10 rounded-xl">
                <Zap className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <CardTitle className="text-sm font-black">
                  Zapier / Make / n8n
                </CardTitle>
                <CardDescription className="text-[10px] font-medium">
                  Connect to 7,000+ apps via webhook automation
                </CardDescription>
              </div>
            </div>
            <Badge
              variant={
                form.webhookEnabled && form.webhookUrl ? "default" : "secondary"
              }
              className="text-[9px] uppercase font-black tracking-widest"
            >
              {form.webhookEnabled && form.webhookUrl
                ? "Active"
                : "Via Webhook"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Use the generic webhook URL from your{" "}
            <strong>General Settings</strong> to connect FormGuard to Zapier,
            Make, n8n, or any automation platform.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a
              href="https://zapier.com/apps/webhook"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-muted/20 border border-border/40 rounded-xl flex items-center gap-3 hover:border-primary/20 transition-colors group"
            >
              <Webhook className="w-4 h-4 text-orange-500" />
              <div>
                <p className="text-xs font-bold">Zapier</p>
                <p className="text-[10px] text-muted-foreground">Catch Hook</p>
              </div>
              <ExternalLink className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground" />
            </a>
            <a
              href="https://www.make.com/en/help/tools/webhooks"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-muted/20 border border-border/40 rounded-xl flex items-center gap-3 hover:border-primary/20 transition-colors group"
            >
              <Webhook className="w-4 h-4 text-purple-500" />
              <div>
                <p className="text-xs font-bold">Make</p>
                <p className="text-[10px] text-muted-foreground">
                  Custom Webhook
                </p>
              </div>
              <ExternalLink className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground" />
            </a>
            <a
              href="https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-muted/20 border border-border/40 rounded-xl flex items-center gap-3 hover:border-primary/20 transition-colors group"
            >
              <Webhook className="w-4 h-4 text-red-500" />
              <div>
                <p className="text-xs font-bold">n8n</p>
                <p className="text-[10px] text-muted-foreground">
                  Webhook Node
                </p>
              </div>
              <ExternalLink className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground" />
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
