
import { useState } from 'react'
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';



const Register = () => {
    const navigate = useNavigate()
    const [inputValue, setInputValue] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const { username, firstName, lastName, email, password, confirmPassword } = inputValue

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
                role: 'user'
            });
            navigate('/login')
        } catch (e) {
            alert("Error adding document");
        }
    }
    return (
        <form onSubmit={onSubmit}>
            <div className="my-5 max-w-lg mx-auto">
                <h2 className="text-base font-semibold leading-7 text-gray-900">Register User</h2>

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
                </div>
            </div>

            <div className="my-3 flex items-center justify-center gap-x-6">
                <button type='submit' className='px-3 py-2 bg-purple-500 hover:bg-purple-700 rounded'>Register</button>
            </div>
        </form>
    )
}

export default Register