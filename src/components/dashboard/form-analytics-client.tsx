"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, FunnelChart, Funnel, Tooltip, Legend } from "recharts";

interface FormAnalyticsClientProps {
	analytics: {
		total: number;
		last30Days: number;
		dailyHistory: { date: string; count: number }[];
	};
}

export function FormAnalyticsClient({ analytics }: FormAnalyticsClientProps) {
	return (
		<div className="space-y-4">
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total Submissions
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{analytics.total}</div>
						<p className="text-xs text-muted-foreground">
							All time
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Last 30 Days
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{analytics.last30Days}</div>
						<p className="text-xs text-muted-foreground">
							Active period
						</p>
					</CardContent>
				</Card>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
				<Card className="col-span-4">
					<CardHeader>
						<CardTitle>Overview</CardTitle>
						<CardDescription>
							Submission volume over the last 30 days.
						</CardDescription>
					</CardHeader>
					<CardContent className="pl-2">
						<div className="h-[300px] w-full">
							<ResponsiveContainer width="100%" height="100%">
								<AreaChart data={analytics.dailyHistory}>
									<defs>
										<linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
											<stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
											<stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
										</linearGradient>
									</defs>
									<XAxis 
										dataKey="date" 
										stroke="#888888" 
										fontSize={12} 
										tickLine={false} 
										axisLine={false}
									/>
									<YAxis
										stroke="#888888"
										fontSize={12}
										tickLine={false}
										axisLine={false}
										tickFormatter={(value) => `${value}`}
									/>
									<Tooltip 
                                        contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "8px", color: "#fff" }}
                                    />
									<CartesianGrid strokeDasharray="3 3" className="stroke-muted" vertical={false} />
									<Area 
										type="monotone" 
										dataKey="count" 
										stroke="#8884d8" 
										fillOpacity={1} 
										fill="url(#colorCount)" 
									/>
								</AreaChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
