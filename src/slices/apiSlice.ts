import { RootState } from '@/store'
import { IImage, ImageOrderUpdate, IUser } from '@/types/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACKEND_URL,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token        
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
    },
})

export const userApi = createApi({
    reducerPath: 'api',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        signup: builder.mutation<{ success: boolean, message: string }, IUser>({
            query: (data) => ({
                url: `/signup`,
                method: 'POST',
                body: data
            })
        }),

        verifyUser: builder.mutation<{ success: boolean }, { email: string, otp: number }>({
            query: (data) => ({
                url: `/verifyuser`,
                method: 'POST',
                body: data
            })
        }),

        resendOtp: builder.mutation<{ success: boolean, message: string }, { email: string }>({
            query: (data) => ({
                url: `/resendotp`,
                method: 'POST',
                body: data
            })
        }),

        signin: builder.mutation<{ success: boolean, token: string }, { email: string, password: string }>({
            query: (data) => ({
                url: `/signin`,
                method: 'POST',
                body: data
            })
        }),

        changePassword: builder.mutation<{ message: string, success: boolean }, { email: string, newPassword: string }>({
            query: (data) => ({
                url: `/changepassword`,
                method: 'POST',
                body: data
            })
        }),

        //---------------------- Images Api---------------------------------------//

        createImage: builder.mutation<{ message: String, image: IImage }, Partial<IImage>>({
            query: (image) => ({
                url: '/images',
                method: 'POST',
                body: image,
            }),
        }),

        getImages: builder.mutation<IImage[], void>({
            query: () => ({
                url: `/images`,
                method: 'GET'
            })
        }),

        updateImage: builder.mutation<{ message: String, image: IImage }, { id: string; data: Partial<IImage> }>({
            query: ({ id, data }) => ({
                url: `/images/${id}`,
                method: 'PUT',
                body: data,
            })
        }),

        deleteImage: builder.mutation<{ message: string }, string>({
            query: (id) => ({
                url: `/images/${id}`,
                method: 'DELETE',
            })
        }),

        updateImageOrder: builder.mutation<{ success: boolean, message: string }, { images: ImageOrderUpdate[] }>({
            query: (data) => ({
                url: '/images/order',
                method: 'PATCH',
                body: data,
            })
        }),
    })

})


export const {
    useSignupMutation,
    useVerifyUserMutation,
    useSigninMutation,
    useResendOtpMutation,
    useChangePasswordMutation,
    useCreateImageMutation,
    useUpdateImageMutation,
    useDeleteImageMutation,
    useGetImagesMutation,
    useUpdateImageOrderMutation,

} = userApi