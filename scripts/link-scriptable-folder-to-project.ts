import fs from 'fs/promises'
import path from 'path'
import { homedir } from 'os'
import * as process from 'process'

const SCRIPTABLE_ICLOUD_DOCUMENTS_PATH = path.join(
  homedir(),
  'Library',
  'Mobile Documents',
  'iCloud~dk~simonbs~Scriptable',
  'Documents'
)

const SCRIPTABLE_SYMLINK_FOLDER = path.join(__dirname, '..', 'scriptable')

const symlinkScriptableDocumentsFolderToLocalProject = async () => {
  if (process.platform !== 'darwin') {
    throw new Error(`
      # Scriptable is only supported on macOS.

      Please make sure you are running this script on a macOS host with the latest version of
      scriptable installed. https://scriptable.app/mac-beta/
    `)
  }

  try {
    await fs.access(SCRIPTABLE_ICLOUD_DOCUMENTS_PATH)
  } catch {
    throw new Error(`
      Could not access scriptable iCloud folder at: ${SCRIPTABLE_ICLOUD_DOCUMENTS_PATH}.
    `)
  }

  try {
    await fs.access(SCRIPTABLE_SYMLINK_FOLDER)
    await fs.rm(SCRIPTABLE_SYMLINK_FOLDER, { recursive: true })
  } catch {}

  await fs.symlink(SCRIPTABLE_ICLOUD_DOCUMENTS_PATH, SCRIPTABLE_SYMLINK_FOLDER)
}

symlinkScriptableDocumentsFolderToLocalProject()
  .then(() => {
    console.log(`Successfully linked scriptable folder to local project.`)
    process.exit(0)
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
