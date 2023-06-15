import { remark } from 'remark'
import remarkHtml from 'remark-html'

// Markdownを解析して、HTMLを戻す関数
const MarkdownToHtml = async (markdown: string) => {
  const res = await remark().use(remarkHtml).process(markdown)
  return res.toString()
}

export default MarkdownToHtml
