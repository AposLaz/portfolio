import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Apostolos Lazidis | DevSecOps & Full Stack Engineer",
  description:
    "Senior DevSecOps Engineer and Full Stack Developer specializing in Kubernetes, AWS, CI/CD pipelines, and modern web technologies. Based in Greece.",
  keywords: [
    "DevSecOps",
    "Full Stack Developer",
    "Kubernetes",
    "AWS",
    "React",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "Apostolos Lazidis" }],
  openGraph: {
    title: "Apostolos Lazidis | DevSecOps & Full Stack Engineer",
    description:
      "Senior DevSecOps Engineer and Full Stack Developer specializing in Kubernetes, AWS, CI/CD pipelines, and modern web technologies.",
    type: "website",
  },
  icons: [
    {
      url: "/favicon.svg",
      type: "image/svg+xml",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.svg?v=2" type="image/svg+xml" />
        <link
          rel="icon"
          href="/favicon-dark.svg?v=2"
          media="(prefers-color-scheme: dark)"
          type="image/svg+xml"
        />
        <link rel="shortcut icon" href="/favicon.svg?v=2" />
        <link rel="apple-touch-icon" href="/favicon.svg?v=2" />
        <meta
          name="theme-color"
          content="#030515"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#02040a"
          media="(prefers-color-scheme: dark)"
        />
      </head>
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
