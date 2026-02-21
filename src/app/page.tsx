import Questionnaire from "@/components/Questionnaire";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 py-16 dark:bg-zinc-950">
      <main className="w-full max-w-2xl">
        <h1 className="mb-2 text-center text-2xl font-medium font-serif text-zinc-900 dark:text-zinc-100">
          About Char
        </h1>
        <p className="mb-10 text-center text-zinc-600 dark:text-zinc-400">
          14 questions to shape Char's identity, voice, and direction
        </p>
        <Questionnaire />
      </main>
    </div>
  );
}
