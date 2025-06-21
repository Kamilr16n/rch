import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, Zap, Database, Brain, Users, ArrowRight, CheckCircle } from "lucide-react"
import InteractiveChart from "@/components/interactive-chart"
import TiltedFeatureCard from "@/components/tilted-feature-card"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">

      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-sm flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">Rechart app</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-green-600 transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-green-600 transition-colors">
                Pricing
              </a>
              <a href="#about" className="text-gray-600 hover:text-green-600 transition-colors">
                About
              </a>
              <Link href="/auth/signin">
                <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="bg-green-600 hover:bg-green-700">
                  Get Started
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-green-100 text-green-800 border-green-200">AI-Powered Analytics</Badge>
                <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                  Generate Professional Charts with <span className="text-green-600">AI Intelligence</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Transform your data into stunning visualizations instantly. Our AI understands your data patterns and
                  creates the perfect charts for your business needs.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/signup"> 
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3">
                    Start Creating Charts
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-50 text-lg px-8 py-3"
                >
                  Watch Demo
                </Button>
              </div>
            </div>
            <div className="relative">
              <InteractiveChart />
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features for Data Visualization</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to create professional charts and analytics dashboards with the power of artificial
              intelligence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Brain className="w-6 h-6 text-green-600" />,
                title: "AI-Powered Analysis",
                description: "Our AI automatically detects patterns and suggests the best chart types for your data.",
              },
              {
                icon: <Zap className="w-6 h-6 text-green-600" />,
                title: "Instant Generation",
                description:
                  "Create professional charts in seconds, not hours. Just upload your data and let AI do the work.",
              },
              {
                icon: <Database className="w-6 h-6 text-green-600" />,
                title: "Multiple Data Sources",
                description: "Connect to Excel, CSV, Google Sheets, databases, and APIs seamlessly.",
              },
              {
                icon: <BarChart3 className="w-6 h-6 text-green-600" />,
                title: "20+ Chart Types",
                description:
                  "From basic bar charts to complex heatmaps and treemaps - we support all visualization types.",
              },
              {
                icon: <Users className="w-6 h-6 text-green-600" />,
                title: "Team Collaboration",
                description: "Share charts with your team, add comments, and collaborate in real-time.",
              },
              {
                icon: <TrendingUp className="w-6 h-6 text-green-600" />,
                title: "Real-time Updates",
                description: "Charts automatically update when your source data changes. Always stay current.",
              },
            ].map((feature, index) => (
              <TiltedFeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-green-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold text-white">Ready to Transform Your Data?</h2>
            <p className="text-xl text-green-100">
              Join thousands of professionals who trust Rechart app for their data visualization needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button size="lg" className="bg-white text-green-600 hover:bg-green-300 text-lg px-8 py-3 ">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="bg-green-600 text-white hover:bg-green-700 text-lg px-8 py-3"
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-600 rounded-sm flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold">Rechart app</span>
              </div>
              <p className="text-gray-400">The future of data visualization powered by artificial intelligence.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Integrations
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Status
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Rechart app. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
