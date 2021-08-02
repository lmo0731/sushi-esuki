import { getLogger } from 'log4js'
import { ApiError } from 'next/dist/next-server/server/api-utils'
import { uuid } from 'short-uuid'
import database from './database'
import { uploadFile, setPath } from './storage'
const logger = getLogger('posts')

database.update('create table posts (id TEXT PRIMARY KEY, json TEXT, created_at INT, published_at INT)').catch(e => {
  logger.error(e)
})

const createPost = async (id, post) => {
  await database.update('insert into posts (id, json, created_at, published_at) values (?, ?,?,?)', id, JSON.stringify(post), new Date().getTime(), 0)
}

const updatePost = async (id, post) => {
  await database.update('update posts set json = ? where id = ?', JSON.stringify(post), id)
}

const deletePost = async (id) => {
  await database.update('delete from posts where id = ?', id)
}

const convert = (post) => {
  const { json, created_at: createdAt, published_at: publishedAt, id } = post
  return {
    id,
    json: JSON.parse(json),
    createdAt,
    publishedAt
  }
}

const getPost = async (id) => {
  const post = await database.findOne('select * from posts where id = ?', id)
  return convert(post)
}

export const getPublishedPosts = async (offset = 0, limit = 5) => {
  const result = await database.find('select * from posts where published_at > 0 order by published_at desc limit ? offset ?', limit, offset)
  return result.map(convert)
}

const publishPost = async (id, publish) => {
  await database.update('update posts set published_at = ? where id = ?', publish ? new Date().getTime() : 0, id)
}

const getPosts = async (offset = 0, limit = 5) => {
  const result = await database.find('select * from posts order by created_at desc  limit ? offset ?', limit, offset)
  return result.map(convert)
}

const validate = (post) => {
  const { title, image, body } = post
  return { title, image, body }
}

export default {
  check: async (req, res, next) => {
    try {
      const { postId } = req.params
      const post = await getPost(postId)
      if (post) {
        req.post = post
        next()
      } else {
        throw new ApiError(400, 'post not found')
      }
    } catch (e) {
      next(e)
    }
  },
  upsert: async (req, res, next) => {
    try {
      const files = req.files || [req.file] || []
      const { post } = req
      const { id, json } = post || { json: {} }
      const fieldMap = {}
      for (const file of files) {
        if (file) {
          const { fieldname, originalname, mimetype, destination, path, size } = file
          if (fieldname && !fieldMap[fieldname]) {
            const uploadPath = uploadFile(path, originalname)
            if (uploadPath !== undefined) {
              setPath(json, fieldname, uploadPath)
              fieldMap[fieldname] = uploadPath
            }
          }
        }
      }
      if (req.body) {
        for (const fieldname in req.body || {}) {
          if (fieldname && !fieldMap[fieldname]) {
            const fieldValue = req.body[fieldname]
            if (fieldValue !== undefined) {
              setPath(json, fieldname, JSON.parse(fieldValue))
              fieldMap[fieldname] = JSON.parse(fieldValue)
            }
          }
        }
      }
      if (id) {
        await updatePost(id, validate(json))
        res.json({
          id
        })
      } else {
        const id = uuid()
        await createPost(id, validate(json))
        res.json({
          id
        })
      }
    } catch (e) {
      next(e)
    }
  },
  delete: async (req, res, next) => {
    try {
      const { post } = req
      const { id } = post
      await deletePost(id)
      res.json({})
    } catch (e) {
      next(e)
    }
  },
  publish: async (req, res, next) => {
    try {
      const { post } = req
      const { id, publishedAt } = post
      if (publishedAt > 0) {
        await publishPost(id, false)
      } else {
        await publishPost(id, true)
      }
      res.json({})
    } catch (e) {
      next(e)
    }
  },
  get: async (req, res, next) => {
    try {
      const { post } = req
      res.json(post)
    } catch (e) {
      next(e)
    }
  },
  getAll: async (req, res, next) => {
    try {
      const { offset = '0', limit = '5' } = req.query
      const off = parseInt(offset, 10)
      const lim = parseInt(limit, 10)
      const posts = await getPosts(off, lim)
      res.json(posts)
    } catch (e) {
      next(e)
    }
  },
  getPosts: async (req, res, next) => {
    try {
      const { offset = '0', limit = '5' } = req.query
      const off = parseInt(offset, 10)
      const lim = parseInt(limit, 10)
      const posts = await getPublishedPosts(off, lim)
      res.json(posts)
    } catch (e) {
      next(e)
    }
  }
}
