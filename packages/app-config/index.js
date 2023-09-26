if (process.env.NODE_ENV === "production") {
  throw new Error("Hey, you should alias this package in your webpack config.");
} else {
  console.warn("Hey, you should alias this package in your webpack config.");
}
