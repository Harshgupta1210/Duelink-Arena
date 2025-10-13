import { redirect } from 'next/navigation'

export default function HomePage() {
  // For this application, the landing page will redirect to the login page.
  // In a real-world scenario, this could be a marketing landing page.
  redirect('/login')
}
