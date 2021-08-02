import fs from 'fs'
import path from 'path'
import config from '../config'
import uuid from 'short-uuid'
import { ApiError } from '../error'

const dirPath = config.STORAGE_PATH || 'storage'
const filePath = dirPath + '/storage.db'
const draftPath = filePath + '.draft'

const mkdirs = () => {
  try {
    fs.mkdirSync(dirPath, { recursive: true })
  } catch (e) {
    if (e) {
      if (e.code !== 'EEXIST') {
        throw e
      }
    }
  }
}

export const readFile = (filePath) => {
  const buffer = fs.readFileSync(filePath)
  const storage = JSON.parse(buffer.toString('utf8'))
  return storage
}

export const writeFile = (filePath, storage) => {
  mkdirs()
  fs.writeFileSync(filePath, JSON.stringify(storage), { encoding: 'utf8', mode: '644', flag: 'w' })
}

export const commitFile = (filePath) => {
  const backupSuffix = new Date().getTime()
  const backupFile = filePath + '.' + backupSuffix
  const oldStorage = readFile(filePath)
  writeFile(backupFile, oldStorage)
  const draftFile = filePath + '.draft'
  const draft = readFile(draftFile)
  const ts = new Date().getTime()
  const newStorage = { ...draft, backupFile, publishedAt: ts, draftAt: ts }
  writeFile(filePath, newStorage)
  writeFile(draftFile, newStorage)
}
try {
  readFile(filePath)
} catch (e) {
  writeFile(filePath, {})
}

try {
  readFile(draftPath)
} catch (e) {
  writeFile(draftPath, {})
}

export const rollbackFile = (filePath) => {
  const storage = readFile(filePath)
  const { backupFile } = storage
  if (backupFile) {
    fs.copyFileSync(backupFile, filePath, fs.constants.COPYFILE_FICLONE_FORCE)
  }
}

export const uploadFile = (tmpFile, fileName) => {
  const index = fileName.lastIndexOf('.')
  let suffix = ''
  if (index > 0) {
    suffix = fileName.substring(index)
  }
  const uploadName = uuid.generate() + suffix
  fs.renameSync(tmpFile, config.UPLOAD_PATH + '/' + uploadName)
  const digest = config.HASH(uploadName)
  return '/api/file/' + uploadName + '?sign=' + encodeURIComponent(digest)
}

export function getPath (obj, path) {
  let schema = obj // a moving reference to internal objects within obj
  const pList = path.split('.')
  const len = pList.length
  for (let i = 0; i < len - 1; i++) {
    const elem = pList[i]
    if (!schema[elem]) schema[elem] = {}
    schema = schema[elem]
  }
  return schema[pList[len - 1]]
}

export function setPath (obj, path, value) {
  let schema = obj // a moving reference to internal objects within obj
  const pList = path.split('.')
  const len = pList.length
  for (let i = 0; i < len - 1; i++) {
    const elem = pList[i]
    if (!schema[elem]) schema[elem] = {}
    schema = schema[elem]
  }

  schema[pList[len - 1]] = value
}

export default {
  getStorage: async (req, res, next) => {
    try {
      const storage = readFile(filePath)
      res.json(storage)
    } catch (e) {
      next(e)
    }
  },
  getStorageDraft: async (req, res, next) => {
    try {
      const storage = readFile(filePath + '.draft')
      res.json(storage)
    } catch (e) {
      next(e)
    }
  },
  getFiles: async (req, res, next) => {
    try {
      if (req.params.file && req.query.sign) {
        if (config.HASH(req.params.file) === req.query.sign) {
          const filePath = path.resolve(config.UPLOAD_PATH, req.params.file)
          res.sendFile(filePath)
          return
        }
      }
      throw new ApiError(403, 'forbidden')
    } catch (e) {
      next(e)
    }
  },
  uploadFiles: async (req, res, next) => {
    try {
      const files = req.files || [req.file] || []
      const fieldMap = {}
      let storage = {}
      try {
        storage = readFile(draftPath)
      } catch (e) {
      }
      for (const file of files) {
        const { fieldname, originalname, mimetype, destination, path, size } = file
        if (fieldname && !fieldMap[fieldname]) {
          const uploadPath = uploadFile(path, originalname)
          setPath(storage, fieldname, uploadPath)
          fieldMap[fieldname] = uploadPath
        }
      }
      for (const fieldname in req.body || {}) {
        if (fieldname && !fieldMap[fieldname]) {
          const fieldValue = req.body[fieldname]
          setPath(storage, fieldname, JSON.parse(fieldValue))
          fieldMap[fieldname] = JSON.parse(fieldValue)
        }
      }
      const ts = new Date().getTime()
      writeFile(draftPath, { ...storage, draftAt: ts })
      res.json({})
    } catch (e) {
      next(e)
    }
  },
  commitFile: async (req, res, next) => {
    try {
      commitFile(filePath)
      res.json({})
    } catch (e) {
      next(e)
    }
  }
}
