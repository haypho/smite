import path from "path";
import dotenv from "dotenv";
import inquirer from "inquirer";
import { Session } from "./session";

dotenv.config({
  path: path.resolve(__dirname, "../../.env.development.local"),
});



const main = async () => {
  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "Which action would you like to perform?",
      default: "Download",
      choices: ["Download"],
    },
  ]);
  const { category } = await inquirer.prompt([
    {
      type: "list",
      name: "category",
      message: "Under which category should the action be performed?",
      choices: ["Smite Gods"],
    }
  ]);
  const sessionId = await Session.getAsync();
}

main();
