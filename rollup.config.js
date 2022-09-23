import path from "node:path"
import fs from "node:fs"
import pug from "pug"

function pugPlugin() {
  return {
    name: "rollup-plugin-pug",
    buildStart(opts) {
      this.addWatchFile(path.join(__dirname, "index.pug"))
    },
    generateBundle() {
      console.log("converting .pug to .html")
      const filePath = path.join(__dirname, "index.pug")
      const compile = pug.compileFile(filePath)
      const contents = compile()

      const writeFilePath = path.join(__dirname, "templates", "index.html")
      fs.writeFileSync(writeFilePath, contents)
    }
  }
}

export default {
  input: [
    path.join(__dirname, "public", "index.js"),
  ],
  output: {
    dir: path.join("static")
  },
  plugins: [
    pugPlugin()
  ]
}