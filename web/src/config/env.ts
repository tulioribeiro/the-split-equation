import { z } from "zod";

const EnvSchema = z.object({
  VITE_APP_API_URL: z.url(),
  VITE_APP_ENABLE_API_MOCKING: z
    .enum(["true", "false"])
    .transform((s) => s === "true"),
});

const parsed = EnvSchema.safeParse(import.meta.env);

if (!parsed.success) {
  console.error("Invalid environment variables", z.treeifyError(parsed.error));

  throw new Error("Invalid environment variables");
}

export const APP_ENV = parsed.data;
export type AppEnv = typeof APP_ENV;
