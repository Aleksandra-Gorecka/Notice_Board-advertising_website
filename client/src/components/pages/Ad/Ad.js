import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAdById } from "../../../redux/adsRedux";
import { Navigate } from "react-router-dom";
import { Card, Col } from 'react-bootstrap';
import styles from './Ad.module.scss';
import { IMGS_URL } from "../../../config";
import { format } from 'date-fns';


const Ad = () =>{

    const { id } = useParams();
	const adData = useSelector(state => getAdById(state, id));

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
						</Card.Body>
					</Card>
				</Col>
			</div>

            

			
        </section>
    )
}

export default Ad;