import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Home from '../../Pages/Home'
import Login from '../../Pages/Login'
import Register from '../../Pages/Register'
import Profile from '../../Pages/Profile'
import UserList from '../../Pages/UserList'
import { useSelector } from 'react-redux'

const adminLinks = [
  // { name: "Profile", link: "/profile" },
  { name: "User list", link: "/user" },
]

const Content = () => {
  const navLinkStyles = ({ isActive }) => {
    return {
      color: isActive ? "#dba124" : "",
    }
  }

  const { user } = useSelector((state) => state.auth)

  const RequireAuth = ({ children }) => {
    return user ? children : <Navigate to="/login" />
  }
  return (
    <div className='flex-1 grid grid-cols-12 gap-2'>
      <div className={`${user ? 'col-span-2' : 'hidden'} bg-gray-300 text-white flex flex-col`}>
        <NavLink
            to="/profile"
            className={`p-2 bg-gray-500 hover:bg-gray-600 cursor-pointer capitalize`}
            style={navLinkStyles}
          >
            profile
          </NavLink>
        {user && user.role === "admin" && adminLinks.map((item, index) => (
          <NavLink
            key={index}
            to={item.link}
            className={`p-2 bg-gray-500 hover:bg-gray-600 cursor-pointer capitalize`}
            style={navLinkStyles}
          >
            {item.name}
          </NavLink>
        ))}
      </div>
      <div className={`${user ? 'col-span-10 h-full overflow-y-auto' : 'col-span-12'}`}>
        <Routes>
          <Route path='/' element={<RequireAuth><Home /></RequireAuth>} />
          <Route path='/profile' element={<RequireAuth><Profile /></RequireAuth>} />
          <Route path='/user' element={<RequireAuth><UserList /></RequireAuth>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          {/* {user} */}
        </Routes>
      </div>
    </div>
  )
}

export default Content