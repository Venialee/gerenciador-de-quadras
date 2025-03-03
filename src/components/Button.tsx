interface ButtonProps {
    content: string;
    variation?: 'backgroundYellow' | 'lightOrange' | 'lightBlue';
    onClick?: () => void;
}

export default function Button({ content, variation = "backgroundYellow", onClick }: ButtonProps) {
    return (
        <button
            className={`my-4 py-2 h-12 px-8 rounded-lg text-2xl text-darkBlue font-bold ${
                variation === "lightOrange" ? "bg-lightOrange hover:bg-darkOrange" :
                variation === "lightBlue" ? "bg-lightBlue hover:bg-middleBlue" :	
                "bg-backgroundYellow hover:bg-complementYellow"
            }`}
            onClick={onClick}>
            {content}
        </button>
    );
}