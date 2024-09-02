'use server'
import { z } from "zod";
import { signUpSchema } from "@/lib/zodschema/User";
import { prisma } from "@/lib/db/prisma";
import { Argon2id } from 'oslo/password'
import { lucia } from "@/lib/auth/auth";
import { cookies } from "next/headers";

export async function signUp(values: z.infer<typeof signUpSchema>) {
    console.log("On server: ", values)
    try{
        const existingUser = await prisma.user.findUnique({
            where:{
                email: values.email
            }
        })

        if(existingUser){
            return { error: "User already exists", success: false}
        }

        const hashedPassword = await new Argon2id().hash(values.password)

        const user = await prisma.user.create({
            data:{
                email: values.email,
                name: values.name,
                hashedPassword
            }
        })
        const session = await lucia.createSession(user.id, {})
        const sessionCookie = lucia.createSessionCookie(session.id)
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
        return {success: true}
    }catch(err){
        return {
            error: "Something went wrong",
            success: false
        }
    }
}