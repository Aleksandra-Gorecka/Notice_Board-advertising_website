import AdEditForm from "../../features/AdEditForm/AdEditForm";
import { useSelector } from "react-redux";
import { getLoggedUser } from "../../../redux/usersRedux";
import { Navigate } from "react-router-dom";

const AdEdit = () =>{

    const loggedUser = useSelector(getLoggedUser);

	if (!loggedUser ) return <Navigate to={'/'} />;
    return (
        <section>
			<AdEditForm />
        </section>
    )
}

export default AdEdit;