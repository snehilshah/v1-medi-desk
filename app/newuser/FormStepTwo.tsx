"use client";
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
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { registerSchema } from "@/lib/zodschema/User";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import FormStepOne from "./FormStepOne";
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
