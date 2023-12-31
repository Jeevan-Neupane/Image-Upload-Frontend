import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:9099/api'
    }),
    endpoints(builder) {
        return {
            registerUser: builder.mutation({
                query: (formData) => {
                    return {
                        url: '/register',
                        method: "POST",
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        body: formData
                    }
                }
            }),

        }
    }
})




export const { useRegisterUserMutation } = api;