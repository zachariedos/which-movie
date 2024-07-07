import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M 14.25 9.75 L 21 3"/>
        <path d="M16 3h5v5"/>
        <circle cx="10" cy="14" r="6"/>
    </svg>
)
export {SvgComponent as MaleIcon}
