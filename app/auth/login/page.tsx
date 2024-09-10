import { UserAuthForm } from "./UserAuth";

export default function page() {
	return (
		<div className="flex mx-auto mt-20 flex-col w-96 border border-gray-600 p-8 rounded-md bg-neutral-100">
			<UserAuthForm />
		</div>
	);
}
