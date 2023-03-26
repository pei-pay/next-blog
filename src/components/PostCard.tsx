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
        {/* FIXME: tailwindに邪魔されてwidthとheightが当たってない */}
        <Image
          src={`/${post.frontMatter.image}`}
          width={1200}
          height={700}
          alt={post.frontMatter.title}
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
