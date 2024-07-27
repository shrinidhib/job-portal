"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../context/UserContext';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('browser'); 
  const [error,setError]=useState('')
  const router = useRouter();
  const {user, setUser}=useUser()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, role }),
      });

      if (res.ok) {
        const response = await res.json()
        console.log(response)
        const { token, userId } = response;
        setUser(userId)
        localStorage.setItem('token', token); 
        localStorage.setItem('userId', userId); 
        router.push('/'); 
      } else {
        const {error} = await res.json()
        setError(error)
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <label>
          Role:
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="browser">Job Seeker</option>
            <option value="poster">Job Poster</option>
          </select>
        </label>
        <button type="submit">Register</button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
};

export default RegisterPage;
