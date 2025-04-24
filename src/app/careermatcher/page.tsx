import { CareerMatcher } from "../../../components/career-matcher";

export default function AppPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl mb-4">
            Career Match
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Discover the perfect career path based on your unique skills and expertise
          </p>
        </header>
        <CareerMatcher />
      </div>
    </main>
  )
}