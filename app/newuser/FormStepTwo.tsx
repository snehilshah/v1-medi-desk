"use client";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

interface FormStepTwoProps {
	form: any;
	formStep: number;
}

function FormStepTwo({ form, formStep }: FormStepTwoProps) {
	return (
		<div>
			<FormField
				control={form.control}
				name="password"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Password</FormLabel>
						<FormControl>
							<Input
								placeholder="Enter your password..."
								{...field}
								type="password"
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			{/* confirm password */}
			<FormField
				control={form.control}
				name="confirmPassword"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Confirm password</FormLabel>
						<FormControl>
							<Input
								placeholder="Please confirm your password..."
								{...field}
								type="password"
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</div>
	);
}

export default FormStepTwo;
