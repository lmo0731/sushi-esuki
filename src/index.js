
import express from 'express'
import { getLogger } from 'log4js'
import next from 'next'
import api from './api'
import config from './config'

const logger = getLogger('server')

const dev = process.env.NODE_ENV !== 'production'
logger.info('dev', dev)
const app = next({ dev })
const handle = app.getRequestHandler()
app.prepare()
  .then(() => {
    const server = express()
    server.use('/api', api)
    server.get('*', (req, res) => {
      return handle(req, res)
    })
    logger.info('port', config.SERVER_PORT)
    server.listen(config.SERVER_PORT, (err) => {
      if (err) throw err
      logger.info('> Ready on ', config.SERVER_PORT)
    })
  })
  .catch((ex) => {
    logger.error(ex)
  })
