import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import TopAppBar from "./components/TopAppBar";
import BottomAppBar from "./components/BottomAppBar";

const notoSansKR = Noto_Sans_KR({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DongHaeSNS",
  description: "간편이용 동해 SNS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={notoSansKR.className}>
        <TopAppBar />
        <main className="mt-[16px] px-[16px]">{children}</main>
        <BottomAppBar />
      </body>
    </html>
  );
}
