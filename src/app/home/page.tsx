import { ContentLayout } from '@/src/components/user-panel/content-layout-user-panel';
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

async function setJwt(){
	const response = await fetch("http://localhost:3000/api/ssologin")
}

const HomePage = () => {
	setJwt()
	return (
		<div>
			SOW
		</div>
	);
};

export default HomePage;
