import { z } from "zod";

export const signInSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

export const signUpSchema = z
	.object({
		name: z.string().min(5),
		email: z.string().email(),
		password: z.string().min(8),
		confirmPassword: z.string().min(8),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export const registerSchema = z.object({
	firstName: z
		.string()
		.min(3, { message: "Your name should not be that short!" })
		.max(255, { message: "Your name should not be that long!" }),
	lastName: z
		.string()
		.min(3, { message: "Your name should not be that short!" })
		.max(255, { message: "Your name should not be that long!" }),
	email: z.string().email(),
	city: z.string().min(2).max(10),
	age: z
		.coerce
		.number()
		.int()
		.positive()
		.min(18, { message: "You should be at least 18 years old!!" })
		.max(100, { message: "Too old to be a doctor!!" }),
	passingYear: z.string().min(2).max(10),
	password: z.string().min(6).max(100),
	confirmPassword: z.string().min(6).max(100),
});
