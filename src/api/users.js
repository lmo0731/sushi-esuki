import jwt from 'jsonwebtoken'
import { getLogger } from 'log4js'
import config from '../config'
import { ApiError } from '../error'
import { readFile, writeFile } from './storage'

const {
  DEFAULT_USER = 'lmo0731@gmail.com',
  DEFAULT_PASS = 'Password1'
} = process.env

const usersFile = config.STORAGE_PATH + '/users.db'
const logger = getLogger('users')

const readUsers = () => {
  const users = readFile(usersFile)
  return users
}

const checkPasswd = (username, password) => {
  const users = readUsers() || {}
  const hashPasswd = users[username]
  if (hashPasswd && config.HASH(password) === hashPasswd) {
    return true
  }
  return false
}

const writeUsers = (users) => {
  writeFile(usersFile, users)
}

try {
  const users = readUsers()
  console.log('Asd')
  logger.info('USERS: ' + Object.keys(users))
} catch (e) {
  if (e.code === 'ENOENT') {
    writeUsers({ [DEFAULT_USER]: config.HASH(DEFAULT_PASS) })
  } else {
    logger.error(e)
  }
}

export const auth = (req, res, next) => {
  try {
    const authorization = req.headers.authorization
    if (authorization) {
      const [method, credential] = authorization.split(' ', 2)
      if (method && method.toLowerCase() === 'bearer' && credential) {
        try {
          req.auth = jwt.verify(credential, config.JWT_KEY)
          next()
          return
        } catch (e) {
        }
      }
    }
    throw new ApiError(401, 'login required')
  } catch (e) {
    next(e)
  }
}

export const userLogin = (req, res, next) => {
  try {
    const { username, password } = req.body
    const token = jwt.sign({ username }, config.JWT_KEY, {
      expiresIn: '1h'
    })
    if (checkPasswd(username, password)) {
      res.json({ token, user: username })
    } else {
      throw new ApiError(401, 'username password mismatch')
    }
  } catch (e) {
    next(e)
  }
}

export const checkLogin = (req, res, next) => {
  try {
    res.json({ user: req.auth.username })
  } catch (e) {
    next(e)
  }
}

export const userPasswd = (req, res, next) => {
  try {
    const { username, password, newPassword } = req.body
    if (checkPasswd(username, password)) {
      const users = readUsers()
      users[username] = config.HASH(newPassword)
      writeUsers(users)
      res.json({})
    } else {
      throw new ApiError(401, 'username password mismatch')
    }
  } catch (e) {
    next(e)
  }
}
