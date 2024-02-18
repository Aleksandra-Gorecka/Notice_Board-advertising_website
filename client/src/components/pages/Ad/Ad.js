import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAdById } from "../../../redux/adsRedux";
import { Navigate } from "react-router-dom";
import { Card, Col, Button, Modal } from 'react-bootstrap';
import styles from './Ad.module.scss';
import { IMGS_URL } from "../../../config";
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useState } from "react";
import { API_URL } from "../../../config";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAds } from "../../../redux/adsRedux";
import { getLoggedUser } from "../../../redux/usersRedux";


const Ad = () =>{

    const { id } = useParams();
	const adData = useSelector(state => getAdById(state, id));
    const loggedUser = useSelector(getLoggedUser);

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const deleteAd = e => {
        e.preventDefault();

        const options = {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        fetch(`${API_URL}/api/ads/${id}`, options)
            .then(() => {
                dispatch(fetchAds());
                handleClose();
			    navigate('/');
            });
    };

    if (!adData) return <Navigate to={'/'} />;
    return (
        <section>
			<div className="d-flex justify-content-center">
				<Col className="py-4 col-12 col-sm-6 col-lg-6">
					<Card>
						<Card.Title className="text-center p-2">{adData.title}</Card.Title>
						<Card.Img
							className={styles.carImg}
							variant="top"
							src={IMGS_URL + adData.photo}
						/>
						<Card.Body>
							<p>
								<b>Location: </b>
								{adData.location}
							</p>
							<p>
								<b>Price: </b>
								{adData.price}$
							</p>
							<div>
								<b>Description:</b> <br />
								<p className={styles.adDescribtion}>{adData.description}</p>
							</div>
							<p className={styles.adDate}>
								<i>Published: {format(adData.publicationDate, 'dd.MM.yyyy HH:mm:ss')}</i>
							</p>
							<h5>Seller info</h5>
							<div className={styles.seller}>
								<img
									src={IMGS_URL + adData.user.avatar}
									alt="user avatar"
									className="me-1"></img>
								<p> {adData.user.login}</p>
							</div>
							<p>Phone number: {adData.user.phoneNumber}</p>

                            {loggedUser?.login === adData.user.login && (
                                <div className="d-flex justify-content-between">
									<Link to={`/ad/edit/${id}`}>
										<Button variant="outline-success m-1">
                                            Edit ad
                                        </Button>
									</Link>
									<Button onClick={handleShow} variant="outline-danger m-1">
										Delete
									</Button>
								</div>
                            )}
						</Card.Body>
					</Card>
				</Col>
			</div>

            <Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Are you sure?</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>
						This operation will completely remove this ad from the app.
						<br /> Are you sure you want to do that?
					</p>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={handleClose} variant="secondary">
						Cancel
					</Button>
					<Button onClick={deleteAd} variant="danger" className="shadow-none" >
						Remove Ad
					</Button>
				</Modal.Footer>
			</Modal>

			
        </section>
    )
}

export default Ad;