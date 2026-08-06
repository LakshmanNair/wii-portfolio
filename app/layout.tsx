import type { Metadata } from "next";
import "./globals.css";
import { SfxProvider } from "@/components/wii/sfx-provider";
import PointerSpotlight from "@/components/ui/pointer-spotlight";

export const metadata: Metadata = {
  title: "Lakshman Nair — Portfolio",
  description: "Interactive portfolio built on the classic Wii Menu interface. Explore my work, skills, and experience through a nostalgic yet modern UI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SfxProvider>
          <PointerSpotlight />
          {children}
        </SfxProvider>
      </body>
    </html>
  );
}
