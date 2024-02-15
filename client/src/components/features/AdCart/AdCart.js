import { NavLink } from 'react-router-dom';
import { IMGS_URL } from '../../../config';
import { Card, Button } from 'react-bootstrap';

const AdCard = ({ title, location, photo, id }) => {
  return ( 
    <Card>
      <Card.Img variant="top"  className="my-2" src={IMGS_URL + photo } />
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