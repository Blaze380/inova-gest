"use client"
import LabeledTitle from "@/components/LabeledTitle";
import { Address } from "@/types/entities";
import { ReactElement } from "react";
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const add: Address[] = [
    {
        cityId: "asds",
        createdAt: new Date("2024-12-12"),
        id: "sadss-dfdfdgfdgfd-fdgfd",
        neighborhoodId: "sdssfs",
        provinceId: "sdsfdd-dg-dgfdgfd-dfg",
        deletedAt: new Date("2024-12-12"),
        modifiedAt: new Date("2024-12-12"),
        postalCodeId: "dsfdsfdf-sdfsdfsdfsf-sdfsdf",
        propertyNumber: "123",
        streetId: "sdasadad-asdsadsa-dad"
    },
    {
        cityId: "city2",
        createdAt: new Date("2023-11-11"),
        id: "id2",
        neighborhoodId: "neighborhood2",
        provinceId: "province2",
        deletedAt: new Date("2023-11-11"),
        modifiedAt: new Date("2023-11-11"),
        postalCodeId: "postal2",
        propertyNumber: "456",
        streetId: "street2"
    },
    {
        cityId: "city3",
        createdAt: new Date("2022-10-10"),
        id: "id3",
        neighborhoodId: "neighborhood3",
        provinceId: "province3",
        deletedAt: new Date("2022-10-10"),
        modifiedAt: new Date("2022-10-10"),
        postalCodeId: "postal3",
        propertyNumber: "789",
        streetId: "street3"
    },
    {
        cityId: "city4",
        createdAt: new Date("2021-09-09"),
        id: "id4",
        neighborhoodId: "neighborhood4",
        provinceId: "province4",
        deletedAt: new Date("2021-09-09"),
        modifiedAt: new Date("2021-09-09"),
        postalCodeId: "postal4",
        propertyNumber: "101",
        streetId: "street4"
    },
    {
        cityId: "city5",
        createdAt: new Date("2020-08-08"),
        id: "id5",
        neighborhoodId: "neighborhood5",
        provinceId: "province5",
        deletedAt: new Date("2020-08-08"),
        modifiedAt: new Date("2020-08-08"),
        postalCodeId: "postal5",
        propertyNumber: "112",
        streetId: "street5"
    },
    {
        cityId: "city6",
        createdAt: new Date("2019-07-07"),
        id: "id6",
        neighborhoodId: "neighborhood6",
        provinceId: "province6",
        deletedAt: new Date("2019-07-07"),
        modifiedAt: new Date("2019-07-07"),
        postalCodeId: "postal6",
        propertyNumber: "131",
        streetId: "street6"
    }
];
 const columns: ColumnDef<Address>[] = [
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "cityId",
        header: "City",
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
    },
    {
        accessorKey: "deletedAt",
        header: "Deleted At",
    },
    {
        accessorKey: "modifiedAt",
        header: "Modified At",
    },
    {
        accessorKey: "neighborhoodId",
        header: "Neighborhood",
    },
    {
        accessorKey: "postalCodeId",
        header: "Postal Code",
    },
    {
        accessorKey: "propertyNumber",
        header: "Property Number",
    },
    {
        accessorKey: "streetId",
        header: "Street",
    },
    {
        accessorKey: "provinceId",
        header: "Province",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const payment = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(payment.id)}
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },

]
export default function Addresses (): ReactElement {
    return (
        <div className="w-full h-full border border-white flex flex-col">
            <LabeledTitle className="ml-6 mt-4 text-xl" title="Endereços" />
            <div className="flex flex-col w-full">
                <div className="flex items-center justify-around">

                </div>
                <div>
                    <DataTable columns={columns} data={add} />
                </div>
            </div>
        </div>
    )
}





interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

 function DataTable<TData, TValue> ({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    return (
        <div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}