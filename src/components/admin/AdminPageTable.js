import React from 'react'
import { Table } from 'reactstrap'

const AdminPageTable = ({ data }) => {
    return (
        <Table bordered>
            <thead>
                <tr>
                    <th>{data[0]}</th>
                    <th>Header 2</th>
                    {/* Add more header columns as needed */}
                </tr>
            </thead>
            <tbody>
                {data.slice(1).map((item, idx) => (
                    <tr key={idx}>
                        <td>{item}</td>
                    </tr>
                ))}
            </tbody>
        </Table>)
}

export default AdminPageTable