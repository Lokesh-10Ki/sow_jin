import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/src/lib/utils"
import { Button, buttonVariants } from "@/src/components/ui/button"
import { UserAuthForm } from "@/src/app/register/user-auth-form"
import ThemeButton from "@/src/components/app/ThemeButton"
import LoginButton from "../login/components/ButtonSSO";

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
				<div className="absolute right-28 top-8 mt-1"><ThemeButton /></div>
				<Link
					href="/login"
					className={cn(
						buttonVariants({ variant: "ghost" }),
						"absolute right-4 top-4 md:right-8 md:top-8"
					)}
				>
					Login
				</Link>
				<div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
					<div className="absolute inset-0 bg-[#0c0627] half-side" />
					<div className="relative z-20 flex items-center text-lg font-medium">
						<svg xmlns="http://www.w3.org/2000/svg" width="154" height="68" viewBox="0 0 154 68" fill="none">
							<mask id="mask0_1257_241" maskUnits="userSpaceOnUse" x="0" y="8" width="154" height="52">
								<path d="M154 8.30249H0V59.6967H154V8.30249Z" fill="white"/>
							</mask>
							<g mask="url(#mask0_1257_241)">
								<mask id="mask1_1257_241"  maskUnits="userSpaceOnUse" x="0" y="8" width="154" height="52">
									<path d="M154 8.30249H0V59.6967H154V8.30249Z" fill="white"/>
								</mask>
								<g mask="url(#mask1_1257_241)">
									<path d="M86.4762 53.8328V58.9319C85.109 59.4818 83.6426 59.7421 82.1696 59.6965C78.277 59.6965 75.9712 57.2378 75.9712 54.1356C75.9712 51.0205 78.1399 48.5748 81.971 48.5748C83.3769 48.4919 84.7729 48.8573 85.9579 49.6184L86.2617 51.7713C85.0976 50.7641 83.6034 50.2208 82.0643 50.245C79.2839 50.245 77.8202 51.9997 77.8202 54.1386C77.8202 56.4116 79.5143 58.0302 82.3533 58.0302C83.1362 58.0587 83.9177 57.945 84.66 57.6946V53.8328H86.4762Z" fill="white"/>
									<path d="M99.309 50.412H95.1711V53.8319H99.309C100.652 53.8319 101.569 53.1905 101.569 52.1061C101.569 51.0535 100.685 50.412 99.309 50.412ZM103.631 59.4822H100.944L95.1721 54.7813V59.4832H93.34V48.7964H99.5244C101.981 48.7964 103.397 50.0933 103.397 52.0316C103.397 53.9253 101.977 55.238 99.5651 55.238H98.3606L103.631 59.4822Z" fill="white"/>
									<path d="M119.015 54.1399C119.006 53.3778 118.771 52.6355 118.341 52.0063C117.911 51.3771 117.305 50.8891 116.598 50.6037C115.892 50.3184 115.116 50.2484 114.37 50.4027C113.624 50.5569 112.94 50.9285 112.404 51.4706C111.869 52.0127 111.505 52.7011 111.36 53.4492C111.215 54.1973 111.294 54.9717 111.588 55.6748C111.882 56.378 112.377 56.9785 113.011 57.4009C113.646 57.8232 114.391 58.0485 115.153 58.0484C115.67 58.0705 116.186 57.9841 116.667 57.7949C117.149 57.6057 117.586 57.3178 117.95 56.9496C118.313 56.5815 118.596 56.1413 118.779 55.6574C118.963 55.1735 119.043 54.6566 119.015 54.1399ZM109.442 54.1399C109.412 53.0039 109.721 51.8848 110.33 50.9255C110.939 49.9662 111.821 49.2104 112.862 48.7547C113.903 48.299 115.056 48.164 116.174 48.3672C117.292 48.5703 118.324 49.1023 119.138 49.895C119.952 50.6878 120.512 51.7053 120.744 52.8176C120.977 53.9298 120.873 55.0862 120.445 56.139C120.017 57.1917 119.285 58.0929 118.342 58.7274C117.4 59.3618 116.289 59.7007 115.153 59.7007C114.405 59.7409 113.657 59.6258 112.956 59.3625C112.255 59.0992 111.616 58.6936 111.079 58.1712C110.543 57.6487 110.12 57.0208 109.839 56.327C109.557 55.6332 109.422 54.8885 109.442 54.1399Z" fill="white"/>
									<path d="M127.315 55.5121V48.7964H129.142V55.251C129.142 57.1307 130.348 58.0314 132.242 58.0314C134.136 58.0314 135.341 57.1327 135.341 55.251V48.7964H137.173V55.5121C137.173 58.2449 135.158 59.6977 132.242 59.6977C129.325 59.6977 127.311 58.2449 127.311 55.5121" fill="white"/>
									<path d="M145.89 53.8955H149.846C151.173 53.8955 152.043 53.2391 152.043 52.1399C152.043 51.0704 151.172 50.414 149.846 50.414H145.89V53.8955ZM144.058 59.4832V48.7964H149.936C152.439 48.7964 153.875 50.1866 153.875 52.1538C153.875 54.1209 152.408 55.4972 149.936 55.4972H145.889V59.4832H144.058Z" fill="white"/>
									<path d="M150.362 8.30249V33.7583L129.02 8.30249H124.996V38.6072H128.631V13.0213L150.228 38.6072H154.002V8.30249H150.362Z" fill="white"/>
									<path d="M15.3092 28.7357C15.3092 33.2827 13.1882 35.8357 8.08012 35.8357C5.77011 35.8009 3.48913 35.3152 1.36539 34.4058L0 37.359C2.60221 38.6488 5.47954 39.2852 8.38299 39.2129C15.3966 39.2129 19.033 35.7493 19.033 29.2997V8.30249H15.3092V28.7357Z" fill="white"/>
									<path d="M62.2828 8.30249L49.8146 32.3333L37.2589 8.30249H32.4111V38.6072H36.0038V12.9776L49.3806 38.6072H50.0757L63.4059 12.9776V38.6072H66.9986V8.30249H62.2828Z" fill="white"/>
									<path d="M91.1556 8.30249L77.1304 38.6072H81.156L93.2777 11.3808L94.6461 8.30249H91.1556Z" fill="white"/>
									<path d="M98.3058 8.30249L84.2795 38.6072H88.3052L100.428 11.3808L101.796 8.30249H98.3058Z" fill="white"/>
									<g opacity="0.45">
										<mask id="mask2_1257_241" maskUnits="userSpaceOnUse" x="101" y="11" width="15" height="28">
											<path d="M115.973 11.99H101.994V38.6066H115.973V11.99Z" fill="white"/>
										</mask>
										<g mask="url(#mask2_1257_241)">
											<path d="M103.653 11.99L101.994 16.251L111.946 38.6076H115.972L103.653 11.99Z" fill="white"/>
										</g>
									</g>
								</g>
							</g>
						</svg>
					</div>
					<div className="relative z-20 mt-auto">
						<blockquote className="space-y-2">
							<p className="text-lg"></p>
						</blockquote>
					</div>
				</div>
				<div className="lg:p-8">
					<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
						<div className="flex flex-col space-y-2 text-center">
							<h1 className="text-2xl font-semibold tracking-tight">
								Create an account
							</h1>
							<p className="text-sm text-text-gray-50">
								Enter your email below to create your account
							</p>
						</div>
						<UserAuthForm />
						<LoginButton></LoginButton>
					</div>
				</div>
			</div>
		</>
	)
}
