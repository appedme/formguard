"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { 
	Card, 
	CardContent, 
	CardDescription, 
	CardFooter, 
	CardHeader, 
	CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
	Form, 
	FormControl, 
	FormDescription, 
	FormField, 
	FormItem, 
	FormLabel, 
	FormMessage 
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Save, Trash2, Webhook, Mail, RotateCw } from "lucide-react";
import { updateForm, deleteForm } from "@/db/actions/form.actions";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const formSchema = z.object({
	name: z.string().min(2, {
		message: "Name must be at least 2 characters.",
	}),
	redirectUrl: z.string().url({ message: "Invalid URL" }).optional().or(z.literal("")),
	errorUrl: z.string().url({ message: "Invalid URL" }).optional().or(z.literal("")),
	webhookUrl: z.string().url({ message: "Invalid URL" }).optional().or(z.literal("")),
	slackWebhookUrl: z.string().url({ message: "Invalid URL" }).optional().or(z.literal("")),
	discordWebhookUrl: z.string().url({ message: "Invalid URL" }).optional().or(z.literal("")),
	allowedOrigins: z.string().optional().or(z.literal("")),
	emailNotifications: z.boolean(),
	webhookEnabled: z.boolean(),
	turnstileEnabled: z.boolean(),
	autoResponderEnabled: z.boolean(),
	autoResponderSubject: z.string().optional().or(z.literal("")),
	autoResponderMessage: z.string().optional().or(z.literal("")),
});

interface FormSettingsClientProps {
	form: {
		id: string;
		userId: string;
		name: string;
		redirectUrl: string | null;
		errorUrl: string | null;
		webhookUrl: string | null;
		slackWebhookUrl: string | null;
		discordWebhookUrl: string | null;
		allowedOrigins: string | null;
		emailNotifications: boolean;
		webhookEnabled: boolean;
		turnstileEnabled: boolean;
		autoResponderEnabled: boolean;
		autoResponderSubject: string | null;
		autoResponderMessage: string | null;
	};
}

export function FormSettingsClient({ form: initialData }: FormSettingsClientProps) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: initialData.name,
			redirectUrl: initialData.redirectUrl || "",
			errorUrl: initialData.errorUrl || "",
			webhookUrl: initialData.webhookUrl || "",
			slackWebhookUrl: initialData.slackWebhookUrl || "",
			discordWebhookUrl: initialData.discordWebhookUrl || "",
			allowedOrigins: initialData.allowedOrigins || "*",
			emailNotifications: initialData.emailNotifications,
			webhookEnabled: initialData.webhookEnabled,
			turnstileEnabled: initialData.turnstileEnabled,
			autoResponderEnabled: initialData.autoResponderEnabled,
			autoResponderSubject: initialData.autoResponderSubject || "",
			autoResponderMessage: initialData.autoResponderMessage || "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setIsLoading(true);
		try {
			const result = await updateForm(initialData.id, initialData.userId, {
				name: values.name,
				redirectUrl: values.redirectUrl || null,
				errorUrl: values.errorUrl || null,
				webhookUrl: values.webhookUrl || null,
				slackWebhookUrl: values.slackWebhookUrl || null,
				discordWebhookUrl: values.discordWebhookUrl || null,
				allowedOrigins: values.allowedOrigins || null,
				emailNotifications: values.emailNotifications,
				webhookEnabled: values.webhookEnabled,
				turnstileEnabled: values.turnstileEnabled,
				autoResponderEnabled: values.autoResponderEnabled,
				autoResponderSubject: values.autoResponderSubject || null,
				autoResponderMessage: values.autoResponderMessage || null,
			});

			if (result) {
				toast.success("Form settings updated");
				router.refresh();
			} else {
				toast.error("Failed to update form settings");
			}
		} catch (error) {
			toast.error("An error occurred");
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	}

    async function onDelete() {
        setIsDeleting(true);
        try {
            const result = await deleteForm(initialData.id, initialData.userId);
            if (result) {
                toast.success("Form deleted successfully");
                router.push("/dashboard");
            } else {
                toast.error("Failed to delete form");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setIsDeleting(false);
        }
    }

	return (
		<div className="space-y-6">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					
					{/* General Settings */}
					<Card>
						<CardHeader>
							<CardTitle>General Settings</CardTitle>
							<CardDescription>
								Basic configuration for your form.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Form Name</FormLabel>
										<FormControl>
											<Input placeholder="Contact Form" {...field} />
										</FormControl>
										<FormDescription>
											This is how your form will be identified in the dashboard.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</CardContent>
					</Card>

					{/* Custom Redirects */}
					<Card>
						<CardHeader>
							<CardTitle>Redirects</CardTitle>
							<CardDescription>
								Control where users are sent after submission.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<FormField
								control={form.control}
								name="redirectUrl"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Success Redirect URL</FormLabel>
										<FormControl>
											<Input placeholder="https://example.com/thank-you" {...field} />
										</FormControl>
										<FormDescription>
											Where to send users after a successful submission. Leave blank for default JSON response.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
                            {/* Error URL (Hidden for now, maybe add later if schema supports custom error pages) */}
						</CardContent>
					</Card>

					{/* Security */}
					<Card>
						<CardHeader>
							<CardTitle>Security</CardTitle>
							<CardDescription>
								Control who can submit to your form.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<FormField
								control={form.control}
								name="allowedOrigins"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Allowed Domains (CORS)</FormLabel>
										<FormControl>
											<Input placeholder="example.com, my-site.com" {...field} />
										</FormControl>
										<FormDescription>
											Comma-separated list of domains allowed to submit. Keep the default <code className="bg-muted px-1 py-0.5 rounded">*</code> to allow all origins.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
                            <Separator />
							<FormField
								control={form.control}
								name="turnstileEnabled"
								render={({ field }) => (
									<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
										<div className="space-y-0.5">
											<FormLabel className="text-base">
												Spam Protection (Cloudflare Turnstile)
											</FormLabel>
											<FormDescription>
												Enable CAPTCHA verification to prevent spam.
											</FormDescription>
										</div>
										<FormControl>
											<Switch
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</CardContent>
					</Card>

					{/* Notifications */}
					<Card>
						<CardHeader>
							<CardTitle>Notifications & Auto-Responders</CardTitle>
							<CardDescription>
								Get alerted when new submissions arrive and send automatic replies.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<FormField
								control={form.control}
								name="emailNotifications"
								render={({ field }) => (
									<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
										<div className="space-y-0.5">
											<FormLabel className="text-base">
												Email Notifications
											</FormLabel>
											<FormDescription>
												Receive an email whenever a new submission is received.
											</FormDescription>
										</div>
										<FormControl>
											<Switch
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<Separator />
							<FormField
								control={form.control}
								name="autoResponderEnabled"
								render={({ field }) => (
									<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
										<div className="space-y-0.5">
											<FormLabel className="text-base">
												Auto-Responder
											</FormLabel>
											<FormDescription>
												Send an automatic email reply to the submitter (requires an &quot;email&quot; field in the form).
											</FormDescription>
										</div>
										<FormControl>
											<Switch
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							{form.watch("autoResponderEnabled") && (
								<div className="space-y-4 pt-4">
									<FormField
										control={form.control}
										name="autoResponderSubject"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email Subject</FormLabel>
												<FormControl>
													<Input placeholder="Thank you for your submission!" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="autoResponderMessage"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email Message</FormLabel>
												<FormControl>
													<textarea 
														className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
														placeholder="We have received your message and will get back to you shortly." 
														{...field} 
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							)}
						</CardContent>
					</Card>
					
					{/* Webhooks */}
					<Card>
						<CardHeader>
							<CardTitle>Webhooks & Integrations</CardTitle>
							<CardDescription>
								Send submission data to external services via HTTP POST.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<FormField
								control={form.control}
								name="webhookEnabled"
								render={({ field }) => (
									<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
										<div className="space-y-0.5">
											<FormLabel className="text-base">
												Enable Webhooks
											</FormLabel>
											<FormDescription>
												Turn on/off webhook delivery.
											</FormDescription>
										</div>
										<FormControl>
											<Switch
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
                            {form.watch("webhookEnabled") && (
								<div className="space-y-4 pt-4">
									<FormField
										control={form.control}
										name="webhookUrl"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Custom Webhook URL</FormLabel>
												<FormControl>
													<Input placeholder="https://api.example.com/webhook" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="slackWebhookUrl"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Slack Webhook URL</FormLabel>
												<FormControl>
													<Input placeholder="https://hooks.slack.com/services/..." {...field} />
												</FormControl>
												<FormDescription>
													Send a formatted message to a Slack channel.
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="discordWebhookUrl"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Discord Webhook URL</FormLabel>
												<FormControl>
													<Input placeholder="https://discord.com/api/webhooks/..." {...field} />
												</FormControl>
												<FormDescription>
													Send a formatted message to a Discord channel.
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
                            )}
						</CardContent>
					</Card>

					<div className="flex justify-end">
						<Button type="submit" disabled={isLoading}>
							{isLoading && <RotateCw className="mr-2 h-4 w-4 animate-spin" />}
							Save Changes
						</Button>
					</div>

				</form>
			</Form>

            {/* Danger Zone */}
            <Card className="border-destructive/50 mt-10">
                <CardHeader>
                    <CardTitle className="text-destructive">Danger Zone</CardTitle>
                    <CardDescription>
                        Irreversible actions. Be careful.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Delete Form</p>
                            <p className="text-sm text-muted-foreground">
                                Permanently delete this form and all its submissions.
                            </p>
                        </div>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="sm">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete Form
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete your
                                        form and remove the data from our servers.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction 
                                        onClick={onDelete}
                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                        {isDeleting ? "Deleting..." : "Delete Form"}
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </CardContent>
            </Card>
		</div>
	);
}
