import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Alert, Row, Spinner } from "react-bootstrap";
import { getSearchedAds } from '../../../redux/adsRedux';
import AdCard from '../../features/AdCart/AdCart';

const SearchResults = () =>{

    const { searchPhrase } = useParams();
    const searchedAds = useSelector((state) => getSearchedAds(state, searchPhrase));

    return (
        <section>
            {!searchedAds.length &&
                <Alert>
                    <Alert.Heading>Nothing maches with your search request...</Alert.Heading>
                </Alert> 
            }
            <Row className="d-flex flex-wrap justify-content-center p-0 my-4 ms-auto">
                {searchedAds.map(ad => (
                    <AdCard key={ ad._id } title={ ad.title } location={ ad.location } photo={ ad.photo} id={ ad._id} />
                ))}
            </Row>
        </section>
    )
}

export default SearchResults;