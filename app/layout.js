import "./globals.css";
import { Space_Grotesk, Manrope } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap"
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap"
});

export const metadata = {
  title: "LabSight | Laboratory QC Tools and Guides",
  description:
    "Free laboratory QC tools, practical guides, and clinical resources for laboratory scientists, with LabOps coming soon."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
