import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { StagewiseToolbar } from "@stagewise/toolbar-next";

const Outfitfont = Outfit({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Koki's Portfolio",
  description: "自分のポートフォリオサイトです。更新中です。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

  return (
    <html lang="ja" className="scroll-smooth">
      <body className={`${Outfitfont.className}`}>
        <StagewiseToolbar
          config={{
            plugins: [], // Add your custom plugins here
          }}
        />
        {children}
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
