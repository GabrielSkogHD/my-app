export const Card = ({ children }: any) => (
    <div className="p-4 border rounded shadow-md">{children}</div>
);

export const CardHeader = ({ children }: any) => (
    <div className="font-bold text-lg">{children}</div>
);

export const CardTitle = ({ children }: any) => (
    <div className="text-sm text-gray-500">{children}</div>
);

export const CardContent = ({ children }: any) => (
    <div className="mt-2">{children}</div>
);
