import { getLogger } from 'log4js'

const logger = getLogger('http')

export class ApiError extends Error {
  constructor (status, msg, e) {
    super(msg, e)
    Object.setPrototypeOf(this, ApiError.prototype)
    this.constructor = ApiError
    this.status = status
  }

  toString () {
    return `error: ${this.message}`
  }
}

export const apiErrorHandler = (e, req, res, next) => {
  if (e instanceof ApiError) {
    res.status(e.status || 400).json({ error: e.message })
  } else if (e instanceof SyntaxError) {
    logger.error('parse error', e)
    res.status(400).json({ error: e.message })
  } else {
    logger.error('unknown error', e)
    res.status(500).json({ error: 'unknown error' })
  }
}

export const apiNotFoundHandler = (req, res, next) => {
  res.status(404).json({ error: 'not found' })
}
