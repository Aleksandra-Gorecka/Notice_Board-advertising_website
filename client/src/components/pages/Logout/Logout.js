import { useEffect } from 'react';
import { API_URL } from '../../../config';
import { logOut } from '../../../redux/usersRedux';
import { useDispatch } from 'react-redux';

const Logout = () =>{

    const dispatch = useDispatch();

    useEffect(() => {
        const options = {
            method: 'DELETE',
        }

        fetch(`${API_URL}/logout`, options)
        .then (() => {
            dispatch(logOut());
        })
    }, [dispatch])


    return <p className="text-center my-5">Now you are logged out, see you soon!</p>
}

export default Logout;