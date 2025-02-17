interface ButtonProps {
    content: string
    variation?: 'green' | 'red'
    onClick?: () => void
}

export default function Button({ content, variation = "green", onClick }: ButtonProps) {
    return (
        <button
            className={`p-[0.4rem] rounded-lg text-white ${variation === "red" ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
            onClick={onClick}>
            {content}
        </button>
    )
}