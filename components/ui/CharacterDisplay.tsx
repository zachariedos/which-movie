"use client";

import {ChevronLeft, ChevronRight} from "lucide-react";
import Image from "next/image";
import {useState} from "react";
import {ClassList} from "@/src/lib/classes";
import {cn} from "@/lib/utils";

type CharacterDisplayProps = {
    gender: 'm' | 'f';
    class: ClassList;
    pseudo?: string;
    clickableCharacter?: boolean;
}
export const CharacterDisplay = (props: CharacterDisplayProps) => {

    const [rotation, setRotation] = useState(1);

    const rotate = (direction) => {
        const newRotation = direction === 'left' ? rotation + 1 : rotation - 1;
        setRotation(newRotation < 1 ? 8 : (newRotation > 8 ? 1 : newRotation));
    };

    return <div className="relative size-fit flex flex-col items-center justify-center select-none mt-7 group">
        {props?.pseudo &&
            <span className={"relative font-bold text-xl"}>{props.pseudo}</span>
        }
        <ChevronLeft
            className="absolute left-0 text-white cursor-pointer z-20"
            size={48}
            onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                rotate('left')
            }}
        />
        <ChevronRight
            className="absolute right-0 text-white cursor-pointer z-20"
            size={48}
            onClick={(e) => {
                e.stopPropagation();
                e.preventDefault()
                rotate('right')
            }}
        />
        <Image
            src={`/images/classes/360/${props.class}/${props.gender}/${rotation}.png`}
            alt={props.class}
            width={250}
            height={250}
            className={cn(
                "relative z-10 transition-all ",
                props?.clickableCharacter ? "group-hover:scale-105 cursor-pointer" : "",
            )}
        />
        <Image
            src={'/images/classes/360/pedestal.png'}
            alt={"pedestal"}
            width={250}
            height={250}
            className={"absolute z-0 -bottom-7 grayscale"}
        />
    </div>
};