import React from 'react'
import {auth, provider} from '../firebase'
import App from '../App'

const Login = ({setUserProfile}) => {
  const signIn = () => {
      auth.signInWithPopUp(provider).then((result) => {
        setUserProfile(result.user)
      })
  }
  return (
    <div className='flex h-screen justify-center items-center '>
        <div className='text-center border w-2/4 h-2/4 bg-gray-200'>
            <div className='justify-center flex mt-8'>
            <img src='./../assets/Google_Drive_logo.png' className='w-52'/>
            </div>
            <div className='justify-center flex mt-14'>
                <button className='bg-blue-500 bg-radient-to-r from-blue-500 to-blue-700 text-white font-bold py-2 px-4 rounded text-base w-2/4' role="button"
                onClick={signIn}
                
                >
                    LOGIN TO GOOGLE DRIVE
                </button>
            </div>
            
      </div>

    </div>
  )
}

export default Login
