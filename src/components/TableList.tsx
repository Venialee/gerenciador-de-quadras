'use client'

import { TableProps } from "./Table";
import Table from "./Table";

interface TableListProps {
    tables: TableProps[];
    displayEditButton?: boolean;
}

export default function TableList({ tables, displayEditButton = false }: TableListProps) {
    return (
        <>
            {tables.map((table, index) => {
                return <Table displayEditButton={displayEditButton} key={index} reserva={table.reserva} />;
            })}
        </>
    );
}
