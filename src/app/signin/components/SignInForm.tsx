"use client"
import { authClient } from "@/lib/auth-client"; //import the auth client
import { redirect } from "next/navigation";
import { useState } from 'react';
 
export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  
 
  const signIn = async () => {
    const { data, error } = await authClient.signIn.email({ 
        email, 
        password,
     }, { 
        onRequest: (ctx) => { 
         //show loading
        }, 
        onSuccess: (ctx) => { 
          redirect("/")
        }, 
        onError: (ctx) => { 
          alert(ctx.error.message); 
        }, 
      }); 
  };
 
  return (
    <div className="flex flex-col gap-2 mx-auto w-[200px]">
      
      <label htmlFor="email">Email</label>
      <input className="text-gray-700 p-2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label htmlFor="password">Password</label>
      <input className="text-gray-700 p-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {/* <input type="file" onChange={(e) => setImage(e.target.files?.[0])} /> */}
      <button onClick={signIn}>Sign In</button>
    </div>
  );
}