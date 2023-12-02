'use server'
export const handleLoginAntd = async (formData: any) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const res = await fetch(
        "http://localhost:8000/api/v1/auth/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: formData.username,
                password: formData.password
            })
        })
    return await res.json()
}