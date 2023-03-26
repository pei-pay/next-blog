import fs from 'fs'
import Link from 'next/link'
import matter from 'gray-matter'

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

export default function Home({ posts }) {
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
