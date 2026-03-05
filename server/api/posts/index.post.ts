import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const body = await readBody(event)
  
  const postsDir = path.join(process.cwd(), 'content/posts')
  
  if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true })
  }

  if (method === 'POST') {
    const { title, slug, description, category, tags, image, content, author, date, updatedAt } = body
    
    if (!title || !slug || !content) {
      throw createError({
        statusCode: 400,
        statusMessage: '标题、URL 别名和内容不能为空'
      })
    }

    const frontmatter = [
      `---`,
      `title: '${title}'`,
      `description: '${description || ''}'`,
      `date: ${date || new Date().toISOString().split('T')[0]}`,
      category ? `category: '${category}'` : '',
      tags && tags.length > 0 ? `tags: [${tags.map((t: string) => `'${t}'`).join(', ')}]` : '',
      author ? `author: '${author}'` : '',
      image ? `image: '${image}'` : '',
      `---`
    ].filter(line => line && !line.includes(': \'\'') && !line.includes(': []')).join('\n')

    const markdownContent = `${frontmatter}\n\n${content}`
    const filePath = path.join(postsDir, `${slug}.md`)

    fs.writeFileSync(filePath, markdownContent, 'utf-8')

    return {
      success: true,
      message: '文章保存成功',
      data: {
        _path: `/posts/${slug}`,
        title,
        slug,
        description,
        category,
        tags,
        image,
        content,
        author,
        date: date || new Date().toISOString().split('T')[0],
        updatedAt
      }
    }
  }

  throw createError({
    statusCode: 405,
    statusMessage: 'Method not allowed'
  })
})
