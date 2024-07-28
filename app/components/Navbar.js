"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContext";

const NavBar = () => {
  const { user, setUser } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setUser(null);
    router.push('/');
  };

  return (
    <div className="flex flex-wrap items-center justify-between p-4 bg-gray-800 text-white">
      
      <div className="space-x-4 flex gap-2 mt-2 sm:mt-0">
        <Link href="/" className="hover:underline">Jobs</Link>
        {user ? (
          <>
            {user.role === 'poster' ? (
              <Link href="/job/myjobs" className="hover:underline">My Jobs</Link>
            ) : (
              <Link href="/job/myapplications" className="hover:underline">My Applications</Link>
            )}
            {user.role === 'poster' && (
              <Link href="/job/create" className="hover:underline">Post Job</Link>
            )}
            <p className="hover:underline cursor-pointer" onClick={handleLogout}>Logout</p>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:underline">Login</Link>
            <Link href="/register" className="hover:underline">Register</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
