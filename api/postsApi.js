'use server'

// Get All Posts
export const getPosts = async ({ page, limit }) => {
  const res = await fetch(
    `http://localhost:11000/api/posts?page=${page}&limit=${limit}`,
    {
      next: {
        tags: ['posts'],
      },
    }
  )
  return await res.json()
}
