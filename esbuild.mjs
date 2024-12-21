import esbuild from "esbuild";
import { sassPlugin } from "esbuild-sass-plugin";
import postcss from "postcss";
import autoprefixer from "autoprefixer";

esbuild
  .build({
    entryPoints: ["assets/css/style.scss", "assets/js/app.js"],
    bundle: true,
    metafile: true,
    outdir: "dist",
    plugins: [
      sassPlugin({
        async transform(source) {
          try {
            const { css } = await postcss([autoprefixer]).process(source);
            return css;
          } catch (error) {
            console.error("Error transforming SCSS with PostCSS:", error);
            throw error; // Rethrow the error to stop the build process
          }
        },
      }),
    ],
  })
  .then(() => console.log("Build succeeded."))
  .catch(() => process.exit(1));
