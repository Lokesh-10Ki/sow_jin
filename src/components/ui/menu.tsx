"use client"
import {Separator} from "./separator"
import Link from "next/link"

import {Badge} from "@/src/components/ui/badge"
import {
	Ellipsis,
	LogOut,
	LayoutGrid,
	User,
	SunIcon,
	MoonIcon,
} from "lucide-react"
import {usePathname} from "next/navigation"
import {useStore} from "@/src/hooks/use-store"
import {useSidebarToggle} from "@/src/hooks/use-sidebar-toggle"
import {cn} from "@/src/lib/utils"
import {getMenuList} from "@/src/lib/menu-list"
import {Button} from "@/src/components/ui/button"
import {ScrollArea} from "@/src/components/ui/scroll-area"
import {CollapseMenuButton} from "@/src/components/ui/collapse-menu-button"
import {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
	TooltipProvider,
} from "@/src/components/ui/tooltip"

import {Avatar, AvatarFallback, AvatarImage} from "@/src/components/ui/avatar"

import {
	Cloud,
	CreditCard,
	Github,
	Keyboard,
	LifeBuoy,
	ChevronUp,
	Mail,
	MessageSquare,
	Plus,
	PlusCircle,
	Settings,
	UserPlus,
	Users,
	Navigation,
} from "lucide-react"

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu"

import {useTheme} from "next-themes"
import {GitHubLogoIcon} from "@radix-ui/react-icons"
import {useRouter} from "next/navigation"
// import { ModeToggle } from "@/components/ui/mode-toggle";
import {signOut} from "next-auth/react"
interface MenuProps {
	isOpen: boolean | undefined
}

export function Menu({isOpen}: MenuProps) {
	const router = useRouter()
	const pathname: any = usePathname()
	const menuList = getMenuList(pathname)
	const handleLogout = async () => {
		await signOut({redirect: false, callbackUrl: "/"})
		const response = await fetch("/api/logout", {
			method: "GET", // Ensure this matches the method expected by your /api/logout endpoint
		})

		if (response.ok) {
			// Redirect to the login page after successful logout
			window.location.href = "/login"
		}
	}

	const {setTheme, theme} = useTheme()
	const sidebar = useStore(useSidebarToggle, (state) => state)
	return (
		<ScrollArea className="[&>div>div[style]]:!block ">
			<nav className="mt-2 h-full w-full">
				<ul className="flex flex-col min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-1 px-5 pb-4">
					{menuList.map(({groupLabel, menus}, index) => (
						<li
							className={cn("w-full", groupLabel ? "" : "")}
							key={index}
						>
							{(isOpen && groupLabel) || isOpen === undefined ? (
								<p className="text-sm font-medium text-muted-foreground px-4 pb-2 max-w-[248px] truncate ">
									<Separator className="mb-4" />
									{groupLabel}
								</p>
							) : !isOpen &&
							  isOpen !== undefined &&
							  groupLabel ? (
								<TooltipProvider>
									<Tooltip delayDuration={100}>
										<TooltipTrigger className="w-full">
											<div className="w-full flex justify-center items-center ">
												<Ellipsis className="h-5 w-5" />
											</div>
										</TooltipTrigger>
										<TooltipContent side="right">
											<p>{groupLabel}</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							) : (
								<div></div>
							)}

							{menus.map(
								(
									{href, label, icon: Icon, active, submenus},
									index
								) =>
									submenus.length === 0 ? (
										<div className="w-full" key={index}>
											<TooltipProvider
												disableHoverableContent
											>
												<Tooltip delayDuration={100}>
													<TooltipTrigger asChild>
														<Button
															variant={
																active
																	? "default"
																	: "ghost"
															}
															className={cn(
																"w-full justify-start h-10 mb-1",
																active &&
																	"bg-foreground text-background" // Adjust the color as needed
															)}
															asChild
														>
															<Link href={href}>
																<span
																	className={cn(
																		isOpen ===
																			false
																			? ""
																			: "mr-4"
																	)}
																>
																	<Icon
																		size={
																			18
																		}
																	/>
																</span>
																<p
																	className={cn(
																		"max-w-[200px] truncate text-primary-foreground",
																		active &&
																			" text-background",
																		isOpen ===
																			false
																			? "-translate-x-96 opacity-0"
																			: "translate-x-0 opacity-100"
																	)}
																>
																	{label}
																</p>
															</Link>
														</Button>
													</TooltipTrigger>
													{isOpen === false && (
														<TooltipContent side="right">
															{label}
														</TooltipContent>
													)}
												</Tooltip>
											</TooltipProvider>
										</div>
									) : (
										<div className="w-full" key={index}>
											<CollapseMenuButton
												icon={Icon}
												label={label}
												active={active}
												submenus={submenus}
												isOpen={isOpen}
											/>
										</div>
									)
							)}
						</li>
					))}
					<li className="w-full grow flex items-end">
						{/* <TooltipProvider disableHoverableContent>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => {}}
                    variant="outline"
                    className="w-full justify-center h-10 mt-5"
                  >
                    <span className={cn(isOpen === false ? "" : "mr-4")}>
                      <LogOut size={18} />
                    </span>
                    <p
                      className={cn(
                        "whitespace-nowrap",
                        isOpen === false ? "opacity-0 hidden" : "opacity-100"
                      )}
                    >
                      Sign out
                    </p>
                  </Button>
                </TooltipTrigger>
                {isOpen === false && (
                  <TooltipContent side="right">Sign out</TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider> */}

						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<div
									className={cn(
										"w-96 flex justify-between  items-center p-2  dark:border-gray-600 rounded-lg border-gray-300 ",
										sidebar?.isOpen &&
											"transition-all duration-200 hover:scale-105 border-[1.5px] cursor-pointer"
									)}
								>
									<div className="flex gap-3 items-center">
										<div>
											<Avatar>
												<AvatarImage
													src="https://github.com/shadcn.png"
													alt="@shadcn"
												/>
												<AvatarFallback>
													CN
												</AvatarFallback>
											</Avatar>
										</div>
										<div>
											{sidebar?.isOpen === true && (
												<div>
													<p className="text-sm font-medium leading-none text-primary-foreground">
														Jman Employee
													</p>
													<p className="text-xs leading-none text-muted-foreground">
														user@jmangroup.com
													</p>
												</div>
											)}
										</div>
									</div>
									<div>
										{sidebar?.isOpen === true && (
											<ChevronUp className="h-4 w-4" />
										)}
									</div>
								</div>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-56 ">
								<DropdownMenuLabel>
									My Account
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<Link
									href="https://github.com/jmangroup"
									target="_blank"
								>
									<DropdownMenuItem className="cursor-pointer">
										<GitHubLogoIcon className="mr-2 h-4 w-4" />
										<span>GitHub</span>
									</DropdownMenuItem>
								</Link>
								<DropdownMenuItem
									onClick={(e) => {
										e.preventDefault()
										setTheme(
											theme === "dark" ? "light" : "dark"
										)
									}}
									className="cursor-pointer"
								>
									<SunIcon className="mr-2 h-4 w-4 rotate-90 scale-0 transition-transform ease-in-out duration-500 dark:rotate-0 dark:scale-100" />
									<MoonIcon className="absolute mr-2 h-4 w-4 rotate-0 scale-1000 transition-transform ease-in-out duration-500 dark:-rotate-90 dark:scale-0" />
									<span>Switch Theme</span>
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<Link href="/login">
									<DropdownMenuItem
										className="cursor-pointer"
										onClick={handleLogout}
									>
										<LogOut className="mr-2 h-4 w-4" />
										<span>Log out</span>
									</DropdownMenuItem>
								</Link>
							</DropdownMenuContent>
						</DropdownMenu>
					</li>
				</ul>
			</nav>
		</ScrollArea>
	)
}
