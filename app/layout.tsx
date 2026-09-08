import type { Metadata } from "next";
import "./globals.css";
import { SfxProvider } from "@/components/wii/sfx-provider";
import PointerSpotlight from "@/components/ui/pointer-spotlight";

const SITE_URL = "https://lakshman-nair-portfolio.vercel.app";
const SITE_TITLE = "Lakshman Nair — Portfolio";
const SITE_DESCRIPTION =
  "Portfolio of Lakshman Nair, a full-stack developer and Computer Science Specialist graduate from the University of Toronto. Browse my projects, skills and experience.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_TITLE,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
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
