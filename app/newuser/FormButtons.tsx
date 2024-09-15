"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

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
				onClick={async () => {
					await form.trigger(["firstName", "lastName", "email", "age"]);
					const emailState = form.getFieldState("firstName");
					const firstNameState = form.getFieldState("firstName");
					const lastNameState = form.getFieldState("lastName");
					const ageState = form.getFieldState("age");

					if (!emailState.isDirty || emailState.invalid) {
						console.log("emailState", emailState);
						return;
					}
					if (!firstNameState.isDirty || firstNameState.invalid) {
						console.log("firstNameState", firstNameState);
						return;
					}
					if (!lastNameState.isDirty || lastNameState.invalid) {
						console.log("lastNameState", lastNameState);
						return;
					}
					if (ageState.invalid) {
						console.log("ageState", ageState);
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
