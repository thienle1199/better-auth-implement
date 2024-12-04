"use client"
import { authClient } from "@/lib/auth-client"; //import the auth client
import { useState } from 'react';
 
export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  // const [image, setImage] = useState<File | null>(null);
 
  const signUp = async () => {
    const { data, error } = await authClient.signUp.email({ 
        email, 
        password, 
        name, 
        image: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png",
     }, { 
        onRequest: (ctx) => { 
         //show loading
        }, 
        onSuccess: (ctx) => { 
          //redirect to the dashboard
        }, 
        onError: (ctx) => { 
          alert(ctx.error.message); 
        }, 
      }); 
  };
 
  return (
    <div className="flex flex-col gap-2 mx-auto w-[200px]">
      <label htmlFor="name">Name</label>
      <input className="text-gray-700 p-2" type="name" value={name} onChange={(e) => setName(e.target.value)} />
      <label htmlFor="password">Password</label>
      <input className="text-gray-700 p-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <label htmlFor="email">Email</label>
      <input className="text-gray-700 p-2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      {/* <input type="file" onChange={(e) => setImage(e.target.files?.[0])} /> */}
      <button onClick={signUp}>Sign Up</button>
    </div>
  );
}