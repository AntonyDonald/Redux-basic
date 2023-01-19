import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, FormGroup, Row, Table } from 'react-bootstrap';
import { AiFillBook } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Api from '../api/Api';
import { addProduct } from '../redux/reducers/productReducer';

const Product = () => {

    const { userList } = useSelector((state) => state.userReducer);
    const { productList } = useSelector((state) => state.productReducer);
    const dispatch = useDispatch();

    const [openBook, setopenBook] = useState(0);
    const [value, setValue] = useState("");
    const [itemId, setItemId] = useState(0);
    const [selectedName, setSelectedName] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Api.get('/product')
                dispatch(addProduct(response.data))
            } catch (err) {
                console.log(err.message);
            }
        }
        fetchData()
    }, [])

    const handleBook = (id, name) => {
        setopenBook(1);
        setItemId(id);
        setSelectedName(name)
    }
    const handleAdd = async () => {
           const data = {name : selectedName , product : value }
           try {
            const response = await Api.post('/product' , data)
            dispatch(addProduct([...productList , data]))
           } catch (err) {
            console.log(err.message);
           }
        setValue("")
        setopenBook(0)
    }
    return (
        <Container>
            <Row>
                {
                    openBook === 0 ?
                        <div>
                            <Col md={6}>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>S.no</th>
                                            <th>Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            userList.map((data, index) =>
                                                <tr key={data.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{data.name}</td>
                                                    <td>
                                                        <AiFillBook
                                                            role='button'
                                                            tabIndex='0'
                                                            onClick={() => handleBook(data.id, data.name)}
                                                        />
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </Table>
                            </Col>
                        </div>
                        :
                        null
                }

                {
                    openBook === 1 ?
                        <div>
                            <Form>
                                <FormGroup>
                                    <Form.Label>Product Name</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Product'
                                        value={value}
                                        onChange={(e) => setValue(e.target.value)}
                                    />
                                </FormGroup>
                            </Form>
                            <Button onClick={() => handleAdd()}>Add</Button>
                            <Button onClick={() => setopenBook(0)}>Cancel</Button>
                        </div>
                        :
                        null

                }


                <div>
                    <Link to='/'>
                        <Button>Go to User</Button>
                    </Link>
                </div>
            </Row>
        </Container>
    )
}

export default Product
