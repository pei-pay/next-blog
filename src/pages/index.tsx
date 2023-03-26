import fs from 'fs'
import Link from 'next/link'
import matter from 'gray-matter'
import React from 'react'
import PostCard from '@/components/PostCard'

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
    const slug = fileName.replace(/\.md$/, '')
    const fileContent = fs.readFileSync(`posts/${fileName}`, 'utf-8')
    const { data } = matter(fileContent)
    return {
      frontMatter: data,
      slug
    }
  })

  const sortedPosts = posts.sort((postA, postB) =>
    new Date(postA.frontMatter.date) > new Date(postB.frontMatter.date) ? -1 : 1
  )

  return {
    props: {
      posts: sortedPosts
    }
  }
}

const Home: React.FC<Props> = ({ posts }) => {
  return (
    <div className='my-8'>
      <div className='grid grid-cols-3 gap-4'>
        {posts.map(post => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}

export default Home
