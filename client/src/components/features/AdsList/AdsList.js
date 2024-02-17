import { getAllAds } from "../../../redux/adsRedux";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import AdCard from "../AdCart/AdCart";

const AdsList = () =>{

    const ads = useSelector(getAllAds);

    return (
        <section>
            {ads.length < 1 && 
                <Spinner animation="border" role="status" className="d-block mx-auto my-3">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            }
            <div className="d-flex flex-wrap justify-content-start p-0 my-4 ms-auto">
                {ads.map(ad => (
                    <AdCard key={ ad._id } title={ ad.title } location={ ad.location } photo={ ad.photo} id={ ad._id} />
                ))}
            </div>
        </section>
    )
}

export default AdsList;