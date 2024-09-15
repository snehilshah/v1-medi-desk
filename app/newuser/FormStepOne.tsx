"use client";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { motion } from "framer-motion";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { registerSchema } from "@/lib/zodschema/User";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface FormStepOneProps {
	form: any;
	formStep: number;
}

function FormStepOne({ form, formStep }: FormStepOneProps) {
	return (
		<div>
			<div className="flex gap-6">
				{/* first name */}
				<FormField
					control={form.control}
					name="firstName"
					render={({ field }) => (
						<FormItem className="grow">
							<FormLabel>First Name</FormLabel>
							<FormControl>
								<Input placeholder="" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* last name */}
				<FormField
					control={form.control}
					name="lastName"
					render={({ field }) => (
						<FormItem className="grow">
							<FormLabel>Last Name</FormLabel>
							<FormControl>
								<Input placeholder="" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
			{/* email */}
			<FormField
				control={form.control}
				name="email"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Email</FormLabel>
						<FormControl>
							<Input placeholder="Enter your email" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			{/* city */}
			<FormField
				control={form.control}
				name="city"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Select City</FormLabel>
						<Select onValueChange={field.onChange} defaultValue={field.value}>
							<FormControl>
								<SelectTrigger>
									<SelectValue placeholder="Select your current city" />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								{["Mumbai", "Delhi", "Pune", "Banglore"].map((city) => {
									return (
										<SelectItem value={city.toString()} key={city}>
											{city}
										</SelectItem>
									);
								})}
							</SelectContent>
						</Select>
						<FormMessage />
					</FormItem>
				)}
			/>
		</div>
	);
}

export default FormStepOne;
