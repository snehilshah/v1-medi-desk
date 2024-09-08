import SignOutButton from "@/components/custom/SignOutuButton";
import { getUser } from "@/lib/auth/lucia";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

async function dashboardPage() {
	const user = await getUser();
	if (!user) {
		redirect("/auth");
	}
	return (
		<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
			<div className="flex items-center gap-2 border p-4 rounded-lg bg-gray-100 transition-all cursor-pointer hover:shadow-xl">
				{user.picture && (
					<Image
						src={user.picture}
						alt="profile"
						className="rounded-full size-16"
						height={40}
						width={40}
					/>
				)}
				<div className="flex flex-col">
          <span className="font-semibold text-xl">{user.name}</span>
          <span className="text-gray-500">{user.email}</span>
        </div>
				<h1>DashBoard Page</h1>
				<h2>You are {user.name}</h2>
			</div>
			<SignOutButton />
		</div>
	);
}

export default dashboardPage;
