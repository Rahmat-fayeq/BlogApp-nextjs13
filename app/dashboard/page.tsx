import { getServerSession } from "next-auth"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { redirect } from "next/navigation"
import MyPosts from "../components/dashboard/MyPosts"

async function page() {

    const session = await getServerSession(authOptions)
    if(!session){
        return redirect('/api/auth/signin')
    }

  return (
    <main>
        <h1 className="text-xl font-bold mx-4">Welcome back, {session.user?.name} </h1>
        {/* @ts-expect-error Async Server Component */} 
        <MyPosts/>
    </main>      
  )
}

export default page