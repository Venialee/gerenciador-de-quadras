import Link from "next/link";

export default function Footer() {
    return (
        <footer className="flex justify-center items-center h-[80px] p-8 bg-complementYellow shadow-md">
            <div className="flex items-center">
                <img src="/logomarca.svg" alt="Logo" className="h-10 mr-4" />
                <span className="text-center text-darkBlue text-lg font-bold">Todos os direitos reservados © 2025</span>
            </div>
        </footer>
    );
}