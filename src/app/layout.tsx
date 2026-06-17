import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://vaibhavdas.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Vaibhav Das | Software Developer & Full Stack Engineer",
    template: "%s | Vaibhav Das",
  },
  description:
    "Portfolio of Vaibhav Das — Software Developer at NIC, Full Stack Engineer specializing in Laravel, PostgreSQL, and modern web technologies.",
  keywords: [
    "Vaibhav Das",
    "Software Developer",
    "Full Stack Engineer",
    "Laravel",
    "PostgreSQL",
    "NIC",
    "Web Development",
    "React",
    "Next.js",
    "West Bengal",
  ],
  authors: [{ name: "Vaibhav Das", url: siteUrl }],
  creator: "Vaibhav Das",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Vaibhav Das | Software Developer & Full Stack Engineer",
    description:
      "Full Stack Engineer specializing in Laravel, PostgreSQL, and modern web technologies.",
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Vaibhav Das Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaibhav Das | Software Developer & Full Stack Engineer",
    description:
      "Full Stack Engineer specializing in Laravel, PostgreSQL, and modern web technologies.",
    creator: "@vaibhavdas",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
