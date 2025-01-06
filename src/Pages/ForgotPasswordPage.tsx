import ChangePasswordForm from '@/components/user/ChangePassword'
import ForgotPasswordForm from '@/components/user/ForgotPassword'
import OTPForm from '@/components/user/OtpForm'
import { useState } from 'react'

export default function ForgotPasswordPage() {
  const [isOtpSent, setOtpSent] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [isForget, setForgot] = useState<boolean>(false)
  return (
    <div className='w-full'>
      {isForget ? (<ChangePasswordForm email={email} />) :
        isOtpSent ? (<OTPForm email={email} forgotPassword={setForgot} />) :
          (<ForgotPasswordForm setOtpSent={setOtpSent} setUserEmail={setEmail} />)
      }
    </div>
  )
}