// ここは個人のブログの編集ページになる予定
'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import styles from '../create_content.module.scss'
import MarkdownToHtml from '@/lib/markdownToHtml'

const CreateContent = () => {
  const [markdownContent, setMarkdownContent] = useState('')
  const [convertedHtml, setConvertedHtml] = useState('')
  const [title, setTitle] = useState('')

  useEffect(() => {
    const convertToHtml = async (markdown: string) => {
      const res = await MarkdownToHtml(markdown)
      setConvertedHtml(res)
    }

    convertToHtml(markdownContent)
  }, [markdownContent])

  const handleMarkdownChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdownContent(event.target.value)
  }

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>): void => setTitle(event.target.value)

  return (
    <>
      <label htmlFor='title'>Title: </label>
      <input
        id={'title'}
        placeholder={'記事タイトルを入力してください'}
        type={'text'}
        value={title}
        onChange={onChangeTitle}
      />
      <div className={styles.create_content}>
        <div className={styles.input_markdown}>
          {/* マークダウン入力エリア */}
          <h2>マークダウン入力</h2>
          <textarea value={markdownContent} onChange={handleMarkdownChange} />
        </div>
        <div className={styles.output_markdown}>
          {/* マークダウン→HTML出力エリア */}
          <h2>マークダウン出力</h2>
          <div dangerouslySetInnerHTML={{ __html: convertedHtml }} />
        </div>
      </div>
      <p>ここら辺に画像のurl表示しておくと、画像を使用したい時に便利そうよな</p>
    </>
  )
}

export default CreateContent
