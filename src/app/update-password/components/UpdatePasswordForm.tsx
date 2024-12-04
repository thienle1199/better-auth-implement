"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { updatePassword } from "../../actions/update-password";

export default function UpdatePasswordForm({token = ""}: {token?: string}) {
	const [state, formAction, isSubmitting] = useActionState(updatePassword, null);

	const handleSubmit = (formData: FormData) => {
		formAction(formData);
	};

	return (
		<Card className="w-full max-w-md">
			<CardHeader>
				<CardTitle className="text-2xl font-bold">Update Password</CardTitle>
				<CardDescription>Change your account password</CardDescription>
			</CardHeader>
			<form action={handleSubmit}>
				<CardContent className="space-y-4">
          <input name="token" hidden defaultValue={token} />
					<div className="space-y-2">
						<Label htmlFor="newPassword">New Password</Label>
						<Input id="newPassword" name="newPassword" type="password" required />
					</div>
					<div className="space-y-2">
						<Label htmlFor="confirmNewPassword">Confirm New Password</Label>
						<Input id="confirmNewPassword" name="confirmNewPassword" type="password" required />
					</div>
					{state?.error && (
						<Alert variant="destructive">
							<AlertDescription>{state.error}</AlertDescription>
						</Alert>
					)}

				</CardContent>
				<CardFooter>
					<Button type="submit" className="w-full" disabled={isSubmitting}>
						{isSubmitting ? "Updating..." : "Update Password"}
					</Button>
				</CardFooter>
			</form>
		</Card>
	);
}
