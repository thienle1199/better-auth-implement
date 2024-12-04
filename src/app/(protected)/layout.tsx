import Navbar from "@/components/Navbar";
import { ReactNode } from "react";


export default async function ProtectedLayout({children}:{children: ReactNode}) {
  return (
    <div className="container mx-auto mt-5">
        <Navbar />
        {children}
    </div>
  );
}
