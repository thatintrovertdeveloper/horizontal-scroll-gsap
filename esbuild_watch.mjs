import esbuild from "esbuild";
import liveServer from "@compodoc/live-server";
import { sassPlugin } from "esbuild-sass-plugin";
import postcss from "postcss";
import autoprefixer from "autoprefixer";

// Start the live server
liveServer.start({
  port: 7000,
  host: "localhost",
  root: "./", // Set root to the current directory
  open: true,
  ignore: ["node_modules"],
  wait: 0,
});

// Define the esbuild build options
const buildOptions = {
  logLevel: "info", // Change logLevel to "info" to reduce verbosity
  entryPoints: ["assets/css/style.scss", "assets/js/app.js"],
  outdir: "dist",
  bundle: true,
  metafile: true,
  plugins: [
    sassPlugin({
      async transform(source) {
        const { css } = await postcss([autoprefixer]).process(source);
        return css;
      },
    }),
  ],
};

// Create a build context and watch for changes
esbuild
  .context(buildOptions)
  .then((context) => {
    // Initial build
    context
      .rebuild()
      .then((result) => {
        console.log("Initial build succeeded.");
      })
      .catch((error) => {
        console.error("Initial build failed:", error);
        process.exit(1);
      });

    // Watch for changes
    context
      .watch()
      .then(() => {
        console.log("Watching for changes...");
      })
      .catch((error) => {
        console.error("Watch failed:", error);
        process.exit(1);
      });

    // Optionally, you can call context.dispose() to stop watching
    // context.dispose();
  })
  .catch((error) => {
    console.error("Failed to create build context:", error);
    process.exit(1);
  });
