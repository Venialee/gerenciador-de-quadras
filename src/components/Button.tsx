interface ButtonProps {
    content: string
    variation?: 'green' | 'red'
    onClick?: () => void
}

export default function Button({ content, variation = "green", onClick }: ButtonProps) {
    return (
        <button
            className={`py-2 px-4 rounded-lg text-white ${variation === "red" ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
            onClick={onClick}>
            {content}
        </button>
    )
}