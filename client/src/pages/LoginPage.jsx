import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios';
import {UserContext} from "../UserContext.jsx";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const { data } = await axios.post('/login', { email, password });
      setUser(data);
      alert("Login successful");
      setRedirect(true);
    } catch (error) {
      alert('Login failed');
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto " onSubmit={handleLoginSubmit}>
          <input type="email" placeholder="Your@email.com" value={email} onChange={ev => setEmail(ev.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={ev => setPassword(ev.target.value)} />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet? <Link className="underline text-black font-bold" to={"/register"}>Register Now</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
