#!/usr/bin/env node

const { program } = require("commander");

program.version("1.0.0").description("Silenzio CLI tool");

program
  .command("link")
  .description("Link Silenzio packages")
  .action(() => {
    const { execSync } = require("child_process");
    const packages = [
      "core",
      "next",
      "sanity",
      "eslint-plugin",
      // "prettier-config",
      "types" /* altri pacchetti */,
    ];

    execSync(`npm link ${packages.map((i) => `@silenzio/${i}`).join(" ")}`, {
      stdio: "inherit",
    });

    console.log("All packages linked successfully!");
  });

program
  .command("init")
  .description("Initialize something")
  .action(() => {
    // require('../commands/init')(); // Quando avrai il comando init
    console.log("Initialization logic goes here");
  });

program.parse(process.argv);
