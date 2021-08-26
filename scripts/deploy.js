import ghpages from "gh-pages";
import path from "path";
import fs from "fs";

const outDir = path.resolve(__dirname, "../out");

const noJekyllFilepath = path.resolve(outDir, ".nojekyll");
fs.writeFileSync(noJekyllFilepath, "", { encoding: "utf-8" });

ghpages.publish(outDir, { dotfiles: true });
