import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getPosts } from '@/api/postsApi'
import { postsColumns } from './columns'
import { DataTable } from '@/components/ui/data-table'
import Heading from '@/components/dashboard/heading'

const PostsList = async ({ searchParams }) => {
  const page = searchParams.page ? Number(searchParams.page) : 1
  const limit = searchParams.limit ? Number(searchParams.limit) : 20

  const posts = await getPosts({ page, limit })

  return (
    <>
      <div className="flex gap-4 justify-between items-center mb-5">
        <Heading title="All Posts" />
        <Button asChild>
          <Link href="/dashboard/posts/create">Create New</Link>
        </Button>
      </div>
      <DataTable
        columns={postsColumns}
        data={posts.data}
        page={page}
        limit={limit}
        total={posts.meta.total}
      />
    </>
  )
}

export default PostsList
