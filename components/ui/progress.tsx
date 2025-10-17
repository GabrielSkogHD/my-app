interface ProgressProps {
    value: number;
    className?: string; // Make className optional
}

export const Progress = ({ value, className }: ProgressProps) => (
    <div className={`w-full bg-gray-200 rounded-full h-2.5 ${className}`}>
        <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${value}%` }}
        ></div>
    </div>
);
