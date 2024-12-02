import { KeyRound } from "lucide-react";
import Link from "next/link";

export default function LoginButton(){
    return(
        <div>
        	<Link className="inline-flex items-center w-full p-2 bg-foreground text-background justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" href={`https://login.microsoftonline.com/${process.env.AZURE_AUTH_TENANT_ID}/oauth2/v2.0/authorize?client_id=${process.env.AZURE_AUTH_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_BASE_URL + "/callback")}&response_mode=query&scope=openid profile user.read email`}><KeyRound className="mr-2" /> Microsoft SSO</Link>
        </div>
    )
}