"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { createFeedback } from "@/db/actions/feedback.actions";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

export function ContactForm() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!name || !email || !message) {
			toast.error("Please fill in all fields.");
			return;
		}

		setLoading(true);
		try {
			await createFeedback(name, email, message);
			setSubmitted(true);
			toast.success("Feedback submitted! Thank you.");
		} catch (error) {
			toast.error("Failed to submit feedback. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	if (submitted) {
		return (
			<div className="flex flex-col items-center justify-center p-12 text-center bg-primary/5 rounded-3xl border border-primary/20 animate-in fade-in zoom-in duration-500">
				<div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
					<CheckCircle2 className="w-8 h-8 text-primary" />
				</div>
				<h3 className="text-2xl font-black mb-2 text-foreground">Message Received!</h3>
				<p className="text-muted-foreground text-sm max-w-xs mx-auto">
					Thanks for reaching out, {name.split(' ')[0]}. We'll get back to you as soon as possible.
				</p>
				<Button 
					variant="ghost" 
					className="mt-8 text-xs font-bold hover:bg-primary/10" 
					onClick={() => {
						setSubmitted(false);
						setName("");
						setEmail("");
						setMessage("");
					}}
				>
					Send another message
				</Button>
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
				<div className="space-y-2">
					<Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest opacity-60">Your Name</Label>
					<Input 
						id="name"
						placeholder="John Doe"
						className="h-12 bg-muted/20 border-border/40 rounded-xl focus:ring-primary/20"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest opacity-60">Email Address</Label>
					<Input 
						id="email"
						type="email"
						placeholder="john@example.com"
						className="h-12 bg-muted/20 border-border/40 rounded-xl focus:ring-primary/20"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
			</div>

			<div className="space-y-2">
				<Label htmlFor="message" className="text-[10px] font-black uppercase tracking-widest opacity-60">Message</Label>
				<Textarea 
					id="message"
					placeholder="How can we help you?"
					className="min-h-[150px] bg-muted/20 border-border/40 rounded-2xl focus:ring-primary/20 resize-none p-4"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					required
				/>
			</div>

			<Button 
				type="submit" 
				className="w-full h-14 rounded-2xl font-black text-sm bg-primary text-white shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all disabled:opacity-50"
				disabled={loading}
			>
				{loading ? (
					<Loader2 className="w-5 h-5 animate-spin" />
				) : (
					<span className="flex items-center gap-2">
						Send Feedback <Send className="w-4 h-4" />
					</span>
				)}
			</Button>
		</form>
	);
}
