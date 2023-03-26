import fs from 'fs'
import Link from 'next/link'
import matter from 'gray-matter'
import React from 'react'

export type Post = {
  frontMatter: {
    [key: string]: any
  }
  slug: string
}

type Props = {
  posts: Post[]
}

export const getStaticProps = () => {
  const files = fs.readdirSync('posts')
  const posts = files.map(fileName => {
    const slug = fileName.replace(/\.md$/, '') //追加
    const fileContent = fs.readFileSync(`posts/${fileName}`, 'utf-8')
    const { data } = matter(fileContent)
    return {
      frontMatter: data,
      slug
    }
  })
  return {
    props: {
      posts
    }
  }
}

const Home: React.FC<Props> = ({ posts }) => {
  return (
    <div className='my-8'>
      {posts.map(post => (
        <div key={post.slug}>
          <Link href={`/post/${post.slug}`}>
            <span>{post.frontMatter.title}</span>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Home
