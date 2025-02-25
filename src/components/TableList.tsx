'use client'

import { TableProps } from "./Table";
import Table from "./Table";

interface TableListProps {
    tables: TableProps[];
}

export default function TableList({ tables }: TableListProps) {
    return (
        <>
            {tables.map((table: TableProps, index: number) => (
                <Table key={index} reserva={table.reserva} />
            ))}
        </>
    );
}
