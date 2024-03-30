export type Posts = {
  id: number
  user_id: number
  title: string
  slug: string
  summary: string
  description: string
  thumbnail: string
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  created_at: Date
  updated_at: Date
}
