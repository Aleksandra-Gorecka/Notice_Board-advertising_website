import { getAllAds } from "../../../redux/adsRedux";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import AdCard from "../AdCart/AdCart";

const AdsList = () =>{

    const ads = useSelector(getAllAds);
    //console.log(ads);

    //Sort ads array by publictionDate
    ads.sort((a, b) => new Date(a.publicationDate) - new Date(b.publicationDate));

    return (
        <section>
            {ads.length < 1 && 
                <Spinner animation="border" role="status" className="d-block mx-auto my-3">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            }
            <Row className="d-flex flex-wrap justify-content-center p-0 my-4 ms-auto">
                {ads.map(ad => (
                    <AdCard key={ ad._id } title={ ad.title } location={ ad.location } photo={ ad.photo} id={ ad._id} />
                ))}
            </Row>
        </section>
    )
}

export default AdsList;