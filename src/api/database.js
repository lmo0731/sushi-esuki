import { getLogger } from 'log4js'
import sqlite from 'sqlite3'
import config from '../config'

const logger = getLogger('db')

const dbFile = config.STORAGE_PATH + '/database.sqlite'

export const update = async (sql, ...params) => {
  const db = new sqlite.Database(dbFile)
  logger.debug(sql, params)
  return await new Promise((resolve, reject) => {
    db.serialize(() => {
      const st = db.prepare(sql, (err) => {
        if (err) {
          reject(err)
        }
      })
      st.run(params, (result, err) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
      st.finalize((err) => {
        if (err) {
          reject(err)
        }
      })
    })
    db.close((err) => {
      if (err) {
        reject(err)
      }
    })
  })
}

export const findOne = async (sql, ...params) => {
  const db = new sqlite.Database(dbFile, sqlite.OPEN_READONLY)
  logger.debug(sql, params)
  return await new Promise((resolve, reject) => {
    db.serialize(() => {
      const st = db.prepare(sql, (err) => {
        if (err) {
          reject(err)
        }
      })
      st.get(params, (err, row) => {
        if (err) {
          reject(err)
        } else {
          resolve(row)
        }
      })
      st.finalize((err) => {
        if (err) {
          reject(err)
        }
      })
    })
    db.close((err) => {
      if (err) {
        reject(err)
      }
    })
  })
}

export const find = async (sql, ...params) => {
  const db = new sqlite.Database(dbFile, sqlite.OPEN_READONLY)
  logger.debug(sql, params)
  return await new Promise((resolve, reject) => {
    db.serialize(() => {
      const st = db.prepare(sql, (err) => {
        if (err) {
          reject(err)
        }
      })
      st.all(params, (err, rows) => {
        if (err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
      st.finalize((err) => {
        if (err) {
          reject(err)
        }
      })
    })
    db.close((err) => {
      if (err) {
        reject(err)
      }
    })
  })
}

export default {
  update, find, findOne
}
