import TableUser from "@/components/crud/table.user"

const CrudPage = async ({
    params,
    searchParams,
}: {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}) => {
    const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjUzZjk4NmExNDYwYmMyODk3ZTJhZWViIiwiZW1haWwiOiJob2lkYW5pdEBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIEjhu49pIETDom4gSVQiLCJ0eXBlIjoiU1lTVEVNIiwicm9sZSI6IkFETUlOIiwiZ2VuZGVyIjoiTUFMRSIsImFnZSI6OTYsImlhdCI6MTcwMTU2OTk1OSwiZXhwIjoxNzg3OTY5OTU5fQ.7dHUMUS0g5uhBwKL2rtM30CQEirF7AvJub_X3cA2xDU'
    const LIMIT = Number(searchParams.limit) || 5
    const PAGE = Number(searchParams.page) || 1
    //call api
    const res = await fetch(
        `http://localhost:8000/api/v1/users?current=${PAGE}&pageSize=${LIMIT}&sort=-updatedAt`,
        {
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`
            },
            next: { tags: ['fetch-users-again'] }
        })

    const raw = await res.json();
    return (<>
        <h2>Crud page</h2>
        <TableUser data={raw} ACCESS_TOKEN={ACCESS_TOKEN} />
    </>)
}
export default CrudPage