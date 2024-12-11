import { ColumnDef,  } from "@tanstack/react-table";

export interface ColDef{
    accessorKey: string;
    header: string;
  }
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useColumnDef<T>(columns:ColDef[]):ColumnDef<T>[]{
    const cols: ColumnDef<T>[]=new Array(columns.length);
    columns.forEach((item:ColDef):number=>cols.push(item));
    return cols;
}