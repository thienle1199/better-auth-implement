import SignInForm from "@/app/signin/components/SignInForm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";


export default async function SignUp() {

  const session = await auth.api.getSession({
    headers: await headers()
  });
  if (session?.session) {
    redirect("/")
  }
  
  return (
    <SignInForm />
  );
}