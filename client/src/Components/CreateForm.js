import React, { useState } from 'react'
import ReactFileBase64 from "react-file-base64"
import { Form, Button } from "react-bootstrap"
import {useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"
import {createEntry} from "../redux/actions/entryActions"


function CreateForm() {

  const [entryData, setEntryData] = useState({
    title: "",
    content: "",
    image: ""
  })

  const navigate = useNavigate()

  const dispatch =useDispatch()

  return (
    <>
      <Form id='form' onSubmit={(e) => {
        e.preventDefault()
        dispatch(createEntry(entryData))
        navigate("/")
        
      }}>
        <Form.Group className='mt-5'>
          <h1>Create an Entry</h1>
        </Form.Group>
        <Form.Group className='mt-3'>
          <Form.Label>Zingo Title</Form.Label>
          <Form.Control name="title" type="text" onChange={(e)=>{setEntryData({...entryData,title:e.target.value})}}></Form.Control>
        </Form.Group>
        <Form.Group className='mt-3'>
          <Form.Label>Zingo Content</Form.Label>
          <Form.Control name="content" type="text" as="textarea" rows={3} onChange={(e)=>{setEntryData({...entryData,content:e.target.value})}}></Form.Control>
        </Form.Group>
        <Form.Group className='mt-3'>
          <ReactFileBase64 type="file" multiple={false} onDone={({base64}) => {setEntryData({...entryData,image:base64})}}></ReactFileBase64>
        </Form.Group>
        <Button className='w-100 mt-3' type='submit'>Submit</Button>
      </Form>
    </>
  )
}

export default CreateForm