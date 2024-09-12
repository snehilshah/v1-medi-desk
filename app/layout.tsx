import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Medi Desk",
	description: "Meet Your Hospital",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<NextThemesProvider attribute="class" defaultTheme="dark">{children}</NextThemesProvider>
			</body>
			<Toaster />
		</html>
	);
}
