interface BoxProps {
    children: React.ReactNode
}

export default function Box({ children }: BoxProps) {
    return (
        <div className="mx-auto p-4 my-4 h-[auto] w-[100%] max-w-[1200px] bg-gray-100 rounded-lg shadow-custom-light">
            {children}
        </div>
    )
}