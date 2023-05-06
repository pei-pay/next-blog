import { Post } from '@/pages'
import Link from 'next/link'
import Image from 'next/image'

type Props = {
  post: Post
}

const PostCard: React.FC<Props> = ({ post }) => {
  return (
    <Link href={`/posts/${post.slug}`}>
      <div className='border rounded-lg'>
        <Image
          src={`/${post.frontMatter.image}`}
          width={300}
          height={200}
          alt={post.frontMatter.title}
          className='post-card-image'
        />
      </div>
      <div className='px-2 py-4'>
        <h1 className='font-bold text-lg'>{post.frontMatter.title}</h1>
        <span>{post.frontMatter.date}</span>
      </div>
    </Link>
  )
}

export default PostCard
