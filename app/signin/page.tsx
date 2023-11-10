import GoogleButton from '@/components/GoogleButton'
import SignInForm from '@/components/SignInForm'
import React from 'react'

const SignInPage = async () => {
  return (
    <div>
      <h1>Авторизация</h1>
      <br />
      <GoogleButton />
      <br /><br />
      <span>or</span>
      <SignInForm />
    </div>
  )
}

export default SignInPage