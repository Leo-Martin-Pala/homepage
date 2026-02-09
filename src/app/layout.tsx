import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leo-Martin Pala | Software Developer & AI Enthusiast",
  description: "Computer Science student at University of Tartu. Passionate about cybersecurity, AI, and building practical solutions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
