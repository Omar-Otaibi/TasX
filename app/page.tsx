import Link from "next/link"
import { ArrowRight, CheckCircle2, BarChart2, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/ui/logo"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">
      {/* Header */}
      <header className="fixed w-full z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo className="w-8 h-8" />
            <span className="font-bold text-xl tracking-tight text-primary">TasX</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Features
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 px-4 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_40%,var(--primary)_0%,transparent_100%)] opacity-5 blur-3xl" />

        <div className="container mx-auto text-center max-w-4xl">
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20 mb-6">
              v0.2 Now Available
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-primary mb-6 drop-shadow-sm">
              Manage Projects with <span className="text-[#51B1E0]">TasX</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              The modern project management tool designed for agile teams. Track tasks, allocate resources, and generate
              insightful reports in seconds.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="h-12 px-8 text-lg rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 group"
                >
                  Get Started Now
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="h-12 px-8 text-lg rounded-full bg-transparent">
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">Everything you need</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Powerful features to keep your team organized and aligned.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: CheckCircle2,
                title: "Task Management",
                description:
                  "Create, organize, and track tasks with our intuitive interface. Set durations, dates, and dependencies effortlessly.",
              },
              {
                icon: Users,
                title: "Resource Allocation",
                description:
                  "Manage team availability and assign resources effectively. Visualize workloads and prevent burnout.",
              },
              {
                icon: BarChart2,
                title: "Smart Reporting",
                description:
                  "Generate detailed cost and progress reports instantly. Get a clear view of your project's health.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-card p-8 rounded-2xl border hover:border-primary/50 transition-all duration-300 hover:shadow-lg group"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Preview */}
      <section className="py-24 overflow-hidden relative">
        <div className="container mx-auto px-4">
          <div className="relative rounded-2xl border bg-card shadow-2xl overflow-hidden max-w-5xl mx-auto transform hover:scale-[1.01] transition-transform duration-500">
            <div className="absolute top-0 w-full h-12 bg-muted/50 border-b flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="mt-12 p-4 grid grid-cols-4 gap-4 opacity-50 blur-[1px] pointer-events-none select-none">
              {/* Abstract Dashboard Representation */}
              <div className="col-span-1 h-96 border-r pr-4 space-y-4">
                <div className="h-8 w-full bg-muted rounded" />
                <div className="h-4 w-3/4 bg-muted rounded" />
                <div className="h-4 w-1/2 bg-muted rounded" />
              </div>
              <div className="col-span-3 space-y-6">
                <div className="h-32 w-full bg-primary/5 rounded-xl border border-primary/10" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-40 w-full bg-muted/30 rounded-xl" />
                  <div className="h-40 w-full bg-muted/30 rounded-xl" />
                </div>
              </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center bg-background/10 backdrop-blur-[2px]">
              <div className="text-center p-8 bg-background/80 backdrop-blur-xl rounded-2xl border shadow-2xl max-w-md">
                <Logo className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Ready to simplify your workflow?</h3>
                <Link href="/dashboard">
                  <Button size="lg" className="mt-4 w-full">
                    Launch Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Logo className="w-6 h-6 text-muted-foreground" />
              <span className="font-bold text-lg text-muted-foreground">TasX</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2025 TasX Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <span className="text-sm text-muted-foreground hover:text-primary cursor-pointer">Privacy</span>
              <span className="text-sm text-muted-foreground hover:text-primary cursor-pointer">Terms</span>
              <span className="text-sm text-muted-foreground hover:text-primary cursor-pointer">Contact</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
