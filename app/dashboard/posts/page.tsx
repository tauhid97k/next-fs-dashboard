import Link from 'next/link'
import Heading from '@/components/dashboard/heading'
import { Button } from '@/components/ui/button'
import { postsColumns } from './columns'
import { DataTable } from '@/components/ui/data-table'

const PostsList = async ({
  searchParams,
}: {
  searchParams: { page: string; limit: string }
}) => {
  const page = searchParams.page ? Number(searchParams.page) : 1
  const limit = searchParams.limit ? Number(searchParams.limit) : 20

  const response = await fetch(
    `http://localhost:11000/api/posts?page=${page}&limit=${limit}`,
    {
      next: {
        tags: ['posts'],
      },
    }
  )
  const posts = await response.json()

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
