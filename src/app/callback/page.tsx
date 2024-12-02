"use client"

import { useContext, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { AppContext } from "@/src/context/AppContext"
import { UserContext } from "@/src/context/UserContext"

import LoadingPage from "../loading"

const AuthCallback = () => {
	const router: any = useRouter()
	const searchParams = useSearchParams()
	const app = useContext(AppContext)
	const user = useContext(UserContext)

	useEffect(() => {
		const fetchAccessToken = async (code: any) => {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/api/getSSOtoken`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						code: code,
						redirectUri: process.env.NEXT_PUBLIC_BASE_URL + "/callback",
					}),
				}
			)

			const data = await response.json()
			if (response.ok) {
				localStorage.setItem("auth", data.token)
				app.dispatch({ type: "SET_LOGIN_TRUE" })
				user.dispatch({
					type: "SET_USER_DATA",
					payload: {
						id: data.dataAuth?.id,
						name: data.dataAuth?.displayName,
						designation: data.dataAuth?.jobTitle,
						email: data.dataAuth?.mail,
                        phone: data.dataAuth?.phone,
						headshot: data.dataAuth?.headshot,
					},
				})
				router.push("/home")
			} else {
				router.push("/login")
			}
		}
		const code = searchParams.get("code")
		fetchAccessToken(code)
	}, [router.query, router])

	useEffect(() => {
		document.title = "Callback | JMAN Marketplace"
	}, [])

	return <div><LoadingPage /></div>
}

export default AuthCallback
