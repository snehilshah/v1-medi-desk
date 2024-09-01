'use server'

import { signUpSchema } from "@/app/auth/SignUpForm";

export function signUp(values: z.infer<typeof signUpSchema>) {

}