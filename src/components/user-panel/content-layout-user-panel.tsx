import { SheetMenu } from "../ui/sheet-menu";
import UserPanelLayout from "./layout-user-panel";

interface ContentLayoutProps {
	title: string;
	children: React.ReactNode;
}

export function ContentLayout({ title, children }: ContentLayoutProps) {
	return (
		<UserPanelLayout>
			<div className="container mx-auto py-8">
				<div className="absolute left-8 top-8">
					<SheetMenu />
				</div>
				{children}
			</div>
		</UserPanelLayout>
	);
}