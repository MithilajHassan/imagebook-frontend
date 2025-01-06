import { IUser } from '@/types/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const userApi = createApi({
    reducerPath:'api',
    baseQuery:fetchBaseQuery({ baseUrl: process.env.REACT_APP_BACKEND_URL, credentials: 'include' }),
    endpoints: (builder) => ({
        signup: builder.mutation<{success:boolean,message:string},IUser>({
            query:(data)=>({
                url:`/signup`,
                method:'POST',
                body:data
            })
        }),

        verifyUser: builder.mutation<{success:boolean},{email:string,otp:number}>({
            query:(data)=>({
                url:`/verifyuser`,
                method:'POST',
                body:data
            })
        }),

        resendOtp: builder.mutation<{success:boolean,message:string},{email:string}>({
            query:(data)=>({
                url:`/resendotp`,
                method:'POST',
                body:data
            })
        }),

        signin: builder.mutation<{success:boolean,userData:IUser},{email:string,password:string}>({
            query:(data)=>({
                url:`/signin`,
                method:'POST',
                body:data
            })
        }),

        signout: builder.mutation<{message:string,success:boolean},void>({
            query:(data)=>({
                url:`/signout`,
                method:'POST',
                body:data
            })
        }),

        changePassword: builder.mutation<{message:string,success:boolean},{email:string,newPassword:string}>({
            query:(data)=>({
                url:`/changepassword`,
                method:'POST',
                body:data
            })
        }),




    })
})


export const { 
    useSignupMutation,
    useVerifyUserMutation,
    useSigninMutation,
    useResendOtpMutation,
    useSignoutMutation,
    useChangePasswordMutation,
    
} = userApi