"use client"
import * as React from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/src/lib/utils"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { useToast } from "@/src/components/ui/use-toast"
import { signIn } from "next-auth/react"
import { AppContext } from "@/src/context/AppContext"
import { UserContext } from "@/src/context/UserContext"
import { Button } from "@/src/components/ui/button"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
	const [isLoading, setIsLoading] = React.useState<boolean>(false)
	const [email, setEmail] = React.useState<string>("")
	const [password, setPassword] = React.useState<string>("")
	const router = useRouter()
	const { toast } = useToast()
	const { dispatch: appDispatch } = React.useContext(AppContext)
	const user = React.useContext(UserContext)

	React.useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await fetch("/api/ssologin")
				if (!response.ok) throw new Error("Failed to fetch user data")
				const { dataAuth } = await response.json()

				appDispatch({ type: "SET_LOGIN_TRUE" })
				user.dispatch({
					type: "SET_USER_DATA",
					payload: {
						id: dataAuth.id,
						name: dataAuth.displayName,
						designation: dataAuth.jobTitle,
						email: dataAuth.mail,
						phone: dataAuth.mobilePhone,
						headshot : dataAuth.headshot
					},
				})
				router.push("/home")
			} catch (error) { }
		}

		if (isLoading) {
			fetchUserData()
		}
	}, [isLoading, appDispatch, user, router, toast])

	const handleLogin = async (event: React.SyntheticEvent) => {
		event.preventDefault()
		setIsLoading(true)

		try {
			const response = await fetch("/api/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			})

			if (!response.ok) {
				throw new Error("Login failed")
			}

			const userData = await response.json()
			router.push("/home")
		} catch (error) {
			toast({
				title: "Invalid email or password",
				description: "Please try again with the correct credentials",
			})
		}

		setIsLoading(false)
	}

	const handleSSOLogin = async () => {
		setIsLoading(true)

		try {
			const result = await signIn("azure-ad", { redirect: false })

			if (result?.error) {
				throw new Error(result.error)
			}
		} catch (error) {
			console.log(error)
			toast({
				title: "An error occurred",
				description:
					"Unable to complete SSO login. Please try again later.",
			})
		}

		setIsLoading(false)
	}

	return (
		<div className={cn("grid gap-6", className)} {...props}>
			<form onSubmit={handleLogin}>
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
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						<Input
							id="password"
							placeholder="Password"
							type="password"
							disabled={isLoading}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<Button
						disabled={isLoading}
						className="font-bold"
						type="submit"
					>
						{isLoading ? "Loading..." : "Login"}
					</Button>
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
