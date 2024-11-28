import {Loader} from "lucide-react";

export default function Loading() {
    return (
        <div className="min-h-screen flex justify-center items-center">
            <Loader className={"w-16 h-16 text-gray-500 animate-spin"}/>
        </div>
    );
}