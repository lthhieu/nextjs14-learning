'use client'
import { SubmitButton } from "@/components/login/login.button"
import { handleLogin } from "./actions"
import { useFormState } from 'react-dom'
import { useEffect } from "react"
import { message } from 'antd';

export default function Home() {
  const [state, formAction] = useFormState(handleLogin, {})
  useEffect(() => {
    if (state?.data?.access_token) {
      message.success('Login successfully')
    } else {
      message.error('Login fail')
    }
  }, [state])
  return (
    <div>
      <h2>HTML Forms</h2>

      <form action={formAction}>
        <label>username:</label><br />
        <input type="text" name="username" /><br />
        <label >password:</label><br />
        <input type="text" name="password" /><br /><br />
        <SubmitButton />
      </form>
      {JSON.stringify(state)}
    </div>
  )
}
