import log4js, { getLogger } from 'log4js'
import { AsyncLocalStorage } from 'async_hooks'

const pattern = '%[[%d{hh:mm:ss.SSS}][%p][%c][%f{2}:%l][%x{reqId}]%] %m'

const reqIdStorage = new AsyncLocalStorage()

const layout = {
  pattern,
  type: 'pattern',
  tokens: {
    reqId: (event) => {
      const reqId = reqIdStorage.getStore()
      if (reqId !== null && reqId !== undefined) {
        return reqId
      }
      return ''
    }
  }
}

const consoleAppender = {
  type: 'console',
  layout
}

const fileAppender = {
  type: 'dateFile',
  encoding: 'utf-8',
  filename: 'logs/api.log',
  daysToKeep: 7,
  layout,
  keepFileExt: true
}

log4js.configure({
  appenders: {
    console: consoleAppender,
    file: fileAppender
  },
  categories: {
    default: {
      appenders: ['console'],
      level: 'debug',
      enableCallStack: true
    }
  }
})

export const loggerMiddleware = (req, res, next) => {
  const logger = getLogger('http')
  const reqId = Math.random()
  const ts = new Date().getTime()
  res.on('finish', () => {
    logger.info(res.statusCode, new Date().getTime() - ts, 'ms')
  })
  res.setHeader('X-Request-Id', reqId)
  reqIdStorage.run(reqId, () => {
    logger.info(req.method, req.originalUrl)
    next()
  })
}
