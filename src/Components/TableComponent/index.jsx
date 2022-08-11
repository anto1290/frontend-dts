import { Badge } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'

const TableComponent = ({ data, handlerUpdate, handlerDelete, handlerDone }) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Judul</th>
                    <th>desc</th>
                    <th>progres</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.title}</td>
                                <td>{item.desciption}</td>
                                <td>{item.is_done ? <Badge pill bg="success">
                                    final
                                </Badge> : <Badge pill bg="danger">
                                    in progress
                                </Badge>}</td>
                                <td>
                                    <button onClick={() => handlerUpdate(item.id)} className="btn btn-primary">Edit</button>
                                    {' '}
                                    <button onClick={() => handlerDelete(item.id)} className="btn btn-danger">Delete</button>
                                    {' '}
                                    <button onClick={() => handlerDone(item.id)} className="btn btn-success">Done</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    )
}

export default TableComponent