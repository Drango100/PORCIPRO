import app from "./app.js";
import { startup } from "./startup.js";
import { env } from "./config/env.js";

await startup();

app.listen(env.PORT, () => {
  console.log(`API corriendo en http://localhost:${env.PORT}`);
});
