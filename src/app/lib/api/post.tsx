// ここで実際はrailsからデータを取得してくるような処理を書く
import fs from 'fs'
import path from 'path'
import { all } from 'axios'
import matter from 'gray-matter'
import { postApi } from './timelog'

export type Post = {
  slug: string
  content: string
  title: string
  date: string
}

// const postsDir = path.join(process.cwd(), "content")

// // 記事名の取得
// export const getPosts = () => fs.readdirSync(postsDir, "utf8");

// export const getPostBySlug = (slug: string) => {
//     const fullPath = path.join(postsDir, slug)
//     const fileContent = fs.readFileSync(fullPath, "utf8")

//     const { data, content } = matter(fileContent)
//     // ここから、ポスト型にいれていく
//     const post: Post = {
//         slug: slug.slice(0, -3),
//         content: content,
//         title: data["title"],
//         date: data["date"]
//     }
//     return post
// }

// export const getAllPosts = () => {
//     const fileNames = getPosts();
//     const posts = fileNames.map((slug) => getPostBySlug(slug)).sort((a, b) => a.date > b.date ? -1 : 1)

//     return posts
// }

// export const getAllPosts = async () => {
//   const { data } = await postApi.listPosts()
//   return data.data
// }
