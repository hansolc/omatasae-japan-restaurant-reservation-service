import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "@root/globals.css";
import { AuthProvider } from "@/components/common/AuthContext";
import ReactQueryProvider from "@/components/common/ReactQueryProvider";
import { ErrorProvider } from "@/components/common/error/ErrorContext";
import { Toaster } from "react-hot-toast";
import ErrorToast from "@/components/common/error/ErrorToast";

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
    <main className="antialiased max-w-[380px] min-w-[360px] m-auto px-[14px] pt-20 h-full">
      {children}
    </main>
  );
}
