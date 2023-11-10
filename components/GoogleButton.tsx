'use client'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const GoogleButton = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  
    return (
    <button
    className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mt-5"
    onClick={() => {
        signIn('google', {
            callbackUrl
        })
    }}>
        Авторизоваться через Google
    </button>
  )
}

export default GoogleButton