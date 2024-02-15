import { getAllAds } from "../../../redux/adsRedux";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import AdCard from "../AdCart/AdCart";

const AdsList = () =>{

    const ads = useSelector(getAllAds);
    console.log('Ads: ', ads);

    return (
        <section>
            {ads.length < 1 && 
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            }
            {ads.map(ad => (
                <AdCard key={ ad._id } title={ ad.title } location={ ad.location } photo={ ad.photo} id={ ad._id} />
            ))}
        </section>
    )
}

export default AdsList;