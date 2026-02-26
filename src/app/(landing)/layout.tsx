import { Inter } from "next/font/google";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import { stackServerApp } from "@/stack/server";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

export default async function LandingLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const user = await stackServerApp.getUser();

	return (
		<div className={`${inter.variable} font-sans`}>
			<Navbar user={user} />
			{children}
			<Footer />
		</div>
	);
}
