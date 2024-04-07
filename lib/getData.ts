import db from '@/drizzle'

// Get User By ID
export const getUserById = async (id: string) => {
  try {
    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, id),
    })

    return user
  } catch (error) {
    return null
  }
}

// Get User By Email
export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    })

    return user
  } catch (error) {
    return null
  }
}
