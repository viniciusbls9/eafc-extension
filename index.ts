import login from "./src/usecases/login/index";
import * as dotenv from "dotenv";

dotenv.config();

(async () => {
  await login();
})();
