'use client'
import {signOut} from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'

type User = {
    image: string | null | undefined;
    name: string | null | undefined
}

function LoggedUser({image,name}:User) {
  return (
    <li className='flex items-center gap-8'>
        <button onClick={() => signOut()} className='bg-red-600 hover:bg-red-700 text-white p-2 rounded-full'>
            Exit
        </button>
        <Link href={'/dashboard'}>
            {
                image ?  <Image src={image} width={64} height={64} className='rounded-full' alt='' />:
                <span className='inline-block h-9 w-9  overflow-hidden rounded-full bg-gray-100'>
                    <svg
                    className='h-full w-full text-gray-300'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                    >
                    <path d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z' />
                    </svg>
                </span>
            }
            <p className='text-xs'>{name}</p>
        </Link>        
    </li>
  )
}

export default LoggedUser