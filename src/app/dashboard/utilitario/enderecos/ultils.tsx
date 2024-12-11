import { Address } from "@/types/entities";
import {
    ColumnDef,
} from "@tanstack/react-table"
import { getActionsColumns, getSelectionCheckbox,  TableColumnSort } from "@/components/DataTable";

export const add: Address[] = [
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
    },
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
    },
];

/**
 * getColumnProperties<Address>("id", "Id"),
    getColumnProperties<Address>("cityId", "Cidade"),
    getColumnProperties<Address>("neighborhoodId", "Bairro"),
    getColumnProperties<Address>("postalCodeId", "Código postal"),
    getColumnProperties<Address>("propertyNumber", "Número do imóvel"),
    getColumnProperties<Address>("streetId", "Rua"),
    getColumnProperties<Address>("provinceId", "Província"),
 */
export const columns: ColumnDef<Address>[] = [
    getSelectionCheckbox<Address>(),

    {
        id: "id",
        accessorKey: "id",
        header: ({ column }) => <TableColumnSort
            column={column}
            columnName="Id"
        />,
    },
    {
        id: "Cidade",
        accessorKey: "cityId",
        header: ({ column }) => <TableColumnSort
            column={column}
            columnName="Cidade"
        />,
    },
    {
        id: "Bairro",
        accessorKey: "neighborhoodId",
        header: ({ column }) => <TableColumnSort
            column={column}
            columnName="Bairro"
        />,
    },
    {
        id: "Código postal",
        accessorKey: "postalCodeId",
        header: ({ column }) => <TableColumnSort
            column={column}
            columnName="Código postal"
        />,
    },
    {
        id: "Número do imóvel",
        accessorKey: "propertyNumber",
        header: ({ column }) => <TableColumnSort
            column={column}
            columnName="Número do imóvel"
        />,
    },
    {
        id: "Rua",
        accessorKey: "streetId",
        header: ({ column }) => <TableColumnSort
            column={column}
            columnName="Rua"
        />,
    },
    {
        id: "Província",
        accessorKey: "provinceId",
        header: ({ column }) => <TableColumnSort
            column={column}
            columnName="Província"
        />,
    },
    getActionsColumns<Address>()

]