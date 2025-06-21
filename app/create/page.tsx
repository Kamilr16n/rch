"use client"

import { useState, useRef } from "react"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Send, Upload, Save, BarChart3, LineChart, PieChart, Bot, User, MessageCircle } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

// Mock data
const mockDataSources = [
  { id: "1", name: "Sales_Data_2024.csv" },
  { id: "2", name: "Customer_Analytics.csv" },
  { id: "3", name: "Marketing_Campaign.csv" },
]

const mockFields = [
  { name: "Date", type: "date" },
  { name: "Product", type: "categorical" },
  { name: "Revenue", type: "numeric" },
  { name: "Quantity", type: "numeric" },
  { name: "Region", type: "categorical" },
  { name: "Salesperson", type: "categorical" },
  { name: "Category", type: "categorical" },
  { name: "Profit", type: "numeric" },
]

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
}

interface ChartConfig {
  type: "bar" | "line" | "pie"
  title: string
  xAxis?: string
  yAxis?: string
  data: any[]
}

export default function CreateAppPage() {
  const [step, setStep] = useState<"select-data" | "chat" | "save">("select-data")
  const [selectedDataSource, setSelectedDataSource] = useState<string>("")
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [currentChart, setCurrentChart] = useState<ChartConfig | null>(null)
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [showFilterDialog, setShowFilterDialog] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [appName, setAppName] = useState("")
  const [showMobileChat, setShowMobileChat] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleDataSourceSelect = (dataSourceId: string) => {
    setSelectedDataSource(dataSourceId)
    setStep("chat")

    // Add welcome message
    const welcomeMessage: Message = {
      id: "welcome",
      type: "ai",
      content: "Hi! I'm ready to help you create a chart from your data. What would you like to visualize?",
      timestamp: new Date(),
    }
    setMessages([welcomeMessage])
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)
    setShowMobileChat(false) 

    
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: "I'll create a bar chart showing revenue by product category. Let me generate that for you.",
        timestamp: new Date(),
      }

      
      const mockChart: ChartConfig = {
        type: "bar",
        title: "Revenue by Product Category",
        xAxis: "Category",
        yAxis: "Revenue",
        data: [
          { category: "Electronics", revenue: 125000 },
          { category: "Clothing", revenue: 89000 },
          { category: "Home & Garden", revenue: 67000 },
          { category: "Sports", revenue: 45000 },
          { category: "Books", revenue: 23000 },
        ],
      }

      setMessages((prev) => [...prev, aiResponse])
      setCurrentChart(mockChart)
      setIsLoading(false)
      scrollToBottom()
    }, 1500)
  }

  const handleSaveFrame = () => {
    setShowSaveDialog(true)
  }

  const handleSaveApp = () => {
    setShowSaveDialog(false)
    setShowFilterDialog(true)
  }

  const handleFilterToggle = (fieldName: string) => {
    setSelectedFilters((prev) =>
      prev.includes(fieldName) ? prev.filter((f) => f !== fieldName) : [...prev, fieldName],
    )
  }

  const handleFinishApp = () => {
    
    console.log("Saving app:", { appName, selectedFilters, currentChart })
    setShowFilterDialog(false)
    
  }

  const renderChart = () => {
    if (!currentChart) return null

    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-sm sm:text-base">
            {currentChart.type === "bar" && <BarChart3 className="h-4 sm:h-5 w-4 sm:w-5" />}
            {currentChart.type === "line" && <LineChart className="h-4 sm:h-5 w-4 sm:w-5" />}
            {currentChart.type === "pie" && <PieChart className="h-4 sm:h-5 w-4 sm:w-5" />}
            <span className="truncate">{currentChart.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48 sm:h-64 bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-12 sm:h-16 w-12 sm:w-16 text-muted-foreground mx-auto mb-3 sm:mb-4" />
              <p className="text-muted-foreground text-sm sm:text-base">Interactive Chart Preview</p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2">{currentChart.data.length} data points</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const ChatPanel = () => (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="text-base sm:text-lg">AI Assistant</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 pr-2 sm:pr-4">
          <div className="space-y-3 sm:space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`flex items-start space-x-2 max-w-[85%] sm:max-w-[80%] ${
                    message.type === "user" ? "flex-row-reverse space-x-reverse" : ""
                  }`}
                >
                  <div
                    className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    {message.type === "user" ? (
                      <User className="h-3 sm:h-4 w-3 sm:w-4" />
                    ) : (
                      <Bot className="h-3 sm:h-4 w-3 sm:w-4" />
                    )}
                  </div>
                  <div
                    className={`rounded-lg px-3 sm:px-4 py-2 ${
                      message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <p className="text-xs sm:text-sm">{message.content}</p>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-muted flex items-center justify-center">
                    <Bot className="h-3 sm:h-4 w-3 sm:w-4" />
                  </div>
                  <div className="bg-muted rounded-lg px-3 sm:px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div ref={messagesEndRef} />
        </ScrollArea>

        <div className="flex space-x-2 mt-3 sm:mt-4">
          <Input
            placeholder="Describe the chart you want to create..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            disabled={isLoading}
            className="text-sm"
          />
          <Button onClick={handleSendMessage} disabled={isLoading} size="sm">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  if (step === "select-data") {
    return (
      <div className="min-h-screen bg-background">
        <MobileNav />
        <div className="container py-4 sm:py-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Create New App</h1>
              <p className="text-muted-foreground text-sm sm:text-base px-4">
                Select a data source or upload a new CSV file to get started
              </p>
            </div>

            <div className="grid gap-4">
              
              <Card className="border-dashed border-2 hover:border-primary/50 transition-colors cursor-pointer">
                <CardContent className="flex items-center justify-center py-6 sm:py-8">
                  <div className="text-center">
                    <Upload className="h-10 sm:h-12 w-10 sm:w-12 text-muted-foreground mx-auto mb-3 sm:mb-4" />
                    <h3 className="font-semibold mb-2 text-sm sm:text-base">Upload New CSV</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground px-2">
                      Drag and drop your CSV file or click to browse
                    </p>
                  </div>
                </CardContent>
              </Card>

              
              <div className="space-y-4">
                <h3 className="font-semibold text-sm sm:text-base">Or select from existing data sources:</h3>
                {mockDataSources.map((dataSource) => (
                  <Card
                    key={dataSource.id}
                    className="hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleDataSourceSelect(dataSource.id)}
                  >
                    <CardContent className="flex items-center justify-between py-3 sm:py-4">
                      <div className="flex items-center space-x-3 min-w-0 flex-1">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <BarChart3 className="h-4 sm:h-5 w-4 sm:w-5 text-primary" />
                        </div>
                        <span className="font-medium text-sm sm:text-base truncate">{dataSource.name}</span>
                      </div>
                      <Button variant="outline" size="sm">
                        Select
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <MobileNav />

      <div className="container py-2 sm:py-4">
        
        <div className="lg:hidden">
          <div className="space-y-4">
            
            <div className="relative">
              {renderChart()}
              {currentChart && (
                <div className="flex justify-between items-center mt-4">
                  <Sheet open={showMobileChat} onOpenChange={setShowMobileChat}>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Chat with AI
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="h-[80vh]">
                      <SheetHeader>
                        <SheetTitle>AI Assistant</SheetTitle>
                      </SheetHeader>
                      <div className="mt-4 h-full">
                        <ChatPanel />
                      </div>
                    </SheetContent>
                  </Sheet>
                  <Button size="sm" onClick={handleSaveFrame}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Frame
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        
        <div className="hidden lg:grid lg:grid-cols-2 gap-6 h-[calc(100vh-8rem)]">
          
          <ChatPanel />

          
          <div className="relative">
            {renderChart()}
            {currentChart && (
              <Button className="absolute bottom-4 right-4" onClick={handleSaveFrame}>
                <Save className="h-4 w-4 mr-2" />
                Save Frame
              </Button>
            )}
          </div>
        </div>
      </div>

      
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent className="mx-4 sm:mx-0">
          <DialogHeader>
            <DialogTitle>Save Your App</DialogTitle>
            <DialogDescription>Give your chart app a name to save it to your dashboard.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input placeholder="Enter app name..." value={appName} onChange={(e) => setAppName(e.target.value)} />
          </div>
          <DialogFooter className="flex-col sm:flex-row space-y-2 sm:space-y-0">
            <Button variant="outline" onClick={() => setShowSaveDialog(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button onClick={handleSaveApp} disabled={!appName.trim()} className="w-full sm:w-auto">
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      
      <Dialog open={showFilterDialog} onOpenChange={setShowFilterDialog}>
        <DialogContent className="mx-4 sm:mx-0 max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Configure Filters</DialogTitle>
            <DialogDescription>
              Select which fields should be available as filters in your shared app.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <div className="space-y-4">
              <h4 className="font-medium">Available Fields:</h4>
              <div className="space-y-3">
                {mockFields.map((field) => (
                  <div key={field.name} className="flex items-center space-x-2">
                    <Checkbox
                      id={field.name}
                      checked={selectedFilters.includes(field.name)}
                      onCheckedChange={() => handleFilterToggle(field.name)}
                    />
                    <label htmlFor={field.name} className="flex-1 flex items-center justify-between">
                      <span className="text-sm">{field.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {field.type}
                      </Badge>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            
            <div className="space-y-4">
              <h4 className="font-medium">Filter Preview:</h4>
              <div className="border rounded-lg p-4 bg-muted/50 min-h-[200px]">
                {selectedFilters.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Select fields to see filter preview</p>
                ) : (
                  <div className="space-y-3">
                    {selectedFilters.map((fieldName) => {
                      const field = mockFields.find((f) => f.name === fieldName)
                      if (!field) return null

                      return (
                        <div key={fieldName} className="space-y-1">
                          <label className="text-sm font-medium">{field.name}</label>
                          {field.type === "categorical" && (
                            <Select disabled>
                              <SelectTrigger className="h-8">
                                <SelectValue placeholder={`Select ${field.name}`} />
                              </SelectTrigger>
                            </Select>
                          )}
                          {field.type === "numeric" && <Slider disabled className="mt-2" />}
                          {field.type === "text" && (
                            <Input placeholder={`Search ${field.name}...`} className="h-8" disabled />
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-row space-y-2 sm:space-y-0">
            <Button variant="outline" onClick={() => setShowFilterDialog(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button onClick={handleFinishApp} className="w-full sm:w-auto">
              Create App
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
