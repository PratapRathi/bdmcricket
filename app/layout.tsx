import type { Metadata } from "next";
import { QueryProvider } from "@/providers/query-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "BDM Cricket Solutions",
  description: "BDM Cricket — cricket equipment shaped by a family’s work with the game since 1925.",
  metadataBase: new URL("https://www.bdmcricket.net"),
  openGraph: {
    title: "BDM Cricket — House of Cricket",
    description: "Cricket equipment shaped by a family’s work with the game since 1925.",
    siteName: "BDM Cricket",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "BDM Cricket — House of Cricket" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
