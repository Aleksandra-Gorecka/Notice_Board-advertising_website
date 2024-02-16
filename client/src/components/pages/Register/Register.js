import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import { API_URL } from '../../../config';

const Register = () =>{

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [status, setStatus] = useState(null); // null. 'loading', 'success', 'serverError', 'clientError', 'loginError'


    const handleSubmit = e => {
        e.preventDefault();
        console.log(login, password, phoneNumber, avatar);

        const fd = new FormData();
        fd.append('login', login);
        fd.append('password', password);
        fd.append('phoneNumber', phoneNumber);
        fd.append('avatar', avatar);

        const options = {
            method: 'POST',
            body: fd,
        };

        setStatus('loading');
        fetch(`${API_URL}/auth/register`, options)
            .then(res => {
                if (res.status === 201) {
                    setStatus('success');
                } else if (res.status === 400){
                    setStatus('clientError');
                } else if (res.status === 409){
                    setStatus('loginError');
                } else {
                    setStatus('serverError');
                }
            })
            .catch(err => {
                setStatus('serverError');
            })
    }

    return (
        <Form className="col-12 col-xl-6 col-md-6 col-sm-6 mx-auto" onSubmit={handleSubmit}>

            <h1 className="my-4 text-center">Sign up</h1>

            {status === "success" && (
                <Alert variant="success">
                    <Alert.Heading>Success!</Alert.Heading>
                    <p>You have been successfully registered! You can now log in...</p>
                </Alert>
            )}

            {status === "serverError" && (
                <Alert variant="danger">
                    <Alert.Heading>Something went wrong...</Alert.Heading>
                    <p>Unexpected error... Try again!</p>
                </Alert>
            )}

            {status === "clientError" && (
                <Alert variant="danger">
                    <Alert.Heading>No enough data</Alert.Heading>
                    <p>You have to fill all the fields.</p>
                </Alert>
            )}

            {status === "loginError" && (
                <Alert variant="warning">
                    <Alert.Heading>Login already in use</Alert.Heading>
                    <p>You have to use other login.</p>
                </Alert>
            )}

            {status === "loading" && (
                <Spinner animation="border" role="status" className="d-block mx-auto my-3">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )}

            <Form.Group className="mb-3 d-flex align-items-center" controlId="formLogin">
                <Form.Label className="my-0" style={{ flex: '1 0 0' }}>Login</Form.Label>
                <Form.Control type="text" style={{ flex: '3 0 0' }} className="ms-2 shadow-none" value={login} onChange={e => setLogin(e.target.value)} placeholder="Enter login" />
            </Form.Group>

            <Form.Group className="mb-3 d-flex align-items-center" controlId="formPassword">
                <Form.Label className="my-0" style={{ flex: '1 0 0' }}>Password</Form.Label>
                <Form.Control type="password" style={{ flex: '3 0 0' }} className="ms-2 shadow-none" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
            </Form.Group>

            <Form.Group className="mb-3 d-flex align-items-center" controlId="formphoneNumber">
                <Form.Label className="my-0" style={{ flex: '1 0 0' }}>Phone Number</Form.Label>
                <Form.Control type="tel" style={{ flex: '3 0 0' }} className="ms-2 shadow-none" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} placeholder="Phone Number" />
            </Form.Group>

            <Form.Group className="mb-3 d-flex align-items-center" controlId="formavatar">
                <Form.Label className="my-0" style={{ flex: '1 0 0' }}>Avatar</Form.Label>
                <Form.Control type="file" style={{ flex: '3 0 0' }} className="ms-2 shadow-none" onChange={e=> setAvatar(e.target.files[0])}/>
            </Form.Group>

            <Button className="w-100" variant="success" type="submit">
                Sign up
            </Button>

        </Form>
    );
};

export default Register;