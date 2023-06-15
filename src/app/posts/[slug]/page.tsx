import MarkdownToHtml from '../../lib/markdownToHtml'
import { Post } from '@/../../api/generated/api'
import { getPostBySlug, getPosts } from '@/lib/api/post'

export function generateStaticParams() {
  const posts = getPosts()
  return posts.map((post: Array<Post>) => ({
    slug: post.slice(0, -3),
  }))
}

async function getData(content: string) {
  const convertedHtml = await MarkdownToHtml(content)
  return convertedHtml
}

const PostPage = async ({ params }: any) => {
  const { slug } = params
  const post = getPostBySlug(`${slug}.md`)
  const postContent = getData(post.content)

  const [postData] = await Promise.all([postContent])
  return (
    <div>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: postData }} />
    </div>
  )
}

export default PostPage
// falseの場合: staticParamsで取得したものとurlからくるparamがことなっていると404
export const dynamicParams = false
