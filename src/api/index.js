import express from 'express'
import config from '../config'
import cors from 'cors'
import { apiErrorHandler, apiNotFoundHandler } from '../error'
import { loggerMiddleware } from '../logger'
import multer from 'multer'
import storage from './storage'
import { auth, checkLogin, userLogin, userPasswd } from './users'
import cookieParser from 'cookie-parser'
import './database'
import posts from './posts'

const api = express.Router()
const upload = multer({
  dest: config.TMP_PATH
})

api.use(cors())
api.use(cookieParser())
api.use(express.json())
api.use(loggerMiddleware)
api.get('/', (req, res, next) => res.send('api working'))
api.get('/storage', storage.getStorage)
api.get('/posts', posts.getPosts)
// admin actions
api.post('/admin/login', userLogin)
api.post('/admin/passwd', userPasswd)
api.get('/admin/check', auth, checkLogin)
api.get('/file/:file', storage.getFiles)
api.post('/admin/upload', auth, upload.any(), storage.uploadFiles)
api.get('/admin/draft', auth, storage.getStorageDraft)
api.post('/admin/publish', auth, storage.commitFile)
api.use('/admin/posts', auth, express.Router()
  .get('/', posts.getAll)
  .post('/', upload.any(), posts.upsert)
  .use('/:postId', posts.check, express.Router()
    .get('/', posts.get)
    .put('/', upload.any(), posts.upsert)
    .put('/publish', posts.publish)
    .delete('/', posts.delete)
  )
)
api.use(apiErrorHandler)
api.use(apiNotFoundHandler)

export default api
