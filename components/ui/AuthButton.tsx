"use client";
import {signIn, signOut} from "next-auth/react";
import {Button} from "@/components/ui/button";
import {ReactNode} from "react";
import {GoogleIcon} from "@/components/icons/GoogleIcon";
import {DiscordIcon} from "@/components/icons/DiscordIcon";

type SignInButtonProps = {
    provider: string
    children: ReactNode
    className?: string
}

const SignInButton = (props: SignInButtonProps) => {
    return <Button
        variant="outline"
        className={props.className}
        onClick={() =>
            signIn(
                props.provider, {
                    callbackUrl: "/",
                    redirect: true
                })
        }
    >
        {props.children}
    </Button>
}

export const GoogleLoginButton = () => {
    return <SignInButton provider={"google"} className={"inline-flex gap-1 items-center px-2"}>
        <GoogleIcon className={"size-6"}/>
        Connexion avec Google
    </SignInButton>
}