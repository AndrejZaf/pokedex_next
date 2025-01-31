"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

const navigation = [
    {
        href: "/",
        label: "Home",
    },
    {
        href: "/pokedex",
        label: "Pokedex",
    },
    {
        href: "/about",
        label: "About",
    },
];

const Navbar = () => {
    return (
        <div className="container mt-4 mx-auto flex items-center justify-between px-4 py-2 md:py-0">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="md:hidden">
                        <MenuIcon className="h-6 w-6" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <VisuallyHidden>
                        <SheetHeader>
                            <SheetTitle>Edit profile</SheetTitle>
                            <SheetDescription>
                                Make changes to your profile here. Click save when you're done.
                            </SheetDescription>
                        </SheetHeader>
                    </VisuallyHidden>
                    <div className="grid p-4">
                        {navigation.map((item) =>
                            <Link key={item.label} href={item.href}
                                  className="transition-all delay-75 text-lg py-2 border-b-4 border-transparent">
                                <div>
                                    {item.label}
                                </div>
                            </Link>)}
                    </div>
                </SheetContent>
            </Sheet>
            <Link href="/" className="flex items-center gap-2">
                <img className="h-12 w-12" alt="Pokedex Logo" src="/pokeball-logo.svg" />
            </Link>
            <div className="hidden md:flex gap-4">
                {navigation.map((item) =>
                    <Link key={item.label} href={item.href}
                          className="transition-all delay-75 text-lg py-2 border-b-4 border-transparent">
                        <div>
                            {item.label}
                        </div>
                    </Link>)}
            </div>
            <div className="flex">
                <ModeToggle />
            </div>
        </div>
    );
};
export default Navbar;