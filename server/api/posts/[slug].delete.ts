import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  
  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: '缺少文章 slug'
    })
  }

  const filePath = path.join(process.cwd(), 'content/posts', `${slug}.md`)

  if (!fs.existsSync(filePath)) {
    throw createError({
      statusCode: 404,
      statusMessage: '文章不存在'
    })
  }

  fs.unlinkSync(filePath)

  return {
    success: true,
    message: '文章删除成功'
  }
})
