import { SubmitButton } from "@/components/login/login.button"

export default function Home() {
  const handleLogin = async (formData: FormData) => {
    'use server'
    console.log('username', formData.get('username'), 'password', formData.get('password'))
    await new Promise(resolve => setTimeout(resolve, 5000))
    // mutate data
    // revalidate cache
  }
  return (
    <div>
      <h2>HTML Forms</h2>

      <form action={handleLogin}>
        <label>username:</label><br />
        <input type="text" name="username" /><br />
        <label >password:</label><br />
        <input type="text" name="password" /><br /><br />
        <SubmitButton />
      </form>
    </div>
  )
}
