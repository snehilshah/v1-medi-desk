"use client";
import { logout } from "@/actions/auth";
import { Button } from "../ui/button";

type Props = {
	children: React.ReactNode;
};
function SignOutButton() {
	return (
		<Button
			onClick={() => {
				logout();
			}}
		>
			Sign Out
		</Button>
	);
}

export default SignOutButton;
