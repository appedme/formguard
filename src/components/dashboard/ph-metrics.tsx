import { request, gql } from "graphql-request";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowUpRight, MessageCircle, Triangle } from "lucide-react";

async function getProductHuntData() {
	const token = process.env.PH_DEVELOPER_TOKEN;

	if (!token) {
		return null;
	}

	const query = gql`
		query {
			post(id: "1086617") {
				id
				name
				votesCount
				commentsCount
				tagline
			}
		}
	`;

	try {
		const data: any = await request('https://api.producthunt.com/v2/api/graphql', query, {}, {
			Authorization: `Bearer ${token}`
		});
		return data.post;
	} catch (error) {
		console.error("Failed to fetch PH data:", error);
		return null;
	}
}

export async function PhMetrics() {
	const postData = await getProductHuntData();

	if (!postData) {
		return null;
	}

	return (
		<Card className="border-border/40 shadow-none bg-linear-to-br from-orange-500/5 to-rose-500/5 col-span-1 md:col-span-3 lg:col-span-4 relative overflow-hidden group">
			<CardHeader className="pb-2">
				<div className="flex items-center justify-between">
					<div>
						<CardTitle className="text-lg font-bold flex items-center gap-2">
							<div className="w-6 h-6 rounded bg-orange-500 text-white flex items-center justify-center font-bold text-xs">P</div>
							Live Launch Metrics
						</CardTitle>
						<CardDescription className="text-orange-600/70 font-medium">Tracking FormGuard on Product Hunt</CardDescription>
					</div>
					<a 
						href="https://www.producthunt.com/posts/formguard" 
						target="_blank" 
						rel="noopener noreferrer" 
						className="text-xs font-bold text-orange-600 flex items-center gap-1 hover:underline"
					>
						View Post <ArrowUpRight className="w-3 h-3" />
					</a>
				</div>
			</CardHeader>
			<CardContent>
				<div className="flex items-center gap-8 mt-4">
					<div className="flex flex-col">
						<span className="text-4xl font-black text-foreground flex items-center gap-2">
							<Triangle className="w-6 h-6 text-orange-500 fill-orange-500" />
							{postData.votesCount}
						</span>
						<span className="text-xs font-bold uppercase tracking-wider mt-1 text-orange-600/70">Upvotes</span>
					</div>

					<div className="h-12 w-px bg-border/50" />

					<div className="flex flex-col">
						<span className="text-4xl font-black text-foreground flex items-center gap-2">
							<MessageCircle className="w-6 h-6 text-blue-500" />
							{postData.commentsCount}
						</span>
						<span className="text-xs font-bold uppercase tracking-wider mt-1 text-blue-600/70">Comments</span>
					</div>

					<div className="h-12 w-px bg-border/50" />

					<div className="flex flex-col flex-1">
						<span className="text-sm font-semibold text-foreground">{postData.name}</span>
						<span className="text-sm text-muted-foreground line-clamp-1">{postData.tagline}</span>
						<div className="mt-2 w-full bg-orange-500/10 h-1.5 rounded-full overflow-hidden">
							<div className="bg-linear-to-r from-orange-500 to-rose-500 h-full w-full animate-pulse" />
						</div>
					</div>
				</div>
			</CardContent>
			
			{/* Decorative background element */}
			<div className="absolute -right-20 -top-20 w-64 h-64 bg-orange-500/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-orange-500/20 transition-all duration-700" />
		</Card>
	);
}
