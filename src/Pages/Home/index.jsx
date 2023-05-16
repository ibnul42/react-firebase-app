import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])
  return (
    <div className='flex justify-center content-center'>
      <p className='my-5 font-semibold text-lg'>Welcome Home!</p>
    </div>
  )
}

export default Home