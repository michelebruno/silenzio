if (process.env.NODE_ENV === "production") {
  throw new Error(
    "Hey, you should alias this package in your webpack config using withSilenzio function."
  );
} else {
  console.error(
    "Hey, you should alias this package in your webpack config. This will throw an error in production."
  );
}
