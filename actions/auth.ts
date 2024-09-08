"use server";
import { z } from "zod";
import { signUpSchema, signInSchema } from "@/lib/zodschema/User";
import { prisma } from "@/lib/db/prisma";
import { Argon2id } from "oslo/password";
import { lucia } from "@/lib/auth/lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { generateCodeVerifier, generateState } from "arctic";
import { googleOAuthClient } from "@/lib/googleOAuth";

export async function signUp(values: z.infer<typeof signUpSchema>) {
	try {
		const existingUser = await prisma.user.findUnique({
			where: {
				email: values.email,
			},
		});

		if (existingUser) {
			return { error: "User already exists", success: false };
		}

		const hashedPassword = await new Argon2id().hash(values.password);

		const user = await prisma.user.create({
			data: {
				email: values.email,
				name: values.name,
				hashedPassword,
			},
		});
		const session = await lucia.createSession(user.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies().set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes
		);
		return { success: true };
	} catch (err) {
		return {
			error: "Something went wrong",
			success: false,
		};
	}
}

export const signIn = async (values: z.infer<typeof signInSchema>) => {
	const user = await prisma.user.findUnique({
		where: {
			email: values.email,
		},
	});
	if (!user || !user.hashedPassword) {
		return { success: false, error: "Invalid Credentials!" };
	}
	const passwordMatch = await new Argon2id().verify(
		user.hashedPassword,
		values.password
	);
	if (!passwordMatch) {
		return { success: false, error: "Invalid Credentials!" };
	}

	const session = await lucia.createSession(user.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes
	);
	return { success: true };
};

export const logout = async () => {
	const sessionCookie = await lucia.createBlankSessionCookie();
	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes
	);
	return redirect("/auth");
};

export const getGoogleOAuthConsentUrl = async () => {
	try {
		const state = generateState();
		const codeVerifier = generateCodeVerifier();

		cookies().set("codeVerifier", codeVerifier, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
		});
		cookies().set("state", state, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
		});

		const authURL = await googleOAuthClient.createAuthorizationURL(
			state,
			codeVerifier,
			{
				scopes: ["email", "profile"],
			}
		);
		return { success: true, url: authURL.toString() };
	} catch (error) {
		return { success: false, error: "Something went wrong" };
	}
};
