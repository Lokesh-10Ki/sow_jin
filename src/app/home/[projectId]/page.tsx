import { ContentLayout } from '@/src/components/user-panel/content-layout-user-panel';
import { NextPage } from 'next';
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/src/components/ui/tabs"
import { projectsData } from '@/src/constatnts/projects';

async function setJwt(){
	const response = await fetch("http://localhost:3000/api/ssologin")
}

interface projectIDProp {
	params: {
		projectId: string;
	};
  }

const HomePage: NextPage<projectIDProp> = ({params}) => {
	setJwt()
	const projectId = params.projectId;

	console.log(projectId,"check")
	return (
		<div className="flex-1 space-y-4 p-8 pt-6">
				<div className="flex items-center justify-between space-y-2">
					<h2 className="text-3xl font-bold tracking-tight">
						{projectsData.find((project) => project.projectId === parseInt(projectId))?.projectName}
					</h2>
					<div className="flex items-center space-x-2"></div>
				</div>
				<Tabs defaultValue="US" className="space-y-4">
					<TabsList>
						<TabsTrigger value="US">US</TabsTrigger>
						<TabsTrigger value="UK" disabled>
							UK
						</TabsTrigger>
					</TabsList>
					<TabsContent value="US" className="space-y-4">
							
						
					</TabsContent>
					<TabsContent value="UK" className="space-y-4">
							
						
					</TabsContent>
				</Tabs>
			</div>
		
	);
};

export default HomePage;
