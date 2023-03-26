import fs from 'fs'
import Image from 'next/image'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

export async function getStaticProps({ params }) {
  const file = fs.readFileSync(`posts/${params.slug}.md`, 'utf-8')
  const { data, content } = matter(file)

  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(content)

  return { props: { frontMatter: data, content: result.toString() } }
}

export async function getStaticPaths() {
  const files = fs.readdirSync('posts')
  const paths = files.map(fileName => ({
    params: {
      slug: fileName.replace(/\.md$/, '')
    }
  }))
  return {
    paths,
    fallback: false
  }
}

const Post = ({ frontMatter, content }) => {
  return (
    <div className='prose prose-lg max-w-none'>
      <div className='border'>
        <Image
          src={`/${frontMatter.image}`}
          width={1200}
          height={700}
          alt={frontMatter.title}
        />
      </div>
      <h1 className='mt-12'>{frontMatter.title}</h1>
      <span>{frontMatter.date}</span>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>
  )
}

export default Post
