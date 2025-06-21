"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { RefreshCw, BarChart3 } from "lucide-react"

export default function InteractiveChart() {
  const [chartData, setChartData] = useState([
    { month: "Jan", sales: 1200, profit: 400 },
    { month: "Feb", sales: 1900, profit: 600 },
    { month: "Mar", sales: 1500, profit: 500 },
    { month: "Apr", sales: 2400, profit: 900 },
    { month: "May", sales: 2000, profit: 700 },
  ])

  const handleDataChange = (index: number, field: "sales" | "profit", value: string) => {
    const newValue = Number.parseInt(value) || 0
    const newData = [...chartData]
    newData[index] = { ...newData[index], [field]: newValue }
    setChartData(newData)
  }

  const resetData = () => {
    setChartData([
      { month: "Jan", sales: 1200, profit: 400 },
      { month: "Feb", sales: 1900, profit: 600 },
      { month: "Mar", sales: 1500, profit: 500 },
      { month: "Apr", sales: 2400, profit: 900 },
      { month: "May", sales: 2000, profit: 700 },
    ])
  }

  return (
    <Card className="border-2 border-gray-200 shadow-sm">
      <CardHeader className="border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-sm flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <CardTitle className="text-lg text-gray-800">Interactive Chart Demo</CardTitle>
          </div>
          <Button variant="outline" size="sm" onClick={resetData} className="flex items-center gap-1 text-xs">
            <RefreshCw className="w-3 h-3" /> Reset Data
          </Button>
        </div>
        <CardDescription>Edit the values below to see the chart update in real-time</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-b border-gray-200">
          <div className="p-4 border-r border-gray-200">
            <div className="mb-4">
              <div className="grid grid-cols-7 gap-1 mb-2 text-xs font-medium text-gray-600 bg-gray-100 p-2">
                <div className="col-span-1"></div>
                <div className="col-span-3 text-center">Sales</div>
                <div className="col-span-3 text-center">Profit</div>
              </div>

              {chartData.map((item, index) => (
                <div key={index} className="grid grid-cols-7 gap-1 mb-2 items-center">
                  <div className="col-span-1 text-sm font-medium text-gray-700 bg-gray-100 p-2 flex items-center justify-center h-10">
                    {item.month}
                  </div>
                  <div className="col-span-3 pr-1">
                    <Input
                      type="number"
                      value={item.sales}
                      onChange={(e) => handleDataChange(index, "sales", e.target.value)}
                      className="h-10 text-center border-gray-300 focus:border-green-500 focus:ring-green-500"
                      min="0"
                      max="5000"
                    />
                  </div>
                  <div className="col-span-3 pl-1">
                    <Input
                      type="number"
                      value={item.profit}
                      onChange={(e) => handleDataChange(index, "profit", e.target.value)}
                      className="h-10 text-center border-gray-300 focus:border-green-500 focus:ring-green-500"
                      min="0"
                      max="5000"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-white">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "4px",
                      boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="sales" name="Sales" fill="#16a34a" />
                  <Bar dataKey="profit" name="Profit" fill="#86efac" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 text-sm text-gray-600">
          <p>
            <span className="font-medium">AI Insight:</span> Based on your data, sales and profit show a strong
            correlation. Consider focusing marketing efforts in April, which shows the highest performance.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
