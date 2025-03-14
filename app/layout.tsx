// import type { Metadata } from "next";
import "../styles/globals.css";
import localFont from "next/font/local";

const pretendardBold = localFont({
  src: "../public/fonts/Pretendard-Bold.woff",
  display: "swap",
  variable: "--font-ptd-b",
});

const pretendardLight = localFont({
  src: "../public/fonts/Pretendard-Light.woff",
  display: "swap",
  variable: "--font-ptd-l",
});

const pretendardMedium = localFont({
  src: "../public/fonts/Pretendard-Medium.woff",
  display: "swap",
  variable: "--font-ptd-m",
});

const pretendardRegular = localFont({
  src: "../public/fonts/Pretendard-Regular.woff",
  display: "swap",
  variable: "--font-ptd-r",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${pretendardRegular.variable} ${pretendardMedium.variable} ${pretendardBold.variable} ${pretendardLight.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
