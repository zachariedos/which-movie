"use client";

import {
    ArrowRightLeft,
    LogOut,
    Settings, ShoppingCart, Swords,
    User,
} from "lucide-react"

import {Button} from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Session} from "next-auth";
import {signOut} from "next-auth/react";
import Link from "next/link";

type SettingsDropDownProps = {
    session: Session
}

export function SettingsDropDown(props: SettingsDropDownProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">{props.session.user?.email}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link href={"/characters"}>
                            <Swords className="mr-2 h-4 w-4"/>
                            <span>Personnages</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href={"/offers"}>
                            <ShoppingCart  className="mr-2 h-4 w-4"/>
                            <span>Vos offres</span>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator/>
                <DropdownMenuItem onClick={() => signOut({callbackUrl: "/api/auth/signin"})}>
                    <LogOut className="mr-2 h-4 w-4"/>
                    <span>Déconnexion</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
