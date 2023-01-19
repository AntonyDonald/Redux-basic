import React, { useEffect, useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap'
import Api from '../api/Api';
import {AiFillEdit , AiFillDelete} from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import { addUser ,editUser , deleteUser } from '../redux/reducers/userReducer';
import { Link } from 'react-router-dom';

const Content = () => {
  const [names , setNames] = useState("");
  const [itemId , setItemId] = useState(0);

  const {userList} = useSelector((state) => state.userReducer )

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.get('/user')
        dispatch(addUser(response.data))
      } catch (err) {
        console.log(err.message);
      }
      
    }
    fetchData()
  },[])

  const handleSubmit = async  (e) => {
    e.preventDefault();
    if (itemId === 0) {
      const id = userList.length ? userList[userList.length - 1].id + 1 : 1;
  const data = {id : id , name : names}
  try {
    const response = await Api.post('/user' , data);
    dispatch(addUser([...userList , data]))
  } catch (err) {
    console.log(err.message);
  }
    }else {
      const data = {id : itemId , name : names}
      try {
        const response = await Api.put(`/user/${itemId}` , data);
        dispatch(editUser(data))
      } catch (err) {
        console.log(err.message);
      }
    }
  
  setNames("")
  setItemId(0);
  }
  const handleEdit = (id , name) => {
    setItemId(id);
    setNames(name)
  }
  const handleDelete = async (id) => {
    // const filtered = userList.filter((data) => data.id !== id);
    try {
      await Api.delete(`/user/${id}`)
      dispatch(deleteUser(id))
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-12'>
            <Form onSubmit={handleSubmit}>
              <Form.Control 
              type='text'
              placeholder='enter here...'
              required
              value={names}
              onChange = {(e) => setNames(e.target.value)}
              />
              <Button type='submit'>Submit</Button>
            </Form>
        </div>
        <div className='col-md-12'> 
         <Table>
          <thead>
            <tr>
              <th>S.no</th>
              <th>Name</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              userList.map((obj , index) =>
              <tr key={obj.id}>
                <td>{index + 1}</td>
                <td>{obj.name}</td>
                <td>
                  <AiFillEdit
                  role='button'
                  tabIndex='0'
                  onClick={() => handleEdit(obj.id,obj.name)}
                  />
                </td>
                <td>
                  <AiFillDelete 
                   role='button'
                   tabIndex='0'
                   onClick={() => handleDelete(obj.id)}
                  />
                </td>
              </tr>
              )
            }
          </tbody>
         </Table>
        </div>
        <div>
          <Link to='/product'>
          <Button>Go to Product</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Content
