import fs from 'fs/promises'
import path from 'path'
import { build } from 'esbuild'

const sourcePath = path.join(__dirname, '..', 'src')

const toPascalCase = (str: string): string => {
  return str
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ')
}

const compileScriptFolders = async (): Promise<void> => {
  const files = await fs.readdir(sourcePath)

  for await (const file of files) {
    const filePath = path.join(sourcePath, file)
    const isDirectory = (await fs.stat(filePath)).isDirectory()
    const scriptName = file.split(path.sep).pop() as string
    const friendlyScriptName = toPascalCase(file).replace('ts', 'js')

    console.log(`[Build] Compiling ${scriptName}`)

    const outfile = `./scriptable/${friendlyScriptName}${
      isDirectory ? '.js' : ''
    }`
    const entryPoints = [path.join(sourcePath, scriptName)]

    const program = await build({
      entryPoints,
      outfile,
      minify: false,
      bundle: true,
      allowOverwrite: true,
      banner: {
        js: `/// ${friendlyScriptName} - generated in ${new Date().toLocaleDateString()} /// \r\n`,
      },
      target: 'es2019',
      platform: 'node',
      tsconfig: 'tsconfig.json',
    })

    program.warnings.forEach(console.warn)

    if (program.errors.length > 0) {
      program.errors.forEach(console.error)
      console.log(`[Build] Compiling ${friendlyScriptName}.....[Failed]`)
      process.exit(1)
    }

    console.log(`[Build] Compiling ${friendlyScriptName}.....[OK]`)
  }

  console.log(`[Build] Succeed!`)
  process.exit(0)
}

compileScriptFolders().then().catch(console.error)
