"use client";

import { authClient } from "@/lib/auth-client";


export default function Navbar() {

  const session = authClient.useSession();

  console.log('session', session)
    
  return (
    <div>
      <span>
        {session.data?.user.name}
        </span>
        <button onClick={async ()=>await authClient.signOut()}>Sign out</button>
        </div>
  )
}