import { Lucia } from "lucia";

import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { prisma } from "../db/prisma";
import { cookies } from "next/headers";

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		name: "medi-desk-auth",
		expires: false,
		attributes: {
			secure: process.env.NODE_ENV === "production",
		},
	},
});

export const getUser = async () => {
	const sessionId = cookies().get(lucia.sessionCookieName)?.value || null;
	console.log("This is session", sessionId);
	if (!sessionId) return null;

	const { session, user } = await lucia.validateSession(sessionId);

	try {
		if (session && session.fresh) {
			// refresh their session cookie
			const sessionCookie = await lucia.createSessionCookie(sessionId);
			cookies().set(
				sessionCookie.name,
				sessionCookie.value,
				sessionCookie.attributes
			);
		}
		if (!session) {
			const sessionCookie = await lucia.createBlankSessionCookie();
			cookies().set(
				sessionCookie.name,
				sessionCookie.value,
				sessionCookie.attributes
			);
		}
	} catch (err) {
		console.log(err);
	}

	const dbUser = await prisma.user.findUnique({
		where: {
			id: user?.id,
		},
		select: {
			name: true,
			email: true,
      picture: true,
		},
	});

	return dbUser;
};
