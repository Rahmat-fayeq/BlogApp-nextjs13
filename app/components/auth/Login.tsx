'use client'
import {signIn} from 'next-auth/react'

const Login = () => {
  return (
    <li className="list-none">
      <button onClick={()=>signIn()} className="text-sm bg-green-600 hover:bg-green-700 text-white py-2 px-8 rounded-lg">
        Sign In
      </button>
    </li>
  )
}

export default Login