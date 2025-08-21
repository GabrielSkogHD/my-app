import { PropsWithChildren } from "react";

type CardProps = PropsWithChildren<{
    className?: string;
}>;

export const Card = ({ children, className }: CardProps) => (
    <div className={`p-4 border rounded shadow-md ${className ?? ""}`}>{children}</div>
);

export const CardHeader = ({ children }: PropsWithChildren) => (
    <div className="font-bold text-lg">{children}</div>
);

export const CardTitle = ({ children }: PropsWithChildren) => (
    <div className="text-sm text-gray-500">{children}</div>
);


type CardContentProps = PropsWithChildren<{ className?: string }>;

export const CardContent = ({ children, className }: CardContentProps) => (
    <div className={`mt-2 ${className ?? ""}`}>{children}</div>
);
