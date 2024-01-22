import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Providers from "./lib/Provider";
import TopAppBar from "./components/organism/topappbar/TopAppBar";
import BottomAppBar from "./components/organism/bottomappbar/BottomAppBar";

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
        <Providers>
          <TopAppBar />
          <main className="px-[16px] pt-[58px] pb-[60px]">{children}</main>
          <BottomAppBar />
        </Providers>
      </body>
    </html>
  );
}
