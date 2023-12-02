'use client'
import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { handleLoginAntd } from '@/app/login/actions';


type FieldType = {
    username?: string;
    password?: string;
};

const LoginForm = () => {
    const [isSubmit, setIsSubmit] = useState(false)
    const onFinish = async (values: any) => {
        setIsSubmit(true)
        const res = await handleLoginAntd(values)
        if (res?.data) {
            message.success('Login successfully')
        } else {
            message.error('Login fail')
        }
        setIsSubmit(false)
    };
    return (<Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
    >
        <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
        >
            <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={isSubmit}>
                Submit
            </Button>
        </Form.Item>
    </Form>)
};

export default LoginForm;