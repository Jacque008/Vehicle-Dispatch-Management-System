-- Fix PostgreSQL 15 public schema permissions for Prisma
GRANT ALL ON SCHEMA public TO PUBLIC;
GRANT USAGE, CREATE ON SCHEMA public TO PUBLIC;
