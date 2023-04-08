import Link from 'next/link'
import Login from './auth/Login'
import { getServerSession } from 'next-auth/next'
import { authOptions} from '../../pages/api/auth/[...nextauth]'
import LoggedUser from './auth/LoggedUser'

const Nav = async () => {
  const session = await getServerSession(authOptions);
  return (
  <>
      <nav className='flex justify-between items-center py-8'>
        <Link href={'/'}>
            <h1 className='text-lg font-bold'>Blog-App</h1>
        </Link>
        <ul className='flex items-center gap-8'>
          {
            !session?.user?<Login/> : <LoggedUser name={session.user?.name} image={session.user?.image}/> 
          }
        </ul>
    </nav>
  </>
  )
}

export default Nav