import {z} from 'zod'

export const signupInputs = z.object({
    username: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()
})


export const signinInputs = z.object({
    username: z.string().email(),
    password: z.string().min(6),
})


export const blogInputs = z.object({
    title: z.string().min(3),
    content: z.string().min(50)
})


export const blogUpdates= z.object({
    title: z.string().min(3),
    content: z.string().min(50),
    id: z.number()
})

export type BlogUpdates = z.infer<typeof blogUpdates>
export type SignupInputs = z.infer<typeof signupInputs>
export type SigninInputs = z.infer<typeof signinInputs>
export type BlogInputs = z.infer<typeof blogInputs>