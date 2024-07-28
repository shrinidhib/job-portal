// app/layout.js
import { Inter } from "next/font/google";
import "./globals.css";
import { JobProvider } from "./context/JobContext";
import { UserProvider } from "./context/UserContext";
import NavBar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "JobConnect",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <UserProvider>
    <html lang="en">
      <head>
        <title>JobCOnnect</title>
      </head>
      <body className={inter.className}>
        <header className="bg-gray-800 text-white p-4">
          <nav className="container mx-auto flex justify-between items-center">
            <div className="text-xl font-bold">JobConnect</div>
            
            <NavBar/>
            
          </nav>
        </header>
        <JobProvider>
        <main className="container mx-auto p-4">{children}</main>
        </JobProvider>
        <footer className="bg-gray-800 text-white py-8">
  <div className="container mx-auto px-4">
    <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
      <div className="flex-1 text-center md:text-left">
        <h4 className="text-lg font-bold">About JobConnect</h4>
        <p className="text-gray-400 mt-2">
          JobConnect is a leading job portal that connects job seekers with top employers.
          <br />Discover thousands of job opportunities across various industries and find your dream job today.
        </p>
      </div>
      <div className="flex-1 md:ml-10 text-center md:text-left">
        <h4 className="text-lg font-bold">Quick Links</h4>
        <ul className="text-gray-400 mt-2">
          <li><a href="#" className="hover:underline">Home</a></li>
          <li><a href="#" className="hover:underline">Browse Jobs</a></li>
          <li><a href="#" className="hover:underline">Post a Job</a></li>
          <li><a href="#" className="hover:underline">Contact Us</a></li>
          <li><a href="#" className="hover:underline">Privacy Policy</a></li>
        </ul>
      </div>
      <div className="flex-1 text-center md:text-left">
        <h4 className="text-lg font-bold">Follow Us</h4>
        <div className="flex justify-center md:justify-start space-x-4 mt-2">
          <a href="#" className="hover:text-gray-400"><i className="fab fa-facebook-f"></i></a>
          <a href="#" className="hover:text-gray-400"><i className="fab fa-twitter"></i></a>
          <a href="#" className="hover:text-gray-400"><i className="fab fa-linkedin-in"></i></a>
        </div>
      </div>
    </div>
    <div className="text-center text-gray-400 mt-8">
      <p>&copy; 2024 JobConnect. All Rights Reserved.</p>
    </div>
  </div>
</footer>


      </body>
    </html>
    </UserProvider>
  );
}
