import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';


function Feed({ cityName }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onFormSubmit = async (feedData) => {
        feedData.cityName = cityName;
        let response=await axios.post('/feed-api/add-feed',feedData);
        getData();
        console.log(response);
        handleClose();
    };

    const getData = async()=>{
        let response = await axios.get(`/feed-api/getfeeds/${cityName}`);
        console.log(response);
    }

    useEffect(async ()=>{
        getData();
    },[])

    return (
        <div style={{ width: "450px", backgroundColor: "rgba(255, 252, 252, 0.9 )", height: "425px" }} className="rounded text-center" >
            <div className="applabel"> FEED </div>
            <Button variant="dark" onClick={handleShow}>
                Add Your Feed
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Your Feed</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(onFormSubmit)}>
                        <Form.Group className='mt-3 mb-3'>
                            <Form.Label >Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Username"
                                {...register("username", { required: true })}
                            />
                            {errors.username && (
                                <p className='text-danger' >*Username is required</p>
                            )}
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Feed</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Your Feed'
                                {...register("message", { required: true })}
                            />
                            {errors.password && (
                                <p className='text-danger'>*message is required</p>
                            )}
                        </Form.Group>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                       Submit
                    </Button>
                </Modal.Footer>
                </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Feed;