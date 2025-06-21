"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { BarChart3, Download, Copy, Filter } from "lucide-react"


const mockApp = {
  id: "app1",
  name: "Q4 Sales Performance",
  chartType: "bar",
  title: "Revenue by Product Category",
  data: [
    { category: "Electronics", revenue: 125000, quantity: 450 },
    { category: "Clothing", revenue: 89000, quantity: 320 },
    { category: "Home & Garden", revenue: 67000, quantity: 180 },
    { category: "Sports", revenue: 45000, quantity: 150 },
    { category: "Books", revenue: 23000, quantity: 90 },
  ],
  filters: [
    { name: "Category", type: "categorical", values: ["Electronics", "Clothing", "Home & Garden", "Sports", "Books"] },
    { name: "Revenue", type: "numeric", min: 0, max: 150000 },
    { name: "Quantity", type: "numeric", min: 0, max: 500 },
  ],
}

export default function SharedAppPage({ params }: { params: { id: string } }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [revenueRange, setRevenueRange] = useState<number[]>([0, 150000])
  const [quantityRange, setQuantityRange] = useState<number[]>([0, 500])
  const [searchTerm, setSearchTerm] = useState("")
  const [showSnapshotSuccess, setShowSnapshotSuccess] = useState(false)
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const handleSaveSnapshot = () => {
    
    const params = new URLSearchParams({
      category: selectedCategory,
      revenueMin: revenueRange[0].toString(),
      revenueMax: revenueRange[1].toString(),
      quantityMin: quantityRange[0].toString(),
      quantityMax: quantityRange[1].toString(),
      search: searchTerm,
    })

    const snapshotUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`
    navigator.clipboard.writeText(snapshotUrl)

    
    setShowSnapshotSuccess(true)
    setTimeout(() => setShowSnapshotSuccess(false), 3000)
  }

  const filteredData = mockApp.data.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    const matchesRevenue = item.revenue >= revenueRange[0] && item.revenue <= revenueRange[1]
    const matchesQuantity = item.quantity >= quantityRange[0] && item.quantity <= quantityRange[1]
    const matchesSearch = searchTerm === "" || item.category.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesCategory && matchesRevenue && matchesQuantity && matchesSearch
  })

  const FilterPanel = () => (
    <div className="space-y-4 sm:space-y-6">
      
      <div>
        <label className="text-sm font-medium mb-2 block">Search</label>
        <Input
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-9"
        />
      </div>

      
      <div>
        <label className="text-sm font-medium mb-2 block">Category</label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="h-9">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {mockApp.filters[0]?.values?.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      
      <div>
        <label className="text-sm font-medium mb-2 block">
          Revenue Range: ${revenueRange[0].toLocaleString()} - ${revenueRange[1].toLocaleString()}
        </label>
        <Slider
          value={revenueRange}
          onValueChange={setRevenueRange}
          max={150000}
          min={0}
          step={5000}
          className="mt-2"
        />
      </div>
      
      <div>
        <label className="text-sm font-medium mb-2 block">
          Quantity Range: {quantityRange[0]} - {quantityRange[1]}
        </label>
        <Slider value={quantityRange} onValueChange={setQuantityRange} max={500} min={0} step={10} className="mt-2" />
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          setSelectedCategory("all")
          setRevenueRange([0, 150000])
          setQuantityRange([0, 500])
          setSearchTerm("")
        }}
      >
        Reset All Filters
      </Button>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center space-x-2 min-w-0 flex-1">
            <BarChart3 className="h-5 sm:h-6 w-5 sm:w-6 text-primary flex-shrink-0" />
            <span className="text-lg sm:text-xl font-semibold truncate">Rechart</span>
            <Badge variant="outline" className="ml-2 text-xs">
              Public
            </Badge>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Sheet open={showMobileFilters} onOpenChange={setShowMobileFilters}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden">
                  <Filter className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[350px]">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterPanel />
                </div>
              </SheetContent>
            </Sheet>

            <Button
              variant="outline"
              size="sm"
              onClick={handleSaveSnapshot}
              className={`text-xs sm:text-sm ${showSnapshotSuccess ? "bg-primary text-primary-foreground" : ""}`}
            >
              <Copy className="h-3 sm:h-4 w-3 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">{showSnapshotSuccess ? "URL Copied!" : "Save Snapshot"}</span>
              <span className="sm:hidden">{showSnapshotSuccess ? "Copied!" : "Copy"}</span>
            </Button>
            <Button variant="outline" size="sm" className="text-xs sm:text-sm">
              <Download className="h-3 sm:h-4 w-3 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Export</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-4 sm:py-6">
        <div className="mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">{mockApp.name}</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Interactive data visualization • {filteredData.length} of {mockApp.data.length} items shown
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card className="hidden lg:block lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <FilterPanel />
            </CardContent>
          </Card>

          
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                <BarChart3 className="h-4 sm:h-5 w-4 sm:w-5 flex-shrink-0" />
                <span className="truncate">{mockApp.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 sm:h-80 lg:h-96 bg-muted rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                <div className="text-center">
                  <BarChart3 className="h-12 sm:h-16 w-12 sm:w-16 text-muted-foreground mx-auto mb-3 sm:mb-4" />
                  <p className="text-muted-foreground text-sm sm:text-base">Interactive Chart</p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                    Showing {filteredData.length} data points
                  </p>
                </div>
              </div>

              
              <div className="space-y-3 sm:space-y-4">
                <h3 className="font-semibold text-sm sm:text-base">Data Summary</h3>
                <div className="grid gap-3 sm:gap-4">
                  {filteredData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 sm:p-4 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm sm:text-base">{item.category}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">{item.quantity} units sold</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary text-sm sm:text-base">
                          ${item.revenue.toLocaleString()}
                        </p>
                        <p className="text-xs sm:text-sm text-muted-foreground">Revenue</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
