import {
  Geist,
  Geist_Mono,
  Poppins,
  Archivo,
  Alexandria,
} from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/store/provider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "700"], // choose weights you use
  display: "swap", // better for CLS
  variable: "--font-poppins",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "700"], // customize weights you need
  variable: "--font-archivo",
  display: "swap",
});
const alexandria = Alexandria({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "700"], // customize weights you need
  variable: "--font-alexandria",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Event Registration",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}  ${poppins.variable} ${archivo.variable} ${alexandria.variable} antialiased`}
      >
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
