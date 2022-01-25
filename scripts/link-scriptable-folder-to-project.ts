// create symlink
import fs from 'fs/promises'
import path from 'path'
import { homedir } from 'os'

const SCRIPTABLE_FOLDER_PATH = path.join(homedir(), "/Library/Mobile\ Documents/iCloud\~dk\~simonbs\~Scriptable/Documents")

const createSymlink = async (
  source: string,
  target: string,
): Promise<void> => {
  const sourcePath = path.resolve(source)
  const targetPath = path.resolve(target)

  try {
    await fs.access(sourcePath)
  } catch (error) {
    console.error(error)
    throw new Error("Could not access Scriptable folder.")
  }

  try {
    await fs.rm(targetPath, { recursive: true })
    await fs.mkdir(targetPath, { recursive: true })
    await fs.symlink(sourcePath, targetPath)
  } catch (error) {
    console.error("Could not create symlink.", error)
    return
  }

}

const main = async () => {
  if (process.platform !== 'darwin') {
    throw new Error(`
      # Scriptable is only supported on macOS.

      Please make sure you are running this script on a macOS host with the latest version of 
      scriptable installed. https://scriptable.app/mac-beta/
    `)
  }

  await createSymlink(SCRIPTABLE_FOLDER_PATH, "../../scriptable")
}

main()
