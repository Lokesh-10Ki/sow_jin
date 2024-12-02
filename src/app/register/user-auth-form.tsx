"use client"

import * as React from "react"
import { cn } from "@/src/lib/utils"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import Link from "next/link"
import { Checkbox } from "@/src/components/ui/checkbox" // Import the Checkbox component

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
	const [isLoading, setIsLoading] = React.useState<boolean>(false)
	const [isChecked, setIsChecked] = React.useState<boolean>(false) // Checkbox state

	async function onSubmit(event: React.SyntheticEvent) {
		event.preventDefault()
		setIsLoading(true)
		
		setTimeout(() => {
			setIsLoading(false)
		}, 2000)
	}

	return (
		<div className={cn("grid gap-6", className)} {...props}>
			<form onSubmit={onSubmit}>
				<div className="grid gap-2">
					<div className="grid gap-1">
						<Label className="sr-only" htmlFor="email">
							Email
						</Label>
						<Input
							id="email"
							placeholder="name@example.com"
							type="email"
							autoCapitalize="none"
							autoComplete="email"
							autoCorrect="off"
							disabled={isLoading}
							required
						/>
						<Input
							id="password"
							placeholder="Password"
							type="password"
							disabled={isLoading}
							required
						/>
					</div>

					<div className="flex items-center gap-2">
						<Checkbox
							checked={isChecked}
							onCheckedChange={(checked) => setIsChecked(checked === true)}
							className=""
						/>
						<p className="text-sm text-gray-500">
							By clicking continue, you agree to our{" "}
							<Link
								href="/terms"
								className="underline underline-offset-4 hover:text-primary"
							>
								Terms of Service
							</Link>{" "}
							and{" "}
							<Link
								href="/privacy"
								className="underline underline-offset-4 hover:text-primary"
							>
								Privacy Policy
							</Link>
							.
						</p>
					</div>

					<Link href="/">
						<Button
							disabled={isLoading || !isChecked}
							className="dark:bg-appColor4 w-full dark:text-appColor6 font-bold"
						>
							Sign up with Email
						</Button>
					</Link>
				</div>
			</form>
			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background px-2 text-gray-500">
						Or continue with
					</span>
				</div>
			</div>
		</div>
	)
}
