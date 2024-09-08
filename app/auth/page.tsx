import TabSwitcher from "@/components/custom/TabSwitcher";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import { getUser } from "@/lib/auth/lucia";
import { redirect } from "next/navigation";
import GoogleOAuth from "@/components/custom/GoogleOAuthButton";

export default async function Auth() {
	const user = await getUser();
	if (user) {
		redirect("/dashboard");
	}
	return (
		<div className="relative flex w-full h-screen bg-background">
			<div className="max-w-3xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
				<GoogleOAuth />
				<div className="h-4"></div>
				<TabSwitcher SignUpTab={<SignUpForm />} SignInTab={<SignInForm />} />
			</div>
		</div>
	);
}
