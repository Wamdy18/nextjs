'use client'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import React, { FormEventHandler } from 'react'

const SignInForm = () => {
    const router = useRouter()
    
    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget)
        const res = await signIn('credentials', {
            name: formData.get('name'),
            password: formData.get('password'),
            redirect: false
        })

        if (res && !res.error) {
            router.push('/');
        } else {
            console.log(res);
        }
    }

  return (
    <form onSubmit={handleSubmit}>
         <br />
         <label >Логин</label>
         <input type="text" name="name" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-1/2"/>
         <br />
         <label>Пароль</label>
         <input type="password" name="password" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-1/2" />
         <button
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mt-5"
         >
            Авторизоваться
         </button>
    </form>
  )
}

export default SignInForm