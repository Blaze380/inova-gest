"use client"
import LabeledTitle from "@/components/LabeledTitle";
import { ReactElement } from "react";
import DataTable from "@/components/DataTable";
import { columns, add } from "./ultils";

export default function Addresses (): ReactElement {
  return (
    <div className="h-full  flex flex-col ">
      <LabeledTitle className="pl-6 pt-4 text-xl " title="Endereços" />
      <div className="flex flex-col w-full border-violet border ">
        <div className="flex items-center justify-around">

        </div>
        <div className=" whitespace-nowrap  ">
          <DataTable columns={columns} data={add} />
        </div>
      </div>
    </div>
  )
}


