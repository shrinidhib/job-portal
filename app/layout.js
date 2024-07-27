import { Inter } from "next/font/google";
import "./globals.css";
import { JobProvider } from "./context/JobContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    
    <html lang="en">
      <head>
        <title>Job Portal</title>
      </head>
      <body>
        <header>My Job Portal</header>
        <JobProvider>
        <main>{children}</main>
        </JobProvider>
        <footer>Footer Content</footer>
      </body>
    </html>
    
  );
}
