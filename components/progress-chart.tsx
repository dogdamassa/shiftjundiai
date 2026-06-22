"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { progress } from "@/lib/demo-data";

export function ProgressChart() {
  return (
    <div className="chart-wrap" aria-label="Gráfico de evolução">
      <ResponsiveContainer
        width="100%"
        height="100%"
        initialDimension={{ width: 500, height: 255 }}
      >
        <AreaChart data={progress} margin={{ left: -22, right: 5, top: 10 }}>
          <defs>
            <linearGradient id="shiftGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff6a00" stopOpacity={0.38} />
              <stop offset="95%" stopColor="#ff6a00" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#2a2e31" vertical={false} />
          <XAxis dataKey="month" stroke="#777d82" fontSize={11} tickLine={false} />
          <YAxis stroke="#777d82" fontSize={11} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              background: "#171a1c",
              border: "1px solid #34383b",
              borderRadius: 0,
            }}
          />
          <Area
            dataKey="strength"
            name="Índice de força"
            type="monotone"
            stroke="#ff6a00"
            strokeWidth={3}
            fill="url(#shiftGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
