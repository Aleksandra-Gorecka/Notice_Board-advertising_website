import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { getAdById } from "../../../redux/adsRedux";
import { getLoggedUser } from "../../../redux/usersRedux";
import { Navigate } from "react-router-dom";
import { useState } from 'react';
import { Alert, Form, Button, Spinner } from 'react-bootstrap';
import { API_URL } from '../../../config';
import { useNavigate } from 'react-router-dom';
import { fetchAds } from '../../../redux/adsRedux';

const AdEditForm = () =>{

    const { id } = useParams();
    const adData = useSelector(state => getAdById(state, id));
    const loggedUser = useSelector(getLoggedUser);

    const [title, setTitle] = useState(adData.title || '');
	const [description, setDescription] = useState(adData.description || '');
	const [price, setPrice] = useState(adData.price || '');
	const [location, setLocation] = useState(adData.location || '');
	const [photo, setPhoto] = useState(adData.photo || null);
    const [status, setStatus] = useState(''); // null, 'loading', 'success', 'serverError', 'clientError'

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = e => {
		e.preventDefault();

        const fd = new FormData();
		fd.append('title', title);
		fd.append('description', description);
		fd.append('price', price);
		fd.append('location', location);
		fd.append('photo', photo);
		fd.append('user', loggedUser.id);

        const options = {
			method: 'PUT',
			body: fd,
		};

        setStatus('loading');
        fetch(`${API_URL}/api/ads/${id}`, options)
			.then(res => {
				if (res.status === 201) {
                    setStatus('success');
                    setTimeout(() => {
						navigate('/');
					}, 2000);
					dispatch(fetchAds());
                } else if (res.status === 400) {
					setStatus('clientError');
			    } else {
					setStatus('serverError');
				}
            })
			.catch(err => {
                console.log('check');
				setStatus('serverError');
				console.error(err);
			});
    }


    if (loggedUser?.login !== adData.user.login || !adData) return <Navigate to={'/'} />;
    if (status === 'success') {
        return ( 
            <div>
                <Alert variant="success">
                    <Alert.Heading>Success!</Alert.Heading>
                    <p>Your advertisment has been successfully edited!</p>
                </Alert>
                <Spinner animation="border" role="status" className="d-block mx-auto my-3">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
            </div>
        )
    }

    return (
        <div style={{ width: '70%' }} className="m-auto">
            <Form onSubmit={handleSubmit}>
			    {status === 'clientError' && (
				    <Alert variant="danger">
					    <Alert.Heading>Not enough data or data are incorrect</Alert.Heading>
					    <p>If you want to change image. Photo has to be one of this type of
						    file: *.jpg, *.jpeg, *.gif, *.png.</p>
				    </Alert>
			    )}
			    {status === 'serverError' && (
				    <Alert variant="danger">
					    <Alert.Heading>Something went wrong...</Alert.Heading>
					    <p>Unexpected error... Try again!</p>
				    </Alert>
			    )}
                {status === 'loading' && (
					<Spinner animation="border" role="status">
						<span className="visually-hidden">Loading...</span>
					</Spinner>
				)}
            
				<Form.Group className="mb-3" controlId="formTitle">
					<Form.Label>Title</Form.Label>
					<Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter title"/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formPassword">
					<Form.Label>Content of the ad</Form.Label>
					<Form.Control as="textarea" value={description} onChange={e => setDescription(e.target.value)}/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formPrice">
					<Form.Label>Price</Form.Label>
					<Form.Control type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price"/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formLocation">
					<Form.Label>Location</Form.Label>
					<Form.Control type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="Location"/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formPhoto">
					<Form.Label>Photo</Form.Label>
					<Form.Control type="file" onChange={e => setPhoto(e.target.files[0])}/>
				</Form.Group>

				<Button variant="warning" type="submit">
				    Submit
				</Button>
            </Form>
		</div>
    )
}

export default AdEditForm;