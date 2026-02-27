export interface FormTemplate {
	id: string;
	name: string;
	description: string;
	icon: string; // emoji
	category: string;
	fields: Array<{
		name: string;
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
			{ name: "name", label: "Full Name", type: "text", required: true, placeholder: "John Doe" },
			{ name: "email", label: "Email Address", type: "email", required: true, placeholder: "john@example.com" },
			{ name: "subject", label: "Subject", type: "text", required: false, placeholder: "How can we help?" },
			{ name: "message", label: "Message", type: "textarea", required: true, placeholder: "Your message..." },
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
			{ name: "name", label: "Name", type: "text", required: true, placeholder: "Jane Smith" },
			{ name: "email", label: "Email", type: "email", required: true, placeholder: "jane@startup.com" },
			{ name: "company", label: "Company / Project", type: "text", required: false, placeholder: "Your company name" },
			{ name: "interest", label: "What interests you most?", type: "select", required: false, options: ["API Access", "Dashboard", "Integrations", "Analytics", "Other"] },
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
			{ name: "title", label: "Bug Title", type: "text", required: true, placeholder: "Brief description of the issue" },
			{ name: "email", label: "Your Email", type: "email", required: true, placeholder: "reporter@company.com" },
			{ name: "severity", label: "Severity", type: "select", required: true, options: ["Critical", "High", "Medium", "Low"] },
			{ name: "steps", label: "Steps to Reproduce", type: "textarea", required: true, placeholder: "1. Go to...\n2. Click on...\n3. Observe..." },
			{ name: "expected", label: "Expected Behavior", type: "textarea", required: true, placeholder: "What should have happened?" },
			{ name: "actual", label: "Actual Behavior", type: "textarea", required: true, placeholder: "What actually happened?" },
			{ name: "browser", label: "Browser / Environment", type: "text", required: false, placeholder: "Chrome 120, macOS 14" },
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
			{ name: "name", label: "Name", type: "text", required: false, placeholder: "Optional" },
			{ name: "email", label: "Email", type: "email", required: true, placeholder: "user@example.com" },
			{ name: "rating", label: "How would you rate your experience?", type: "select", required: true, options: ["5 - Excellent", "4 - Good", "3 - Average", "2 - Poor", "1 - Terrible"] },
			{ name: "category", label: "What area does this relate to?", type: "select", required: false, options: ["User Interface", "Performance", "Features", "Documentation", "Customer Support", "Other"] },
			{ name: "feedback", label: "Detailed Feedback", type: "textarea", required: true, placeholder: "Tell us more about your experience..." },
			{ name: "recommend", label: "Would you recommend us?", type: "radio", required: false, options: ["Yes, definitely", "Maybe", "Probably not"] },
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
			{ name: "email", label: "Email Address", type: "email", required: true, placeholder: "you@example.com" },
			{ name: "name", label: "First Name", type: "text", required: false, placeholder: "Optional" },
			{ name: "interests", label: "Topics of Interest", type: "checkbox", required: false, options: ["Product Updates", "Engineering Blog", "Tips & Tutorials", "Industry News"] },
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
			{ name: "name", label: "Full Name", type: "text", required: true, placeholder: "Your full name" },
			{ name: "email", label: "Email", type: "email", required: true, placeholder: "your@email.com" },
			{ name: "company", label: "Company / Organization", type: "text", required: false, placeholder: "Optional" },
			{ name: "attending", label: "Will you attend?", type: "radio", required: true, options: ["Yes, I'll be there!", "Maybe", "Sorry, can't make it"] },
			{ name: "dietary", label: "Dietary Requirements", type: "select", required: false, options: ["None", "Vegetarian", "Vegan", "Gluten-Free", "Halal", "Kosher", "Other"] },
			{ name: "notes", label: "Anything else?", type: "textarea", required: false, placeholder: "Questions, plus-ones, accessibility needs..." },
		],
		successMessage: "You're registered! We'll send more details soon.",
		buttonText: "RSVP Now",
	},
	{
		id: "job-application",
		name: "Job Application",
		description: "Streamlined job application form capturing resume links, portfolios, and availability.",
		icon: "💼",
		category: "HR",
		fields: [
			{ name: "name", label: "Full Name", type: "text", required: true, placeholder: "Jane Doe" },
			{ name: "email", label: "Email Address", type: "email", required: true, placeholder: "jane@example.com" },
			{ name: "phone", label: "Phone Number", type: "tel", required: true, placeholder: "+1 (555) 000-0000" },
			{ name: "role", label: "Role Applying For", type: "text", required: true, placeholder: "e.g. Frontend Developer" },
			{ name: "linkedin", label: "LinkedIn URL", type: "url", required: false, placeholder: "https://linkedin.com/in/..." },
			{ name: "portfolio", label: "Portfolio / GitHub URL", type: "url", required: false, placeholder: "https://..." },
			{ name: "cover_letter", label: "Cover Letter", type: "textarea", required: false, placeholder: "Why are you a good fit?" }
		],
		successMessage: "Application submitted! Our hiring team will review it shortly.",
		buttonText: "Submit Application"
	},
	{
		id: "support-ticket",
		name: "IT Support Ticket",
		description: "Internal IT or customer support request form with priority levels.",
		icon: "🛠️",
		category: "Engineering",
		fields: [
			{ name: "name", label: "Your Name", type: "text", required: true },
			{ name: "issue_type", label: "Issue Category", type: "select", required: true, options: ["Hardware", "Software/App", "Network", "Access/Permissions", "Other"] },
			{ name: "priority", label: "Priority", type: "radio", required: true, options: ["Low", "Medium", "Urgent"] },
			{ name: "description", label: "Description of Issue", type: "textarea", required: true, placeholder: "Please describe the problem in detail." }
		],
		successMessage: "Ticket created. An agent will be assigned to your case soon.",
		buttonText: "Create Ticket"
	},
	{
		id: "lead-capture",
		name: "B2B Lead Capture",
		description: "Perfect for landing pages to gather high-intent business leads.",
		icon: "📈",
		category: "Marketing",
		fields: [
			{ name: "name", label: "Name", type: "text", required: true },
			{ name: "work_email", label: "Work Email", type: "email", required: true },
			{ name: "company", label: "Company Name", type: "text", required: true },
			{ name: "company_size", label: "Company Size", type: "select", required: false, options: ["1-10", "11-50", "51-200", "201-1000", "1000+"] },
			{ name: "timeline", label: "Purchase Timeline", type: "radio", required: false, options: ["ASAP", "Within 3 months", "Within 6 months", "Just exploring"] }
		],
		successMessage: "Thanks for your interest! A sales representative will be in touch.",
		buttonText: "Request Demo"
	},
	{
		id: "feature-request",
		name: "Feature Request",
		description: "Let users suggest and vote on new product features.",
		icon: "💡",
		category: "Product",
		fields: [
			{ name: "title", label: "Feature Idea", type: "text", required: true, placeholder: "Short title for your idea" },
			{ name: "description", label: "Problem & Solution", type: "textarea", required: true, placeholder: "What problem does this solve and how should it work?" },
			{ name: "importance", label: "How important is this to you?", type: "radio", required: true, options: ["Nice to have", "Important", "Critical blocker"] },
			{ name: "email", label: "Email (Optional)", type: "email", required: false, placeholder: "If you'd like updates on this request" }
		],
		successMessage: "Feature request logged! Thanks for helping us improve.",
		buttonText: "Submit Idea"
	},
	{
		id: "course-registration",
		name: "Course Enrollment",
		description: "Registration form for online webinars, courses, or workshops.",
		icon: "🎓",
		category: "Events",
		fields: [
			{ name: "student_name", label: "Student Name", type: "text", required: true },
			{ name: "email", label: "Email Address", type: "email", required: true },
			{ name: "course", label: "Select Course", type: "select", required: true, options: ["Intro to Web Dev", "Advanced React", "UI/UX Foundations", "Data Science 101"] },
			{ name: "experience", label: "Prior Experience Level", type: "radio", required: true, options: ["Beginner", "Intermediate", "Advanced"] }
		],
		successMessage: "Registration confirmed! Check your inbox for the syllabus.",
		buttonText: "Enroll Now"
	},
	{
		id: "customer-satisfaction",
		name: "CSAT Survey",
		description: "Standard Customer Satisfaction (CSAT) micro-survey for post-purchase or support flow.",
		icon: "😊",
		category: "Product",
		fields: [
			{ name: "satisfaction", label: "How satisfied are you with our service today?", type: "radio", required: true, options: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"] },
			{ name: "what_went_well", label: "What did we do well?", type: "checkbox", required: false, options: ["Speed", "Friendliness", "Problem Resolution", "Knowledge"] },
			{ name: "improvements", label: "How can we improve?", type: "textarea", required: false }
		],
		successMessage: "Thanks for your review!",
		buttonText: "Submit"
	},
	{
		id: "volunteer-signup",
		name: "Volunteer Application",
		description: "Gather volunteers for charity events or community organizations.",
		icon: "🤝",
		category: "General",
		fields: [
			{ name: "name", label: "Full Name", type: "text", required: true },
			{ name: "email", label: "Email", type: "email", required: true },
			{ name: "phone", label: "Phone Number", type: "tel", required: false },
			{ name: "availability", label: "Availability", type: "checkbox", required: true, options: ["Weekdays", "Weekends", "Mornings", "Evenings"] },
			{ name: "skills", label: "Relevant Skills or Experience", type: "textarea", required: false }
		],
		successMessage: "Thanks for volunteering! We will contact you with upcoming opportunities.",
		buttonText: "Sign Up"
	},
	{
		id: "order-form",
		name: "Simple Order Request",
		description: "Basic order intake form for custom services or small batch products.",
		icon: "📦",
		category: "Marketing",
		fields: [
			{ name: "name", label: "Name", type: "text", required: true },
			{ name: "email", label: "Email", type: "email", required: true },
			{ name: "product", label: "Product Package", type: "select", required: true, options: ["Basic ($50)", "Pro ($150)", "Enterprise (Custom)"] },
			{ name: "quantity", label: "Quantity", type: "number", required: true, placeholder: "1" },
			{ name: "shipping_address", label: "Shipping Address", type: "textarea", required: true },
			{ name: "notes", label: "Special Instructions", type: "textarea", required: false }
		],
		successMessage: "Order request received! We'll send an invoice shortly.",
		buttonText: "Request Order"
	},
	{
		id: "maintenance-request",
		name: "Maintenance Request",
		description: "For tenants, employees, or users to report required physical maintenance.",
		icon: "🔧",
		category: "HR",
		fields: [
			{ name: "name", label: "Your Name", type: "text", required: true },
			{ name: "location", label: "Building / Room Number", type: "text", required: true },
			{ name: "issue_type", label: "Type of Issue", type: "select", required: true, options: ["Plumbing", "Electrical", "HVAC", "Furniture", "Other"] },
			{ name: "urgency", label: "Urgency", type: "radio", required: true, options: ["Routine", "Important", "Emergency"] },
			{ name: "description", label: "Description of the problem", type: "textarea", required: true }
		],
		successMessage: "Maintenance request submitted to the facilities team.",
		buttonText: "Submit Request"
	},
	{
		id: "sponsorship",
		name: "Sponsorship Inquiry",
		description: "Form for brands wanting to sponsor newsletters, events, or content.",
		icon: "🤝",
		category: "Marketing",
		fields: [
			{ name: "brand", label: "Brand / Company Name", type: "text", required: true },
			{ name: "contact_name", label: "Contact Person", type: "text", required: true },
			{ name: "email", label: "Email Address", type: "email", required: true },
			{ name: "budget", label: "Approximate Budget", type: "select", required: false, options: ["<$500", "$500 - $2,000", "$2,000 - $5,000", "$5,000+"] },
			{ name: "goals", label: "Campaign Goals", type: "textarea", required: true, placeholder: "What are you hoping to achieve?" }
		],
		successMessage: "Thanks for your interest! Our partnerships team will review this.",
		buttonText: "Inquire Now"
	},
	{
		id: "website-audit",
		name: "Free Website Audit",
		description: "Lead generation form offering a free service in exchange for details.",
		icon: "🔍",
		category: "Marketing",
		fields: [
			{ name: "url", label: "Website URL", type: "url", required: true, placeholder: "https://" },
			{ name: "email", label: "Where should we send the report?", type: "email", required: true },
			{ name: "pain_points", label: "Biggest Current Challenge", type: "checkbox", required: false, options: ["Low Traffic", "Poor Conversion Rate", "Slow Loading Speed", "Outdated Design", "SEO Issues"] }
		],
		successMessage: "Your website is in the queue! We'll email your audit within 48 hours.",
		buttonText: "Get Free Audit"
	}
];
