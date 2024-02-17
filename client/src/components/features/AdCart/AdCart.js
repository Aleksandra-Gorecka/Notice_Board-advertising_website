import styles from './AdCard.module.scss';
import { NavLink } from 'react-router-dom';
import { IMGS_URL } from '../../../config';
import { Card, Button } from 'react-bootstrap';

const AdCard = ({ title, location, photo, id }) => {
  return (
    <Card className="col-lg-4 col-sm-12 col-md-8 mx-3 py-2 my-2" style={{ maxWidth: '18rem' }}>
      <Card.Img variant="top"  className={styles.cardImage} src={IMGS_URL + photo } />
      <Card.Body>
        <Card.Title>{ title }</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{ location }</Card.Subtitle>
        <NavLink to={`/ad/${id}`} >
          <Button variant="secondary" >Read more...</Button>
        </NavLink>
      </Card.Body>
    </Card>
   );
}
 
export default AdCard;