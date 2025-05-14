import React, { ReactNode } from 'react'
import { Toaster } from 'sonner'

const AuthLayout = ({children} : {children: ReactNode}) => {
  return (
    <div className='flex min-h-screen justify-center items-center px-20'>{children}
    <Toaster />
    </div>
  )
}

export default AuthLayout