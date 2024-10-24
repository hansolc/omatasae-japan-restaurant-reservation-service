import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "@root/globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["100", "400", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSansKr.className} antialiased max-w-[380px] min-w-[360px] m-auto h-screen border-2`}
      >
        <main className="px-[14px] pt-20 h-full">{children}</main>
      </body>
    </html>
  );
}
