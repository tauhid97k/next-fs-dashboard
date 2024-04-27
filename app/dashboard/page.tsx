import Heading from '@/components/dashboard/heading'
import { auth } from '@/lib/auth'

const DashboardOverviewPage = async () => {
  const session = await auth()

  return (
    <>
      <Heading title="Dashboard" />
      <div>{JSON.stringify(session, null, 2)}</div>
    </>
  )
}

export default DashboardOverviewPage
