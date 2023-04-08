'use client'

interface ToggleProps{
    deletePost: () => void;
    setToggle: (toggle:boolean) => void;
}

function Toggle({deletePost, setToggle}:ToggleProps) {
  return (
    <div className="fixed bg-black/10 w-full h-full left-0 top-0 z-20" onClick={(e)=>setToggle(false)}>
        <div className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6">
            <h2 className="text-xl">
                Are you sure you want to delete this post?  
            </h2>
            <h3 className="text-red-600 text-sm">
                 Pressing the delete button will permenantly delete your post
            </h3>
            <button
                onClick={deletePost}
                className="bg-red-600 hover:bg-red-700 text-sm hover:text-base text-white py-2 px-4 rounded-md"
            >
              Delete Post
            </button>
      </div>
    </div>
  )
}

export default Toggle