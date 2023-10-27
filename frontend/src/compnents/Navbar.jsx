import img from '../assets/logo.png'
import { Link } from 'react-router-dom'
import { getIdFromCookie, removeToken } from '../lib/auth';
function Navbar() {
  return (

    <>
      <div className='flex justify-between items-center px-3 sm:px-10 py-2 bg-gray-200'>
        <div className='flex gap-3 items-center'>
          <img src={img} alt="Logo" className='w-16' />
          <p className='hidden'>T&P cell</p>
        </div>
        <div className='flex gap-1 md:gap-3'>
          <Link to='/'><p className='hover:cursor-pointer'>Home</p></Link>
          
          {!getIdFromCookie()?
          <>
          <Link to={'/register'}><p className='hover:cursor-pointer'>Register</p></Link>
          <Link to={'/login'}><p className='hover:cursor-pointer'>Login</p></Link>
          </>
          :
          <p className='hover:cursor-pointer'
          onClick={()=>{
            removeToken()
          }}
          >Logout</p>}
        </div>

        {/* <button  data-dropdown-toggle="dropdown" className="md:hidden text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" type="button"><FaBars/></button> */}

        {/* <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
            <div >
              
            </div>
          </ul>
        </div> */}



      </div>

    </>
  )
}

export default Navbar