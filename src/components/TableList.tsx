'use client'

import { TableProps } from "./Table";
import Table from "./Table";

interface TableListProps {
    tables: TableProps[];
}

export default function TableList({ tables }: TableListProps) {
    return (
        <>
            {tables.map((table, index) => {
                console.log("Objeto reserva dentro do TableList:", table);
                return <Table key={index} reserva={table.reserva} />;
            })}
        </>
    );
}
