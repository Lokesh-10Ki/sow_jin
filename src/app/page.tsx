import { Button } from '@/src/components/ui/button';
import UserPanelLayout from '@/src/components/user-panel/layout-user-panel';
import Link from 'next/link';

const Header = () => (
	<UserPanelLayout>
		<header className="min-h-[calc(100vh-6rem)] mt-10 ">
			<div className="max-w-4xl mx-auto py-16 px-14 sm:px-6 lg:px-8">
				<h1 className="font-sans font-bold text-4xl md:text-5xl lg:text-8xl text-center leading-snug text-gray-800 dark:text-[#fafafa]">
					Welcome to JMAN NextJS Template
				</h1>
				<div className="max-w-xl mx-auto">
					<p className="mt-10 text-gray-500 dark:text-[#fafafa] text-center text-xl lg:text-3xl">
						Reduce the time taken to setup your NextJS project using this boilerplate 🚀
					</p>
				</div>
				<div className="mt-10 flex justify-center items-center w-full mx-auto">
					<Link href="https://ui.shadcn.com/docs/components/accordion">
						<Button>Browse components<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevron-right ml-1  size-4 shrink-0 transition-all duration-300 ease-out group-hover:translate-x-1"><path d="m9 18 6-6-6-6"></path></svg></Button>
					</Link>
				</div>
			</div>
			<div className="flex justify-center w-full">
				<div className="mt-4 w-full">
					<div className="flex items-center justify-center mx-auto flex-wrap"></div>
				</div>
			</div>
		</header>
	</UserPanelLayout>
);

export default Header;
