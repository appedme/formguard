export interface FormTemplate {
	id: string;
	name: string;
	description: string;
	icon: string; // emoji
	category: string;
	fields: Array<{
		id: string;
		label: string;
		type: "text" | "email" | "textarea" | "select" | "checkbox" | "radio" | "number" | "url" | "tel";
		required: boolean;
		placeholder?: string;
		options?: string[];
	}>;
	successMessage: string;
	buttonText: string;
}

export const formTemplates: FormTemplate[] = [
	{
		id: "contact",
		name: "Contact Form",
		description: "A simple contact form for general inquiries. Captures name, email, and message.",
		icon: "💬",
		category: "General",
		fields: [
			{ id: "name", label: "Full Name", type: "text", required: true, placeholder: "John Doe" },
			{ id: "email", label: "Email Address", type: "email", required: true, placeholder: "john@example.com" },
			{ id: "subject", label: "Subject", type: "text", required: false, placeholder: "How can we help?" },
			{ id: "message", label: "Message", type: "textarea", required: true, placeholder: "Your message..." },
		],
		successMessage: "Thanks for reaching out! We'll get back to you shortly.",
		buttonText: "Send Message",
	},
	{
		id: "waitlist",
		name: "Waitlist / Early Access",
		description: "Collect early access signups with email and interest area. Perfect for product launches.",
		icon: "🚀",
		category: "Marketing",
		fields: [
			{ id: "name", label: "Name", type: "text", required: true, placeholder: "Jane Smith" },
			{ id: "email", label: "Email", type: "email", required: true, placeholder: "jane@startup.com" },
			{ id: "company", label: "Company / Project", type: "text", required: false, placeholder: "Your company name" },
			{ id: "interest", label: "What interests you most?", type: "select", required: false, options: ["API Access", "Dashboard", "Integrations", "Analytics", "Other"] },
		],
		successMessage: "You're on the list! We'll notify you when we launch.",
		buttonText: "Join Waitlist",
	},
	{
		id: "bug-report",
		name: "Bug Report",
		description: "Structured bug report form with severity, steps to reproduce, and expected behavior.",
		icon: "🐛",
		category: "Engineering",
		fields: [
			{ id: "title", label: "Bug Title", type: "text", required: true, placeholder: "Brief description of the issue" },
			{ id: "email", label: "Your Email", type: "email", required: true, placeholder: "reporter@company.com" },
			{ id: "severity", label: "Severity", type: "select", required: true, options: ["Critical", "High", "Medium", "Low"] },
			{ id: "steps", label: "Steps to Reproduce", type: "textarea", required: true, placeholder: "1. Go to...\n2. Click on...\n3. Observe..." },
			{ id: "expected", label: "Expected Behavior", type: "textarea", required: true, placeholder: "What should have happened?" },
			{ id: "actual", label: "Actual Behavior", type: "textarea", required: true, placeholder: "What actually happened?" },
			{ id: "browser", label: "Browser / Environment", type: "text", required: false, placeholder: "Chrome 120, macOS 14" },
		],
		successMessage: "Bug report submitted! Our engineering team will review it.",
		buttonText: "Submit Report",
	},
	{
		id: "feedback",
		name: "Feedback Survey",
		description: "Collect product feedback with rating, category, and detailed comments. Great for NPS.",
		icon: "⭐",
		category: "Product",
		fields: [
			{ id: "name", label: "Name", type: "text", required: false, placeholder: "Optional" },
			{ id: "email", label: "Email", type: "email", required: true, placeholder: "user@example.com" },
			{ id: "rating", label: "How would you rate your experience?", type: "select", required: true, options: ["5 - Excellent", "4 - Good", "3 - Average", "2 - Poor", "1 - Terrible"] },
			{ id: "category", label: "What area does this relate to?", type: "select", required: false, options: ["User Interface", "Performance", "Features", "Documentation", "Customer Support", "Other"] },
			{ id: "feedback", label: "Detailed Feedback", type: "textarea", required: true, placeholder: "Tell us more about your experience..." },
			{ id: "recommend", label: "Would you recommend us?", type: "radio", required: false, options: ["Yes, definitely", "Maybe", "Probably not"] },
		],
		successMessage: "Thank you for your feedback! It helps us improve.",
		buttonText: "Submit Feedback",
	},
	{
		id: "newsletter",
		name: "Newsletter Signup",
		description: "Minimal newsletter subscription form. Just email and optional preferences.",
		icon: "📧",
		category: "Marketing",
		fields: [
			{ id: "email", label: "Email Address", type: "email", required: true, placeholder: "you@example.com" },
			{ id: "name", label: "First Name", type: "text", required: false, placeholder: "Optional" },
			{ id: "interests", label: "Topics of Interest", type: "checkbox", required: false, options: ["Product Updates", "Engineering Blog", "Tips & Tutorials", "Industry News"] },
		],
		successMessage: "You're subscribed! Check your inbox for a confirmation.",
		buttonText: "Subscribe",
	},
	{
		id: "event-rsvp",
		name: "Event RSVP",
		description: "Event registration with attendee details, dietary preferences, and plus-one option.",
		icon: "🎉",
		category: "Events",
		fields: [
			{ id: "name", label: "Full Name", type: "text", required: true, placeholder: "Your full name" },
			{ id: "email", label: "Email", type: "email", required: true, placeholder: "your@email.com" },
			{ id: "company", label: "Company / Organization", type: "text", required: false, placeholder: "Optional" },
			{ id: "attending", label: "Will you attend?", type: "radio", required: true, options: ["Yes, I'll be there!", "Maybe", "Sorry, can't make it"] },
			{ id: "dietary", label: "Dietary Requirements", type: "select", required: false, options: ["None", "Vegetarian", "Vegan", "Gluten-Free", "Halal", "Kosher", "Other"] },
			{ id: "notes", label: "Anything else?", type: "textarea", required: false, placeholder: "Questions, plus-ones, accessibility needs..." },
		],
		successMessage: "You're registered! We'll send more details soon.",
		buttonText: "RSVP Now",
	},
];
