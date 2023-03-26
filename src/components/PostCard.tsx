import { Post } from '@/pages'
import Link from 'next/link'

type Props = {
  post: Post
}

const PostCard: React.FC<Props> = ({ post }) => {
  return (
    <Link href={`/post/${post.slug}`}>
      <a>{post.frontMatter.title}</a>
    </Link>
  )
}

export default PostCard
