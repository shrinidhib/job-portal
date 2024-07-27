"use client"
import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContext";

const NavBar = () => {
  const { user ,setUser} = useUser();
  const router = useRouter()
    const handleLogout=()=>{
        localStorage.removeItem('userId')
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        setUser(null)
        router.push('/')
    }

  return (
    <div className="space-x-4 flex gap-2">
      <a href="/" className="hover:underline">Jobs</a>
      {user ? (
        <>
          <a href="/job/myjobs" className="hover:underline">My Jobs</a>
          {user.role == 'poster'?(
            <a href="/job/create" className="hover:underline">Post Job</a>
          ):null}
          <p className="hover:underline" onClick={handleLogout}>Logout</p>
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
