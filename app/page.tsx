import Link from "next/link";
import { ArrowRight, CheckCircle2, Brain } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900 px-6">
      {/* App Logo & Title */}
      <div className="flex items-center space-x-3 mb-6">
        <Brain className="w-10 h-10 text-blue-600" />
        <h1 className="text-4xl font-extrabold tracking-tight">TaskMind</h1>
      </div>

      {/* Subtitle */}
      <p className="text-lg text-slate-600 mb-10 text-center max-w-lg">
        Organize your tasks. Clear your mind. Boost your productivity with a minimal and intuitive interface with AI-powered features.
      </p>

      {/* Feature highlights */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <Feature text="Smart task organization" />
        <Feature text="Reminders that work" />
        <Feature text="Seamless sync across devices" />
      </div>

      {/* Call-to-action */}
      <Link
        href="/login"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition"
      >
        Get Started
        <ArrowRight className="w-4 h-4" />
      </Link>

      {/* Footer */}
      <footer className="absolute bottom-6 text-sm text-slate-500">
        © {new Date().getFullYear()} TaskMind. All rights reserved.
      </footer>
    </main>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 text-slate-700 bg-white px-4 py-2 rounded-xl shadow-sm hover:shadow transition">
      <CheckCircle2 className="w-5 h-5 text-green-500" />
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
}
