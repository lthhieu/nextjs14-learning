'use server'
import { revalidateTag } from 'next/cache'
export const handleCreateUser = async (formData: INewUser, access_token: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const { name, email, password, age, gender, address, role } = formData
    const response = await fetch('http://localhost:8000/api/v1/users', {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${access_token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, age, gender, address, role })
    })
    revalidateTag('fetch-users-again')
    return await response.json()
}
export const handleUpdateUser = async (formData: IUserPaginate, access_token: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const { name, email, age, gender, address, role, _id } = formData
    const response = await fetch('http://localhost:8000/api/v1/users', {
        method: "PATCH",
        headers: {
            'Authorization': `Bearer ${access_token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, _id, age, gender, address, role })
    })
    revalidateTag('fetch-users-again')
    return await response.json()
}
export const handleDeleteUser = async (_id: string, access_token: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const response = await fetch(`http://localhost:8000/api/v1/users/${_id}`, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${access_token}`, // notice the Bearer before your token
        },
    })
    revalidateTag('fetch-users-again')
    return await response.json()
}