import "~/styles/globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { NextAuthProvider } from "./providers";

export const metadata: Metadata = {
	title: "RecallHub - 不良品回収システム",
	description: "スマートな不良品回収プラットフォーム",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

// Force dynamic rendering for SPA behavior
export const dynamic = 'force-dynamic';

const geist = Geist({
	subsets: ["latin"],
	variable: "--font-geist-sans",
});

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="ja" className={`${geist.variable}`}>
			<body>
				<NextAuthProvider>
					<TRPCReactProvider>{children}</TRPCReactProvider>
				</NextAuthProvider>
			</body>
		</html>
	);
}
