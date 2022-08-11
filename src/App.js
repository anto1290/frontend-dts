
import './App.css';
import HeaderComponent from './Components/Header';
import TableComponent from './Components/TableComponent';
import FooterComponent from './Components/Footer';
import { Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ModalComponent } from './Components/Modal';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function App() {
  const MySwal = withReactContent(Swal)
  const [data, setData] = useState([]);
  const [id, setId] = useState('');
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const handleClose = () => setShow(false);
  const handleCloseEdit = () => setShowEdit(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isDone, setIsDone] = useState(false);
  const handlerUpdate = (id) => {
    setShowEdit(true);
    setId(id);
    axios.get(`http://localhost:5000/api/list/${id}`)
      .then(res => res.data.list)
      .then(data => {
        setTitle(data.title);
        setDescription(data.desciption);
        setIsDone(data.is_done);
      }).catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
    axios.get('http://localhost:5000/api/list')
      .then(res => {
        setData(res.data.lists);
      }
      )
  }, [])
  const handlerDelete = (id) => {
    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        axios.delete(`http://localhost:5000/api/list/${id}`)
          .then(res => {
            MySwal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            setData(data.filter(item => item.id !== id))
          }).catch(err => {
            MySwal.fire(
              'Error!',
              'Your file has not been deleted.',
              'error'
            )
          }
          )
      }
    })
  }
  const handlerDone = (id) => {
    axios.put(`http://localhost:5000/api/list/${id}`, {
      is_done: true
    }).then(res => {
      console.log(res)
      axios.get('http://localhost:5000/api/list')
        .then(res => {
          setData(res.data.lists);
        }
        )

    }
    )
  }

  const createHandler = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/list', {
      'title': title,
      'desciption': description,
      'is_done': isDone
    })
      .then(res => {
        setData([...data, res.data.list]);

        setTitle('');
        setDescription('');
        setIsDone(false);

        setShow(false);
      }
      )
  }
  const updateHandler = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/list/${id}`, {
      'title': title,
      'desciption': description,
      'is_done': isDone
    })
      .then(res => {
        console.log(res);
        axios.get('http://localhost:5000/api/list')
          .then(res => {
            setData(res.data.lists);
          }
          )
        setId('');
        setTitle('');
        setDescription('');
        setIsDone(false);
        setShowEdit(false);
      }
      )
  }
  return (
    <div className="App">
      <HeaderComponent />
      <Container style={{ height: '100vw' }}>
        <Row className='mt-5 mb-4 mr-0 '>
          <Col md="2">
            <button type="button" className="btn btn-primary " onClick={() => setShow(true)} >Add</button>
          </Col>
        </Row>
        <Row>
          <TableComponent data={data} handlerUpdate={handlerUpdate} handlerDelete={handlerDelete} handlerDone={handlerDone} />
        </Row>
      </Container>
      <FooterComponent />

      <ModalComponent title="Create Data" show={show} handleClose={handleClose} >
        <Form onSubmit={createHandler}>
          <FloatingLabel
            controlId="title"
            label="Title"
            className="mb-3"
          >
            <Form.Control type="text" placeholder="judul to do list" value={title} onChange={(e) => setTitle(e.target.value)} />
          </FloatingLabel>
          <FloatingLabel
            controlId="description"
            label="Description"
            className="mb-3"
          >
            <Form.Control as="textarea" placeholder="Leave a description here" value={description} onChange={(e) => setDescription(e.target.value)} />
          </FloatingLabel>
          <Form.Check
            type="switch"
            id="custom-switch"
            name='progress'
            label="Progress active"
            value={isDone}
            onChange={(e) => setIsDone(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">Submit</button>
        </Form>
      </ModalComponent>
      <ModalComponent title="Update Data" show={showEdit} handleClose={handleCloseEdit} >
        <Form onSubmit={updateHandler}>
          <input type="hidden" value={id} />
          <FloatingLabel
            controlId="title"
            label="Title"
            className="mb-3"
          >
            <Form.Control type="text" placeholder="judul to do list" value={title} onChange={(e) => setTitle(e.target.value)} />
          </FloatingLabel>
          <FloatingLabel
            controlId="description"
            label="Description"
            className="mb-3"
          >
            <Form.Control as="textarea" placeholder="Leave a description here" value={description} onChange={(e) => setDescription(e.target.value)} />
          </FloatingLabel>
          <Form.Check
            type="switch"
            id="custom-switch"
            name='progress'
            label="Progress active"
            value={isDone}
            onChange={(e) => setIsDone(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">Submit</button>
        </Form>
      </ModalComponent>
    </div>
  );
}

export default App;
