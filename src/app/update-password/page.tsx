import UpdatePasswordForm from '@/app/update-password/components/UpdatePasswordForm'

export default async function UpdatePasswordPage({searchParams}: {  searchParams: Promise<{ token: string | undefined }>
}) {
  
  const token = (await searchParams).token

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <UpdatePasswordForm token={token} />
    </div>
  )
}

