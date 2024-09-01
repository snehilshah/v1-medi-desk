'use server'
import { z } from "zod";
import { signUpSchema } from "@/lib/zodschema/User";
import { prisma } from "@/lib/db/prisma";
import { Argon2id } from 'oslo/password'

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
    }


    catch(err){
        console.log(err)
    }
}