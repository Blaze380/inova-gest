"use client"

import {
    Column,
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    VisibilityState,
    SortingState,
    useReactTable,
    HeaderContext,
    CellContext,
} from "@tanstack/react-table"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ChangeEvent, Context, createContext, Dispatch, InputHTMLAttributes, MutableRefObject, ReactElement, SetStateAction, useContext, useRef, useState } from "react"
import { Button } from "./ui/button"
import { ArrowUpDown, ChevronDown, ChevronsUpDown, Filter, MoreHorizontal } from "lucide-react";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "./ui/label";
interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

const CurrentTableContext: Context<[string, Dispatch<SetStateAction<string>>]> = createContext<[string, Dispatch<SetStateAction<string>>]>(["string", (): void => { }]);

export default function DataTable<TData, TValue> ({
    columns,
    data,
}: DataTableProps<TData, TValue>): ReactElement {
    const [sorting, setSorting] = useState<SortingState>([]);
    const searchRef: MutableRefObject<HTMLInputElement | null> = useRef<HTMLInputElement | null>(null);
    const [currentTable, setCurrentTable] = useState<string>("addressesd");
    /** */
    const [columnVisibility, setColumnVisibility] =
        useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})
    const [filterRow, setFilterRow] = useState<string>("");
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const table: import("@tanstack/table-core").Table<TData> = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        }
    })
    return (
        <CurrentTableContext.Provider value={[currentTable, setCurrentTable]}>
            <div className="p-0 border border-green-600 flex flex-col justify-center items-center">
                <div className="w-[95%] flex items-center py-4  justify-between ">
                    <div className="flex justify-between items-center pl-3 w-[40%]">
                        <FilterInput
                            filterRow={filterRow}
                            searchRef={searchRef}
                            setFilterRow={setFilterRow}
                            table={table}
                        />
                        <CurrentTableCombobox />
                    </div>
                    <div className=" flex justify-between items-center w-[20%] ">
                        <VisibleRows table={table} />
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="h-7 text-sm ml-auto">Novo</Button>
                            </DialogTrigger>
                            <DataDialog data={[
                                [
                                    { inputType: "text", name: "Email", defaultValue: "user@example.com" },
                                    { inputType: "password", name: "Password" },
                                ],
                                [
                                    { inputType: "radio", name: "Gender", defaultValue: "male" },
                                    { inputType: "color", name: "Favorite Color", defaultValue: "#ff0000" },
                                ],
                                [
                                    { inputType: "date", name: "Birthdate", defaultValue: "2000-01-01" },
                                    { inputType: "file", name: "Upload Document" },
                                ],
                            ]} />
                        </Dialog>
                    </div>
                </div>
                <ScrollArea className="rounded-md  w-[95%] ">
                    <Table className="w-full ">
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
                                        Sem resultados.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
                <Pagination table={table} />
            </div>
        </CurrentTableContext.Provider>
    );
}
function VisibleRows<TData> ({ table }: { table: import("@tanstack/table-core").Table<TData> }): ReactElement {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild >
                <Button variant="outline" className="mr-auto h-7 text-sm">
                    Colunas
                    <ChevronDown />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {table
                    .getAllColumns()
                    .filter(
                        (column) => {
                            if (column.id === "actions") return false;
                            return column.getCanHide();
                        }
                    )
                    .map((column) => {
                        return (
                            <DropdownMenuCheckboxItem
                                key={column.id}
                                className="capitalize"
                                checked={column.getIsVisible()}
                                onCheckedChange={(value) =>
                                    column.toggleVisibility(!!value)
                                }
                            >
                                {column.id}
                            </DropdownMenuCheckboxItem>
                        )
                    })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function CurrentTableCombobox (): ReactElement {
    const tables: string[] = ["addresses", "streets", "cities", "postal_codes", "provinces"];
    const [currentTable, setCurrentTable] = useContext(CurrentTableContext)
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild >
                <Button variant="outline" className={`w-[${ 80 + currentTable.length }px]  py-3 px-4 h-7 text-sm`}>
                    <span className="text-smooth-fg dark:text-smooth-fg-dark font-bold">Tabelas: </span>{currentTable}
                    <div className="w-[10%]">
                        <ChevronsUpDown />
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {tables.map((table: string): ReactElement => (
                    <DropdownMenuCheckboxItem
                        key={table}
                        className="capitalize"
                        checked={table === currentTable}
                        onCheckedChange={(a) => setCurrentTable(table)}>
                        {table}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

function FilterInput<TData> ({ searchRef, filterRow, setFilterRow, table }: { table: import("@tanstack/table-core").Table<TData>, searchRef: MutableRefObject<HTMLInputElement | null>, filterRow: string, setFilterRow: Dispatch<SetStateAction<string>> }): ReactElement {
    return (
        <div className="flex items-center justify-between space-x-3">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-auto h-7 text-sm">
                        <Filter />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {table
                        .getAllColumns()
                        .filter(
                            (column): boolean => {
                                if (column.id === "select" || column.id === "actions") return false;
                                return column.getIsVisible();
                            }
                        )
                        .map((column): ReactElement => {
                            return (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.id === filterRow}
                                    onClick={() => {
                                        table.getColumn(filterRow)?.setFilterValue("");
                                        setFilterRow(column.id)
                                    }}
                                >
                                    {column.id}
                                </DropdownMenuCheckboxItem>
                            )
                        })}
                </DropdownMenuContent>
            </DropdownMenu>
            <Input
                ref={searchRef}
                placeholder="Filtrar por"
                value={(table.getColumn(filterRow)?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                    table.getColumn(filterRow)?.setFilterValue(event.target.value)
                }
                className="max-w-sm h-7 text-sm py-4"
            />
        </div>
    );
}
interface DataDialogProps {
    isEdit?: boolean;
    data: [InputDialog, InputDialog][];
}

interface InputDialog {
    name: string;
    inputType: InputHTMLAttributes<HTMLInputElement>["type"] | "select";
    defaultValue?: any;
}
function DataDialog ({ isEdit, data }: DataDialogProps): ReactElement {
    const [currentTable] = useContext(CurrentTableContext);
    const title: string = isEdit ? "Editar " : "Criar Novo " + currentTable;
    const [formData, setFormData] = useState<string[][]>(
        data.map(row => row.map(input => {
            if (!isEdit) return "";
            return input.defaultValue ?? "";
        }))
    );

    // Função para atualizar o valor do input
    function handleChange (i: number, j: number, value: any): void {
        const updatedData = [...formData];
        updatedData[i][j] = value;
        setFormData(updatedData);
    };

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>
                    ...
                </DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-96 flex flex-col m-0  p-4">
                {data.map((row: InputDialog[], i: number): ReactElement => (
                    <div className="flex justify-between my-4 w-full">
                        {
                            row.map((input: InputDialog, j: number): ReactElement => (
                                <div className="flex  flex-col items-start space-y-2 w-[47%]">
                                    <Label htmlFor="name" className="text-right">
                                        {input.name}
                                    </Label>
                                    <Input
                                        id={input.name}
                                        type={input.inputType}
                                        value={formData[i][j]}
                                        onChange={(e: ChangeEvent<HTMLInputElement>): void => handleChange(i, j, e.target.value)}
                                        className="h-8 w-full"
                                    />
                                </div>
                            ))
                        }
                    </div>
                ))}
            </ScrollArea>
            <DialogFooter>
                <Button className="h-8" variant="secondary" >Cancelar</Button>
                <Button className="h-8">Salvar</Button>
            </DialogFooter>
        </DialogContent>
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Pagination (table: any): ReactElement {
    return (
        <div className="flex items-center justify-end space-x-2 py-4">
            <Button
                variant="outline"
                className="h-7 text-sm"
                onClick={() => table.previousPage?.()}
                disabled={!table.getCanPreviousPage?.()}
            >
                Anterior
            </Button>
            <Button
                variant="outline"
                className="h-7 text-sm"
                onClick={() => table.nextPage?.()}
                disabled={!table.getCanNextPage?.()}
            >
                Próximo
            </Button>
        </div>
    );
}

interface TableActionsProps {
    rowId: string;
}

export function TableActions (props: TableActionsProps): ReactElement {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild >
                <Button variant="ghost" className="h-8 w-8 p-0" >
                    <span className="sr-only" > Open menu </span>
                    < MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            < DropdownMenuContent align="end" >
                <DropdownMenuLabel>Actions </DropdownMenuLabel>
                < DropdownMenuItem
                    onClick={() => navigator.clipboard.writeText(props.rowId)}
                >
                    Copiar ID
                </DropdownMenuItem >
                < DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="ghost" className="block py-1.5 w-full h-full text-start">Editar</Button>
                        </DialogTrigger>
                        {/* <DataDialog data={["addresses", "streets", "cities", "postal_codes", "provinces", "addresses", "streets", "cities", "postal_codes", "provinces", "addresses", "streets", "cities", "postal_codes", "provinces"]} /> */}
                    </Dialog>
                </DropdownMenuItem>
                < DropdownMenuItem asChild>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="ghost" className="block py-1.5 w-full h-full text-start">Eliminar</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Deseja eliminar o registro?</DialogTitle>
                                <DialogDescription>
                                    ...
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancelar</Button>
                                </DialogClose>
                                <DialogClose asChild>
                                    <Button variant="destructive" onClick={() => console.log("Astro remix")}>Eliminar</Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

interface TableColumnSortProps<T> {
    columnName: string;
    column: Column<T, unknown>;
}
export function TableColumnSort<T> ({ column, columnName }: TableColumnSortProps<T>): ReactElement {
    return (
        <Button
            variant="ghost"
            onClick={(): void => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            {columnName}
            {/* {column.getIsSorted() == "asc" && <MoveUp className="ml-2 h-4 w-4" />}
            {column.getIsSorted() == "desc" && <MoveDown className="ml-2 h-4 w-4" />} */}
            < ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
    )
}

interface ReturnTypeS<T> {
    header: ({ table }: HeaderContext<T, unknown>) => ReactElement;
    cell: ({ row }: CellContext<T, unknown>) => ReactElement;
    enableSorting: boolean;
    enableHiding: boolean,
}
export function getSelectionCheckbox<T> (): ColumnDef<T> {
    const selectionCheckbox: ColumnDef<T> = {
        id: "select",
        header: ({ table }: HeaderContext<T, unknown>): ReactElement => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value): void => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Selecionar tudo"
            />
        ),
        cell: ({ row }: CellContext<T, unknown>): ReactElement => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value): void => row.toggleSelected(!!value)}
                aria-label="Selecionar linha"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    }
    return selectionCheckbox;
}

export function getActionsColumns<T> (): ColumnDef<T> {
    return {
        id: "actions",
        cell: ({ row }): ReactElement => {
            const anyRow: any = row as any
            return <TableActions rowId={anyRow.original.id!} />;
        },
    } as ColumnDef<T>;
}
export function getColumnProperties<T> (accessorKey: string, columnName: string): ColumnDef<T> {
    return {
        id: columnName,
        acessorKey: accessorKey,
        header: ({ column }) => <TableColumnSort
            column={column}
            columnName={columnName}
        />,
    } as ColumnDef<T>;
}