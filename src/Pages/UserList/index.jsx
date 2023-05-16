import React, { useEffect, useState } from 'react'
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase"
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const UserList = () => {
  const [users, setUsers] = useState([])
  const [createType, setCreateType] = useState(false)
  const navigate = useNavigate()

  const [inputValue, setInputValue] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  })
  const { username, firstName, lastName, email, password, confirmPassword, role } = inputValue

  const onChange = (e) => {
    const { name, value } = e.target
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)
      await setDoc(doc(db, "users", res.user.uid), {
        username,
        firstName,
        lastName,
        email,
        password,
        role
      })
      fetchData()
      setCreateType(false)
    } catch (e) {
      alert("Error adding document");
    }
  }

  const fetchData = async () => {
    const list = []
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      list.push({ id: doc.id, ...doc.data() });
    })
    setUsers(list)
  }

  const cancelbtnHandler = () => {
    setInputValue({
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: ''
    })
    setCreateType(false)
  }


  useEffect(() => {
    const fetchData = async () => {
      const list = []
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        list.push({ id: doc.id, ...doc.data() });
      })
      setUsers(list)
    }
    fetchData()
  }, [])
  console.log(users)
  return (
    <div className='p-2 flex flex-col h-full'>
      <div className="flex justify-between">
        <p className='font-semibold text-lg'>All Users</p>
        <button className='bg-teal-600 hover:bg-teal-700 text-stone-50 py-2 px-3 rounded' onClick={() => setCreateType(true)}>Create</button>
      </div>
      <div className="flex-grow flex justify-center">
        {createType ?
          <form onSubmit={onSubmit}>
            <div className="my-5 max-w-lg mx-auto">
              <h2 className="text-base text-center font-semibold leading-7 text-gray-900">Register User</h2>

              <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                    Username
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="username"
                        id="username"
                        value={username}
                        onChange={onChange}
                        autoComplete="username"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="janesmith"
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                    First name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={firstName}
                      onChange={onChange}
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                    Last name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={lastName}
                      onChange={onChange}
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={onChange}
                      autoComplete="email"
                      className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-6">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      value={password}
                      onChange={onChange}
                      name="password"
                      type="password"
                      autoComplete="password"
                      className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-6">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                    Confirm Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={onChange}
                      name="confirmPassword"
                      type="password"
                      autoComplete="confirmPassword"
                      className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-6">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                    User Role
                  </label>
                  <div className="mt-2">
                    <Menu as="div" className="relative w-full text-left">
                      <div>
                        <Menu.Button className="inline-flex w-full justify-end gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 capitalize">
                          {role}
                          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                        </Menu.Button>
                      </div>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                    'block px-4 py-2 text-sm'
                                  )}
                                  onClick={() => setInputValue((prev) => ({
                                    ...prev,
                                    role: 'user'
                                  }))}
                                >
                                  User
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                    'block px-4 py-2 text-sm'
                                  )}
                                  onClick={() => setInputValue((prev) => ({
                                    ...prev,
                                    role: 'admin'
                                  }))}
                                >
                                  Admin
                                </a>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-3 flex items-center justify-between gap-x-6">
              <button type='button' onClick={cancelbtnHandler} className='px-3 py-2 bg-red-500 hover:bg-red-700 rounded'>Cancel</button>
              <button type='submit' className='px-3 py-2 bg-purple-500 hover:bg-purple-700 rounded'>Register</button>
            </div>
          </form> : (
            <div className='w-full my-2'>
              <div className="w-full">
                <div className='bg-slate-50 grid grid-cols-12 px-1'>
                    <p className='py-2 col-span-1'>Sl</p>
                    <p className='py-2 col-span-4'>Name</p>
                    <p className='py-2 col-span-4'>Email</p>
                    <p className='py-2 col-span-3'>Role</p>
                </div>
                {users && users.length>0 ? users.map((user, index) => (
                  <div key={index} className='grid grid-cols-12 px-1 odd:bg-slate-200'>
                    <p className='py-2 col-span-1'>{index+1}</p>
                    <p className='py-2 col-span-4'>{user.firstName} {user.lastName}</p>
                    <p className='py-2 col-span-4'>{user.email}</p>
                    <p className='py-2 col-span-3'>{user.role}</p>
                </div>
                )): <p className='my-3 text-center'>no data</p>}
                
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default UserList