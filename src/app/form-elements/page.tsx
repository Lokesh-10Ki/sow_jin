import {Metadata} from "next"
import React from "react"
import { ContentLayout } from "@/src/components/user-panel/content-layout-user-panel"

export const metadata: Metadata = {
	title: "Dashboard",
	description: "Example dashboard app built using the components.",
}

export default function DashboardPage() {
	return (
		<ContentLayout title="Hello">
      		Hello
		</ContentLayout>
	)
}
