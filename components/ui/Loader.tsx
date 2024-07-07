import {LoaderCircle} from "lucide-react";

type LoaderProps = {
    size?: number;
}
export const Loader = (props:LoaderProps) => {
    return <LoaderCircle
        className="animate-spin"
        size={props.size}
    />
}