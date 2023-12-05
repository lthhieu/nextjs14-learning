'use client'
import React, { useState } from 'react';
import { Button, Popconfirm, Space, Table, Tag, Tooltip, message, notification } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { UserAddOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import UserModal from './modal.user';
import { handleDeleteUser } from '@/app/crud/actions';

interface IProps {
    data: IBackendResponse<IPaginate<IUserPaginate>>,
    ACCESS_TOKEN: string
}
const TableUser = (props: IProps) => {
    const [status, setStatus] = useState('')
    const [isModalOpen, SetIsModalOpen] = useState(false)
    const [dataUpdate, setDataUpdate] = useState<null | IUserPaginate>(null)
    let { data, ACCESS_TOKEN } = props
    const searchParams = useSearchParams()
    const page = Number(searchParams.get('page')) || 1 // 1
    const limit = Number(searchParams.get('limit')) || 5 // 5
    const pathname = usePathname() // /crud
    const { replace } = useRouter();
    const confirm = async (_id: string) => {
        const result = await handleDeleteUser(_id, ACCESS_TOKEN)
        if (result.data) {
            message.success("Successfully!")
        } else {
            notification.error({
                message: result.error,
                description: result.message
            })
        }
    }

    const columns: ColumnsType<IUserPaginate> = [
        {
            title: '#',
            dataIndex: '_id',
            render: (value, record, index) => {
                return (<>{((page - 1) * limit) + index + 1}</>)
            }
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            responsive: ['md']
        },
        {
            title: 'Role',
            dataIndex: 'role',
            responsive: ['sm'],
            render: (_, { role }) => (
                <><Tag color={role === 'ADMIN' ? 'green' : 'geekblue'} key={role}>{role}</Tag>
                </>
            ),
        }, {
            title: 'Actions',
            render: (value, record) => {
                return (<div>
                    <Space>
                        <Tooltip title="Edit">
                            <Button style={{ color: '#f57800', border: '1px solid #f57800' }} icon={<EditOutlined />} onClick={() => {
                                handleShowUpdateModal(record)
                            }}></Button>
                        </Tooltip>
                        <Popconfirm
                            title="Delete the user"
                            description={`Are you sure to delete ${record.name} user?`}
                            onConfirm={() => confirm(record._id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button icon={<DeleteOutlined />} danger></Button>
                        </Popconfirm>
                    </Space>
                </div>)
            }
        },
    ]
    const handleOnChangePage = (page: number, pageSize: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page + "");
        params.set('limit', pageSize + '')
        replace(`${pathname}?${params.toString()}`);
    }
    const handleShowCreateModal = () => {
        setStatus("CREATE")
        SetIsModalOpen(true);
    }
    const handleShowUpdateModal = (record: IUserPaginate) => {
        setDataUpdate(record)
        setStatus("UPDATE")
        SetIsModalOpen(true)
    }
    const renderHeader = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Table List Users</span>
                <Button
                    icon={<UserAddOutlined />}
                    type="primary"
                    onClick={() => handleShowCreateModal()}
                >
                    Add new user
                </Button>
            </div>
        )
    }
    return (<>
        <h1>Table</h1>
        <Table title={renderHeader} columns={columns} dataSource={data?.data?.result ?? []} rowKey={'_id'}
            pagination={{
                current: data.data?.meta.current,
                pageSize: data.data?.meta.pageSize,
                total: data.data?.meta.total,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                onChange: (page: number, pageSize: number) => handleOnChangePage(page, pageSize),
                pageSizeOptions: [5, 10],
                showSizeChanger: true,
            }}
        />
        <UserModal
            setStatus={setStatus}
            status={status}
            access_token={ACCESS_TOKEN}
            // getData={getData}
            isModalOpen={isModalOpen}
            SetIsModalOpen={SetIsModalOpen}
            //update info
            setDataUpdate={setDataUpdate}
            dataUpdate={dataUpdate}
        />
    </>)
}
export default TableUser