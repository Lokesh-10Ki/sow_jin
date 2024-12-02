import UserPanelLayout from "@/src/components/user-panel/layout-user-panel"
import {UserTable} from "./datatablebasic"

export default async function DemoPage() {
   
    return (
        <UserPanelLayout>
			<div className="container mx-auto p-2">
				<UserTable />
			</div>
		</UserPanelLayout>
    )
}