import Link from 'next/link';
import { ArrowRight, Check, Zap, Brain, Battery } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-emerald-500 selection:text-black">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-md">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tighter">MODES</div>
          <Link
            href="/auth/login"
            className="text-sm font-medium hover:text-emerald-400 transition-colors"
          >
            Login
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-emerald-400 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Now Available in Beta
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
            The Founder Efficiency Platform
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Structure your day like the world's top performers. Access pre-built daily modes inspired by Elon, Jensen, and more.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/auth/signup"
              className="h-12 px-8 rounded-full bg-white text-black font-medium flex items-center gap-2 hover:bg-emerald-400 transition-all"
            >
              Start Your Mode <ArrowRight className="w-4 h-4" />
            </Link>
            <span className="text-sm text-gray-500">$9/month. Cancel anytime.</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                <Zap className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold">Context Switching</h3>
              <p className="text-gray-400">
                Receive alerts when it's time to shift gears. Never get stuck in the wrong task.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                <Brain className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold">Founder Archetypes</h3>
              <p className="text-gray-400">
                Adopt the schedules of Elon, Jensen, and MrBeast. Optimized for different output styles.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                <Battery className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold">Energy Management</h3>
              <p className="text-gray-400">
                Align your hardest work with your peak energy windows. Prevent burnout.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 text-center text-gray-600 text-sm">
        <p>© 2024 Modes Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}
