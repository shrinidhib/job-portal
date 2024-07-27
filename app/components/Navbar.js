"use client"
import { useUser } from "../context/UserContext";

const NavBar = () => {
  const { user } = useUser();

  return (
    <div className="space-x-4">
      <a href="/" className="hover:underline">Jobs</a>
      {user ? (
        <>
          <a href="/profile" className="hover:underline">Profile</a>
          <a href="/logout" className="hover:underline">Logout</a>
        </>
      ) : (
        <>
          <a href="/login" className="hover:underline">Login</a>
          <a href="/register" className="hover:underline">Register</a>
        </>
      )}
    </div>
  );
};

export default NavBar;
