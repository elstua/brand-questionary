import { neon } from "@neondatabase/serverless";

function getClient() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Add it to .env.local for local dev " +
        "or configure it in your Vercel project settings."
    );
  }
  return neon(url);
}

export async function saveSubmission(answers: unknown) {
  const sql = getClient();
  const jsonStr = JSON.stringify(answers);
  const result = await sql`
    INSERT INTO submissions (answers)
    VALUES (${jsonStr}::jsonb)
    RETURNING id, submitted_at
  `;
  return result[0];
}

export async function getSubmissions() {
  const sql = getClient();
  const rows = await sql`
    SELECT id, answers, submitted_at
    FROM submissions
    ORDER BY submitted_at DESC
  `;
  return rows;
}
