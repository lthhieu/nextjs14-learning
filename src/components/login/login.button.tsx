'use client'

import { useFormStatus } from 'react-dom'
import { Button } from 'antd';
export function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <Button type="primary" loading={pending} htmlType='submit'>
            Submit
        </Button>
    )
}