"use client"

import { useState } from "react"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { FileSpreadsheet, Plus, MoreHorizontal, BarChart3, ExternalLink, Copy, Trash2, Settings } from "lucide-react"
import Link from "next/link"
import { mockDataSources } from "@/components/MockDara/mockDataSources"
import { mockGraphApps } from "@/components/MockDara/mockGraphApps"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"data" | "apps">("data")

  const handleDeleteDataSource = (id: string) => {
    
    console.log("Delete data source:", id)
  }

  const handleDeleteApp = (id: string) => {
    
    console.log("Delete app:", id)
  }

  const handleCopyUrl = (id: string) => {
    
    const url = `${window.location.origin}/app/${id}`
    navigator.clipboard.writeText(url)
    console.log("Copied URL:", url)
  }

  return (
    <div className="min-h-screen bg-background">
      <MobileNav />

      <div className="container py-4 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Manage your data sources and chart applications
            </p>
          </div>
          <Button asChild className="sm:hidden">
            <Link href="/create">Create App</Link>
          </Button>
        </div>

        
        <div className="flex space-x-1 mb-6 sm:mb-8 bg-muted p-1 rounded-lg w-full sm:w-fit">
          <Button
            variant={activeTab === "data" ? "default" : "ghost"}
            onClick={() => setActiveTab("data")}
            className="flex-1 sm:flex-none sm:px-6"
            size="sm"
          >
            Data Sources
          </Button>
          <Button
            variant={activeTab === "apps" ? "default" : "ghost"}
            onClick={() => setActiveTab("apps")}
            className="flex-1 sm:flex-none sm:px-6"
            size="sm"
          >
            Graph Apps
          </Button>
        </div>

        
        {activeTab === "data" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            
            <Card className="border-dashed border-2 hover:border-primary/50 transition-colors cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center py-8 sm:py-12">
                <Plus className="h-10 sm:h-12 w-10 sm:w-12 text-muted-foreground mb-3 sm:mb-4" />
                <h3 className="font-semibold mb-2 text-center">Upload New CSV</h3>
                <p className="text-xs sm:text-sm text-muted-foreground text-center px-2">
                  Drag and drop your CSV file or click to browse
                </p>
              </CardContent>
            </Card>

            
            {mockDataSources.map((dataSource) => (
              <Card key={dataSource.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2 min-w-0 flex-1">
                      <FileSpreadsheet className="h-4 sm:h-5 w-4 sm:w-5 text-primary flex-shrink-0" />
                      <CardTitle className="text-base sm:text-lg truncate">{dataSource.name}</CardTitle>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Settings className="h-4 w-4 mr-2" />
                          Manage
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleDeleteDataSource(dataSource.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription className="text-xs sm:text-sm">
                    Uploaded on {new Date(dataSource.uploadDate).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-xs sm:text-sm text-muted-foreground mb-4">
                    <span>{dataSource.rows.toLocaleString()} rows</span>
                    <span>{dataSource.columns} columns</span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs sm:text-sm font-medium">Schema Preview:</p>
                    <div className="flex flex-wrap gap-1">
                      {dataSource.schema.slice(0, 3).map((column) => (
                        <Badge key={column} variant="secondary" className="text-xs">
                          {column}
                        </Badge>
                      ))}
                      {dataSource.schema.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{dataSource.schema.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        
        {activeTab === "apps" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {mockGraphApps.map((app) => (
              <Card key={app.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2 min-w-0 flex-1">
                      <BarChart3 className="h-4 sm:h-5 w-4 sm:w-5 text-primary flex-shrink-0" />
                      <CardTitle className="text-base sm:text-lg truncate">{app.name}</CardTitle>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/create?app=${app.id}`}>
                            <Settings className="h-4 w-4 mr-2" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleCopyUrl(app.id)}>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy URL
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteApp(app.id)}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription className="text-xs sm:text-sm">
                    Last edited {new Date(app.lastEdited).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-muted-foreground">Data Source:</span>
                      <span className="font-medium text-right truncate ml-2">{app.dataSource}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-muted-foreground">Chart Type:</span>
                      <Badge variant="outline" className="text-xs">
                        {app.chartType}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge variant={app.isPublic ? "default" : "secondary"} className="text-xs">
                        {app.isPublic ? "Public" : "Private"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-4">
                    <Button asChild size="sm" className="flex-1">
                      <Link href={`/create?app=${app.id}`}>Open</Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild className="sm:w-auto">
                      <Link href={`/app/${app.id}`}>
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
