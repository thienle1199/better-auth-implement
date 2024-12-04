"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Navbar() {
	const router = useRouter();

	const session = authClient.useSession();

	const signOut = async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => router.push("/signin"),
			},
		});
	};

	return (
		<div className="flex justify-between">
			<span>{session.data?.user.name}</span>
			{session.data?.session && <Button onClick={signOut}>Sign out</Button>}
		</div>
	);
}
