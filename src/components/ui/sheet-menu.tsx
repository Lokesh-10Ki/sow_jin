"use client"
import Link from "next/link";
import { MenuIcon, PanelsTopLeft } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/src/components/ui/button";
import { Menu } from "@/src/components/ui/menu";
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
} from "@/src/components/ui/sheet";

export function SheetMenu() {
  const { setTheme, theme } = useTheme();
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <MenuIcon className="cursor-pointer m-2" size={20} />
      </SheetTrigger>
      <SheetContent className="w-72 h-full flex flex-col " side="left">
      <div className="absolute opacity-30 top-0 left-0 w-full h-full sidebar-bg"></div>
      <div className="dark:bg-[url('../../public/LogoIcons/All_Seeing_Slidebar_Background_Dark.svg')] h-full overflow-scroll">
        <SheetHeader className="mb-6">
          <Button
            className="flex justify-center items-center pb-2 pt-1"
            variant="link"
            asChild
          >
            <Link href="/home" className={`flex mt-8 h-full items-center gap-2 dark:mt-6`}>
            {
              theme === "dark" ? (
                <img  width={130} className="mb-1" src="/jmanlogo.svg" />
              ) : (
                <img  width={130} className="mb-1" src="/jmanlogo_dark.svg" />
              )
            }
            <h1
              className="font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300">
            </h1>
            </Link>
          </Button>
        </SheetHeader>
        <Menu isOpen />
    </div>
      </SheetContent>
    </Sheet>
  );
}