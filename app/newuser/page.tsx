"use client";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { motion } from "framer-motion";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { registerSchema } from "@/lib/zodschema/User";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const inter = Inter({ subsets: ["latin"] });
type Input = z.infer<typeof registerSchema>;

export default function Home() {
	const { toast } = useToast();
	const [formStep, setFormStep] = React.useState(0);
	const form = useForm<Input>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			passingYear: "",
			confirmPassword: "",
		},
	});

	function onSubmit(data: Input) {
		if (data.confirmPassword !== data.password) {
			toast({
				title: "Passwords do not match",
				variant: "destructive",
			});
			return;
		}
		alert(JSON.stringify(data, null, 4));
		console.log(data);
	}

	return (
		<div className="p-5">
			<Card className="">
				<CardHeader>
					<CardTitle>Register with us</CardTitle>
					<CardDescription>Start your doctor journey.</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="">
							<motion.div
								className={cn("space-y-3", {
									hidden: formStep == 1,
								})}
								// formStep == 0 -> translateX == 0
								// formStep == 1 -> translateX == '-100%'
								animate={{
									translateX: `-${formStep * 100}%`,
								}}
								transition={{
									ease: "easeInOut",
								}}
							>
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
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select your current city" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{["Mumbai", "Delhi", "Pune", "Banglore"].map(
														(city) => {
															return (
																<SelectItem value={city.toString()} key={city}>
																	{city}
																</SelectItem>
															);
														}
													)}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
							</motion.div>
							<motion.div
								className={cn("space-y-3 absolute top-0 left-0 right-0", {
									hidden: formStep == 0,
								})}
								// formStep == 0 -> translateX == 100%
								// formStep == 1 -> translateX == 0
								animate={{
									translateX: `${100 - formStep * 100}%`,
								}}
								style={{
									translateX: `${100 - formStep * 100}%`,
								}}
								transition={{
									ease: "easeInOut",
								}}
							>
								{/* password */}
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
							</motion.div>
							<div className="flex gap-2">
								<Button
									type="submit"
									className={cn({
										hidden: formStep == 0,
									})}
								>
									Submit
								</Button>
								<Button
									type="button"
									variant={"default"}
									className={cn({
										hidden: formStep == 1,
									})}
									onClick={() => {
										// validation
										form.trigger([
											"firstName",
											"lastName",
											"email",
											"passingYear",
										]);
										const emailState = form.getFieldState("firstName");
										const nameState = form.getFieldState("lastName");
										const yearState = form.getFieldState("email");
										const idState = form.getFieldState("passingYear");

										if (!emailState.isDirty || emailState.invalid) return;
										if (!nameState.isDirty || nameState.invalid) return;
										if (!yearState.isDirty || yearState.invalid) return;
										if (!idState.isDirty || idState.invalid) return;

										setFormStep(1);
									}}
								>
									Next Step
									<ArrowRight className="w-4 h-4 ml-2" />
								</Button>
								<Button
									type="button"
									variant={"destructive"}
									onClick={() => {
										setFormStep(0);
									}}
									className={cn({
										hidden: formStep == 0,
									})}
								>
									Go Back
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
