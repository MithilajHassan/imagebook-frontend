import OTPForm from '@/components/user/OtpForm'
import SignupForm from '@/components/user/SignupForm'
import { useState } from 'react'

export default function SignupPage() {
      const [isOtpSent , setOtpSent] = useState(false)
      const [email,setEmail] = useState<string>('')
  return (
    <div className='w-full'>
        {isOtpSent ? (<OTPForm email={email} />) : (<SignupForm setOtpSent={setOtpSent} setUserEmail={setEmail} />)}
    </div>
  )
}