import { lucia } from "@/lib/auth/lucia";
import { prisma } from "@/lib/db/prisma";
import { googleOAuthClient } from "@/lib/googleOAuth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
	const url = req.nextUrl;
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");

	if (!code || !state) {
		return new Response("Invalid Request", { status: 400 });
	}

	const codeVerifier = cookies().get("codeVerifier")?.value;
	const savedState = cookies().get("state")?.value;

	if (!codeVerifier || !savedState) {
		return new Response("Invalid Request", { status: 400 });
	}

	if (state !== savedState) {
		return new Response("Invalid Request", { status: 400 });
	}

	const { accessToken } = await googleOAuthClient.validateAuthorizationCode(
		code,
		codeVerifier
	);

	const googleResponse = await fetch(
		"https://www.googleapis.com/oauth2/v1/userinfo",
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		}
	);

	const googleData = (await googleResponse.json()) as {
		id: string;
		email: string;
		name: string;
		picture: string;
	};

	let userId: string = "";

	// if email exist we can create cookie and sign them in
	// else we can create a new user and signup

	const existingUser = await prisma.user.findUnique({
		where: {
			email: googleData.email,
		},
	});

	if (existingUser) {
		userId = existingUser.id;
	} else {
		const user = await prisma.user.create({
			data: {
				name: googleData.name,
				email: googleData.email,
				picture: googleData.picture,
			},
		});
		userId = user.id;
	}
	const session = await lucia.createSession(userId, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes
	);

	return redirect("/dashboard");
}
