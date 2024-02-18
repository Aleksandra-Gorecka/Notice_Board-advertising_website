import AdForm from "../../features/AdForm/AdForm";
import { useState } from 'react';
import { API_URL } from '../../../config';
import { useNavigate } from 'react-router-dom';

const AdAdd = () =>{

	const navigate = useNavigate();

    const [user, setUser] = useState(null);
    //console.log(user)

    fetch(`${API_URL}/auth/user`)
		.then(res => {
			//console.log(res);
			if (res.status === 200) {
				return setUser('loggedUser');
			} else {
				setUser(null);
				throw new Error('Failed');
			}
		})

		.catch(e => {
			console.log(e);
		});

    return (
        <section>
            {user !== null ? (
				<AdForm />
			) : (
				<p className="text-center my-5">You are not authorised</p>
			)}
        </section>
    )
}

export default AdAdd;