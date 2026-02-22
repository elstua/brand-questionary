import Summary from "@/components/Summary";

export default function SummaryPage() {
  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-16 dark:bg-zinc-950">
      <main className="mx-auto max-w-5xl">
        <h1 className="mb-2 text-center text-2xl font-medium font-serif text-zinc-900 dark:text-zinc-100">
          Brand Questionnaire — Summary
        </h1>
        <p className="mb-12 text-center text-zinc-600 dark:text-zinc-400">
          Side-by-side answers from 3 respondents
        </p>
        <Summary />
      </main>
    </div>
  );
}
