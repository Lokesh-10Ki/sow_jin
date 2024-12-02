import {Metadata} from "next"
import Image from "next/image"
import Link from "next/link"

import {cn} from "@/src/lib/utils"
import {UserAuthForm} from "@/src/app/login/user-auth-form"

import ThemeButton from "@/src/components/app/ThemeButton"
import { buttonVariants } from "@/src/components/ui/button"
import LoginButton from "./components/ButtonSSO"

export const metadata: Metadata = {
	title: "Authentication",
	description: "Authentication forms built using the components.",
}

export default function AuthenticationPage() {
	return (
		<>
			<div className="md:hidden">
				<Image
					src="/examples/authentication-light.png"
					width={1280}
					height={843}
					alt="Authentication"
					className="block dark:hidden"
				/>
				<Image
					src="/examples/authentication-dark.png"
					width={1280}
					height={843}
					alt="Authentication"
					className="hidden dark:block"
				/>
			</div>
			<div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
				<div className="absolute right-32 top-8 mt-1">
					<ThemeButton />
				</div>
				<Link
					href="/register"
					className={cn(
						buttonVariants({variant: "ghost"}),
						"absolute right-4 top-4 md:right-8 md:top-8"
					)}
				>
					Register
				</Link>
				<div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
					<div className="absolute inset-0 bg-[#0c0627] half-side" />
					<div className="relative z-20 flex items-center text-lg font-medium">
						<img src="/logo-dark.svg" alt="Logo" />
					</div>
				</div>
				<div className="lg:p-8">
					<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
						<div className="flex flex-col space-y-2 text-center">
							<h1 className="text-2xl font-semibold tracking-tight">
								Login to your account
							</h1>
							<p className="text-sm text-text-gray-50">
								Enter your email and password below to login
							</p>
						</div>
						<UserAuthForm />
						<div className="w-full">
						<LoginButton/>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
