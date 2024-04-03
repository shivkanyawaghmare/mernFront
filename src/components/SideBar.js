import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
function SideBar({ showSideBar }) {
  const location = useLocation();
  const navigate = useNavigate()
  const menuItems = [
    { title: 'Transaction ', path: '/home' },
    { title: 'Transaction Dashbord', path: '/tradbord' },
    { title: 'Transaction Statistics', path: '/statistic' },
    { title: 'Bar chart', path: '/profile' },
    { title: 'Logout', path: '/logout' },
  ]
  const logout = () => {
    localStorage.removeItem('user')
    navigate('/')
  }//    min-height: 100%;
  return (

    <div style={{ minHeight: '100%'}}
      className={`max-h-full transition-all duration-300 bg-sky-950 h-screen flex flex-col overflow-hidden ${showSideBar ? 'w-48' : 'w-0'
        } `}
    >

      <div className='bg-sky-950 w-60 h-screen flex flex-col'>
        <div>
          <h1 className='text-white text-3xl font-bold mt-10 ml-10' style={{marginLeft:'6px'}}>Transaction</h1>
        </div>
        <div className='flex flex-col mt-20 ml-0 '>
          {menuItems.map((item) => {
            return item.title !== 'logout' ? (
              <Link
                to={`${item.path}`}
                className={`pl-10 py-5 text-gray-400 hover:bg-gray-50 hover:text-gray-700 text-sm
               ${location.pathname.includes(item.path) &&
                  'bg-sky-950  text-yellow-200 font-bold'
                  }
              `}
              >
                {item.title}
              </Link>
            ) : (
              <span onClick={logout}
                className="pl-10 py-5 text-gray-400 hover:bg-gray-50 hover:text-gray-700 text-sm cursor-pointer">
                Logout</span>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
