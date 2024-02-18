import AdForm from "../../features/AdForm/AdForm";
import { useSelector } from "react-redux";
import { getLoggedUser } from "../../../redux/usersRedux";
import { Navigate } from "react-router-dom";

const AdAdd = () =>{

	const loggedUser = useSelector(getLoggedUser);

	if (!loggedUser ) return <Navigate to={'/'} />;
    return (
        <section>
			<AdForm />
        </section>
    )
}

export default AdAdd;