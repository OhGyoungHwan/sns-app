import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Providers from "./lib/Provider";
import Footer from "./components/organism/Footer";
import NavigationLayout from "./components/organism/navigation/NavigationLayout";

const notoSansKR = Noto_Sans_KR({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "유튭뭐봄?",
  description: "유튜브 영상 관리 공유 사이트",
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
          <div
            id="modal"
            className="hidden fixed inset-0 z-40 bg-surface opacity-50"
          />
          <NavigationLayout />
          <main className="relative px-[16px] pt-[56px] min-h-[calc(100vh-56px)] w-full h-full">
            {children}
          </main>
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
