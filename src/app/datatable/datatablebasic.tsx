import * as React from "react"
import {ColumnDef} from "@tanstack/react-table"
import {DataPaginationTable} from "@/src/components/ui/datatable-pagination"

type User = {
	id: number
	name: string
	email: string
	status: string
	amount: number
}

type colType = {
	accessorKey?: string
	header?: string
}

const data: User[] = [
	{
		id: 1,
		name: "Alice Johnson",
		email: "alice@example.com",
		amount: 10,
		status: "Active",
	},
	{
		id: 2,
		name: "Bob Smith",
		email: "bob@example.com",
		amount: 10,
		status: "Inactive",
	},
	{
		id: 3,
		name: "Charlie Brown",
		email: "charlie@example.com",
		amount: 10,
		status: "Pending",
	},
	{
		id: 4,
		name: "Charlie Brown",
		email: "charlie@example.com",
		amount: 10,
		status: "Pending",
	},
	{
		id: 5,
		name: "Charlie Brown",
		email: "charlie@example.com",
		amount: 10,
		status: "Pending",
	},
	{
		id: 6,
		name: "Charlie Brown",
		email: "charlie@example.com",
		amount: 10,
		status: "Pending",
	},
	{
		id: 7,
		name: "Charlie Brown",
		email: "charlie@example.com",
		amount: 10,
		status: "Pending",
	},
	{
		id: 8,
		name: "Charlie Brown",
		email: "charlie@example.com",
		amount: 10,
		status: "Pending",
	},
	{
		id: 9,
		name: "Charlie Brown",
		email: "charlie@example.com",
		amount: 10,
		status: "Pending",
	},
	{
		id: 10,
		name: "Charlie Brown",
		email: "charlie@example.com",
		amount: 10,
		status: "Pending",
	},
	{
		id: 11,
		name: "Charlie Brown",
		email: "charlie@example.com",
		amount: 10,
		status: "Pending",
	},
	{
		id: 12,
		name: "Charlie Brown",
		email: "charlie@example.com",
		amount: 10,
		status: "Pending",
	},
]

const columns: ColumnDef<colType>[] = [
	{
		accessorKey: "id",
		header: "Id",
	},
	{
		accessorKey: "status",
		header: "Status",
	},
	{
		accessorKey: "email",
		header: "Email",
	},
	{
		accessorKey: "amount",
		header: "Amount",
	},
	{
		accessorKey: "name",
		header: "Name",
	},
]

export function UserTable() {
	return (
		<div className="p-4">
			<h2 className="text-lg font-semibold mb-4">User Data</h2>
			<DataPaginationTable
				columns={columns}
				data={data}
				className="w-full"
			/>
		</div>
	)
}
