import fs from 'fs/promises'
import path from 'path'
import { build } from 'esbuild'

const sourcePath = path.join(__dirname, '..', 'src')

const getFolders = async (c: string): Promise<string[]> => {
  const filesInDirectory = await fs.readdir(c)

  const folders = filesInDirectory
    .flatMap(async f => {
      const folderPath = path.join(sourcePath, f)

      const isFolderDirectory = (
        await fs.stat(folderPath)
      ).isDirectory()

      return (isFolderDirectory ? folderPath : [])
    }) as unknown as string[]

  return Promise.all(folders)
}

const compileScriptFolders = async (): Promise<void> => {
  const folders = await getFolders(sourcePath)

  for await (const folder of folders) {
    const folderName = folder.split(path.sep).pop()

    console.log(`[Build] Compiling ${folderName}`)

    const program = await build({
      entryPoints: [path.join(folder, 'index.ts')],
      minify: false,
      bundle: true,
      target: 'es2019',
      platform: 'node',
      outfile: `./scriptable/${folderName}.js`,
      tsconfig: 'tsconfig.json'
    })

    program.warnings.forEach(console.warn)

    if (program.errors.length > 0) {
      program.errors.forEach(console.error)
      console.log(`[Build] Compiling ${folderName}.....[Failed]`)
      process.exit(1)
    }

    console.log(`[Build] Compiling ${folderName}.....[OK]`)
  }

  console.log(`Build Succeed`)
  process.exit(1);
}

compileScriptFolders().then().catch(console.error)
