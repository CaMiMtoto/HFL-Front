import React from 'react';
import {AlertCircle} from "lucide-react";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";

// Enum for variant types
enum Variant {
    PRIMARY = 'primary',
    SUCCESS = 'success',
    WARNING = 'warning',
    INFO = 'info',
    LIGHT = 'light',
    DANGER = 'danger',
}

// Interface for props
interface ICustomAlertProps {
    variant: Variant;
    children: React.ReactNode;
}

// CustomAlert component
const CustomAlert: React.FC<ICustomAlertProps> = ({variant, children}) => {
    // Define styles for each variant
    const variantStyles: Record<Variant, string> = {
        [Variant.PRIMARY]: 'bg-primary/10 text-primary border-primary/20',
        [Variant.SUCCESS]: 'bg-success/10 text-success border-success/20',
        [Variant.WARNING]: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        [Variant.INFO]: 'bg-cyan-100 text-cyan-800 border-cyan-200',
        [Variant.LIGHT]: 'bg-gray-100 text-gray-800 border-gray-200',
        [Variant.DANGER]: 'bg-red-100 text-red-800 border-red-200',
    };

    const className = `rounded-md p-4 border ${variantStyles[variant]}`;

    return <Alert className={className}>
        <AlertDescription>
            {children}
        </AlertDescription>
    </Alert>;
};

export default CustomAlert;
