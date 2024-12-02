'use client'
import { useTheme } from "next-themes";
import React from "react";
import {
	BarChart,
	Bar,
	Cell,
	XAxis,
	YAxis,
	Tooltip,
	LabelList,
	ResponsiveContainer
} from "recharts";

const data = [
	{ name: "01/2020", uv: 2400, pv: 0 },
	{ name: "02/2020", uv: -400, pv: 2400 },
	{ name: "03/2020", uv: -400, pv: 2000 },
	{ name: "04/2020", uv: 800, pv: 1600 },
	{ name: "05/2020", uv: 900, pv: 2400 },
	{ name: "06/2020", uv: -500, pv: 3300 },
	{ name: "07/2020", uv: 900, pv: 2800 },
	{ name: "Total", uv: 3700, pv: 0 }
];

export default function Waterfall() {

  	const { theme } = useTheme();

	return (
		<ResponsiveContainer width="100%" height={300}>
			<BarChart
				data={data}
				margin={{
					top: 20,
					right: 30,
					left: 20,
					bottom: 5
				}}
			>
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<Bar dataKey="pv" stackId="a" fill="transparent" />
				<Bar dataKey="uv" stackId="a">
					{data.map((item, index) => {
						const fillColor = item.uv < 0
						? "#f66797"
						: item.name === "Total"
						? theme === "dark"
							? "#ffffff" // White fill in dark mode for Total
							: "#181559" // Different color for Total in light mode
						: theme === "dark"
						? "#ffffff" // White fill in dark mode for other bars
						: "#181559"; // Default fill color for other bars in light mode

						return <Cell key={index} fill={fillColor} />;
					})}
					<LabelList dataKey="uv" position="top" />
				</Bar>
			</BarChart>
		</ResponsiveContainer>
	);
}
