import { getCurrentUserProfileSlug } from '@/lib/actions/car.actions'
import { WebsiteAdmin } from '@/components/features/website-admin'

export default async function WebsitePage() {
  const profileSlug = await getCurrentUserProfileSlug()
  return <WebsiteAdmin profileSlug={profileSlug} />
}
