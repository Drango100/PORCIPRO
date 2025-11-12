import path from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";
import { existsSync } from "node:fs";
import { env } from "./config/env.js";

export async function startup() {
  if (!env.AUTO_MIGRATE) {
    console.log("AUTO_MIGRATE desactivado.");
    return;
  }

  try {
    // __dirname de src/
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    // raíz del proyecto (subir desde src/)
    const root = path.resolve(__dirname, "..");

    // Candidatos: migrations (plural) y migration (singular)
    const candidates = [
      path.resolve(root, "migrations/index.js"),
      path.resolve(root, "migration/index.js"),
    ];

    const migIndex = candidates.find((p) => existsSync(p));

    if (!migIndex) {
      console.warn("AUTO_MIGRATE: no se encontró migrations/index.js ni migration/index.js");
      return;
    }

    console.log(`AUTO_MIGRATE: ejecutando migraciones desde: ${migIndex}`);
    const mod = await import(pathToFileURL(migIndex).href);

    // Soporta default o runMigrations
    const runner =
      (typeof mod.default === "function" && mod.default) ||
      (typeof mod.runMigrations === "function" && mod.runMigrations);

    if (!runner) {
      throw new Error("El runner de migraciones no exporta una función default ni runMigrations()");
    }

    await runner();
    console.log("AUTO_MIGRATE: OK");
  } catch (e) {
    console.error("AUTO_MIGRATE falló:", e);
    // En cualquier entorno conviene **fallar** para no levantar server sin DB al día:
    process.exit(1);
  }
}
