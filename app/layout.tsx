import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import UnicornScene from "unicornstudio-react/next";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const hubotSans = localFont({
  src: [
    {
      path: "../fonts/HubotSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/HubotSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/HubotSans-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/HubotSans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-hubot-sans",
});

export const metadata: Metadata = {
  title: "Aura Fields Foundation | Financial Technology Education",
  description:
    "Empowering individuals and organizations with financial technology education to achieve financial goals in evolving market landscapes.",
  keywords: [
    "fintech",
    "financial technology",
    "education",
    "non-profit",
    "workshops",
    "community",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${hubotSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="w-screen h-screen fixed z-[-1]">
          <UnicornScene
            projectId="LSQg46GU67DJhhdj5U6a"
            width={"100%"} height={"100%"}
          />
        </div>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
