import UserPanelLayout from '@/src/components/user-panel/layout-user-panel';
import { Card, CardHeader } from '@/src/components/ui/card';

export default async function ProtectedPage() {

	return (
		<UserPanelLayout>
			<Card className='w-56'>
				<CardHeader>Protected Content</CardHeader>
				<p>This is a sample page that is protected by middleware and is authorized</p>
			</Card>
		</UserPanelLayout>
	);

}
