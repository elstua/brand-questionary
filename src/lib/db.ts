import { neon } from "@neondatabase/serverless";

const DATABASE_URL_KEYS = ["DATABASE_URL", "POSTGRES_URL"] as const;
let ensureSchemaPromise: Promise<void> | null = null;

function getDatabaseUrl() {
  for (const key of DATABASE_URL_KEYS) {
    const value = process.env[key];
    if (value && value.trim().length > 0) {
      return value;
    }
  }

  throw new Error(
    `Database URL is missing. Set one of: ${DATABASE_URL_KEYS.join(", ")}. ` +
      "Use .env.local for local development and project environment variables in production."
  );
}

function getClient() {
  return neon(getDatabaseUrl());
}

async function ensureSchema(sql: ReturnType<typeof getClient>) {
  if (!ensureSchemaPromise) {
    ensureSchemaPromise = sql`
      CREATE TABLE IF NOT EXISTS submissions (
        id SERIAL PRIMARY KEY,
        answers JSONB NOT NULL,
        submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `
      .then(() => undefined)
      .catch((error) => {
        ensureSchemaPromise = null;
        throw error;
      });
  }

  await ensureSchemaPromise;
}

export async function saveSubmission(answers: unknown) {
  const sql = getClient();
  await ensureSchema(sql);
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
  await ensureSchema(sql);
  const rows = await sql`
    SELECT id, answers, submitted_at
    FROM submissions
    ORDER BY submitted_at DESC
  `;
  return rows;
}
