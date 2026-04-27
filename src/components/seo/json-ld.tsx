import { siteConfig } from "@/config/site";

export function JsonLd() {
	const softwareAppSchema = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		"name": siteConfig.name,
		"description": siteConfig.description,
		"applicationCategory": "DeveloperApplication",
		"operatingSystem": "All",
		"url": siteConfig.url,
		"offers": {
			"@type": "Offer",
			"price": "0",
			"priceCurrency": "USD",
		},
		"aggregateRating": {
			"@type": "AggregateRating",
			"ratingValue": "4.9",
			"reviewCount": "120",
		},
	};

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
		/>
	);
}
