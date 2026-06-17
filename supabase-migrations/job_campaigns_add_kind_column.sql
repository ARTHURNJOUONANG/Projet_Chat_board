-- À exécuter dans Supabase : SQL Editor → New query → Run
-- Corrige : "Could not find the 'kind' column of 'job_campaigns' in the schema cache"
--
-- Idempotent : safe si la colonne existe déjà.

ALTER TABLE job_campaigns
ADD COLUMN IF NOT EXISTS kind TEXT DEFAULT 'jobs';

-- Contrainte CHECK (ignore si déjà présente — Postgres n’a pas IF NOT EXISTS pour CHECK)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'job_campaigns_kind_check'
  ) THEN
    ALTER TABLE job_campaigns
      ADD CONSTRAINT job_campaigns_kind_check
      CHECK (kind IN ('jobs', 'kandi'));
  END IF;
END $$;

COMMENT ON COLUMN job_campaigns.kind IS 'jobs = offres auto ; kandi = contacts spontanés';
