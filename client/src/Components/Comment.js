import React, { useState } from 'react'
import { Form, Button } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { createComment } from "../redux/actions/entryActions"


function Comment({ entry }) {

    const [comments, setComments] = useState(entry?.comments)
    const [comment, setComment] = useState('')


    const dispatch = useDispatch()

    const handleClick = async () => {
        const finalComment = comment
       const newComments = await dispatch(createComment(finalComment,entry._id))
       setComments(newComments)
       setComment('')

    }
    return (
        <>
                <Form>
                <Form.Group className='mt-5'>
                    <h1 className='text-center'>Comment</h1>
                </Form.Group>
                <Form.Group className='mt-3'>
                    <Form.Label>Content</Form.Label>
                    <Form.Control onChange={(e)=>setComment(e.target.value)} name="comment" type="text"></Form.Control>
                </Form.Group>
                <Button onClick={handleClick} className='w-100 my-5' type='submit'>Submit</Button>
            </Form>
        </>
    )
}

export default Comment