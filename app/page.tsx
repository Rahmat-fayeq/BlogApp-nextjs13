import AddPost from "./components/post/AddPost";
import Post from "./components/post/Post";


export default async function Home() {
  return (
    <main>
      <AddPost />
      {/* @ts-expect-error Async Server Component */} 
      <Post/>
    </main>
  )
}
