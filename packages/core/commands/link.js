module.exports = function () {
  const { execSync } = require("child_process");
  const packages = [
    "@silenzio/core",
    "@silenzio/next",
    "@silenzio/types" /* altri pacchetti */,
  ];

  packages.forEach((pkg) => {
    console.log(`Linking ${pkg}...`);
    execSync(`npm link ${pkg}`, { stdio: "inherit" });
  });

  console.log("All packages linked successfully!");
};
