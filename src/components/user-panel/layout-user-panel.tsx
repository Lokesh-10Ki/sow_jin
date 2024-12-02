"use client";

import { cn } from "@/src/lib/utils";
import { useStore } from "@/src/hooks/use-store";
import { Sidebar } from "@/src/components/ui/sidebar";
import { useSidebarToggle } from "@/src/hooks/use-sidebar-toggle";
import { Toaster } from "@/src/components/ui/toaster"

export default function UserPanelLayout({
  	children
}: {
  	children: React.ReactNode;
}) {
	const sidebar = useStore(useSidebarToggle, (state) => state);

	if (!sidebar) return null;

	return (
		<>
			<Sidebar />
			<main
				className={cn(
					"bg-background min-h-[calc(100vh_-_56px)] transition-[margin-left] ease-in-out duration-300",
					sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-64"
				)}
			>
				{children}
				<Toaster/>
			</main>
			<footer
				className={cn(
					"transition-[margin-left] ease-in-out duration-300",
					sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-64"
				)}
			>
			</footer>
		</>
	);
}