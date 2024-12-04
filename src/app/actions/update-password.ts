"use server";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z
	.object({
		newPassword: z.string().min(8, "New password must be at least 8 characters"),
		confirmNewPassword: z.string().min(8, "Confirm new password must be at least 8 characters"),
		token: z.string().min(1, "Token not found"),
	})
	.refine((data) => data.newPassword === data.confirmNewPassword, {
		message: "Passwords don't match",
		path: ["confirmNewPassword"],
	});

export async function updatePassword(_prevState: unknown, formData: FormData) {
	const validatedFields = schema.safeParse({
		newPassword: formData.get("newPassword"),
		confirmNewPassword: formData.get("confirmNewPassword"),
		token: formData.get("token"),
	});

	if (!validatedFields.success) {
		return { error: validatedFields.error.errors[0].message };
	}

	const { newPassword, token } = validatedFields.data;
	await auth.api.resetPassword({
		body: {
			token: token,
			newPassword: newPassword,
		},
	});
	redirect("/signin");
}
