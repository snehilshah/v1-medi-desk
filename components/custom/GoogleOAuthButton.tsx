"use client";
import { Button } from "../ui/button";
import { RiGoogleFill } from "@remixicon/react";
import { getGoogleOAuthConsentUrl } from "@/actions/auth";
import { toast } from "sonner";

function GoogleOAuth() {
	return (
		<Button
			onClick={async () => {
				const res = await getGoogleOAuthConsentUrl();
				console.log("Connectiong with Google");
				if (res.url) {
					window.location.href = res.url;
				}else{
          toast.error("Something went wrong");
        }
				console.log(res);
			}}
		>
			<RiGoogleFill />
			Continue with Google
		</Button>
	);
}

export default GoogleOAuth;
