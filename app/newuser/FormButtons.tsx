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
import FormStepTwo from "./FormStepTwo";

interface FormButtonsProps {
	form: any;
	formStep: number;
	setFormStep: React.Dispatch<React.SetStateAction<number>>;
}

function FormButtons({ form, formStep, setFormStep }: FormButtonsProps) {
	return (
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
					form.trigger(["firstName", "lastName", "email", "passingYear"]);
					const emailState = form.getFieldState("firstName");
					const nameState = form.getFieldState("lastName");
					const yearState = form.getFieldState("email");

					if (!emailState.isDirty || emailState.invalid) {
						console.log("emailState", emailState);
						return;
					}
					if (!nameState.isDirty || nameState.invalid) {
						console.log("nameState", nameState);
						return;
					}
					if (!yearState.isDirty || yearState.invalid) {
						console.log("yearState", yearState);
						return;
					}

					setFormStep(1);
					console.log("formStep", formStep);
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
	);
}

export default FormButtons;
