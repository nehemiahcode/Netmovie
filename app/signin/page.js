import SigninForm from "../Components/Signin";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOp } from "../api/auth/[...nextauth]/route";


export default async function SigninPage() {

  const session = await getServerSession(authOp)
  if(session) {
    redirect("/home")
  }
  return (
    <main>
         <SigninForm/>
    </main>
  )
}
