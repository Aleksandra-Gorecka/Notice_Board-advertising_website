import { Container } from "react-bootstrap";
import Header from "./components/views/Header/Header";
import Footer from './components/views/Footer/Footer';
import { Routes, Route } from 'react-router-dom';
import Home from "./components/pages/Home/Home";
import Ad from "./components/pages/Ad/Ad";
import AdEdit from "./components/pages/AdEdit/AdEdit";
import AdAdd from "./components/pages/AdAdd/AdAdd";
import AdRemove from "./components/pages/AdRemove/AdRemove";
import Search from "./components/pages/Search/Search";
import Login from "./components/pages/Login/Login";
import Logout from "./components/pages/Logout/Logout";
import Register from "./components/pages/Register/Register";
import NotFound from "./components/pages/NotFound/NotFound";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAds } from "./redux/adsRedux";
import { API_URL } from '../src/config';
import { logIn } from "./redux/usersRedux";

const App = () => {

  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchAds()), [dispatch]);


  fetch(`${API_URL}/auth/user`)
		.then(res => {
			if (res.status === 200) {
				return res.json();
			} else {
				throw new Error('Failed');
			}
		})
		.then(data => {
			dispatch(logIn({ login: data.user, id: data.id }));
			//console.log(data);
		})
		.catch(e => {
			//console.log(e);
		});


  return (
    <Container>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ad/:id" element={<Ad />} />
          <Route path="/ad/edit/:id" element={<AdEdit />} />
          <Route path="/ad/add" element={<AdAdd />} />
          <Route path="/ad/remove/:id" element={<AdRemove />} />
          <Route path="/search/:searchPhrase" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
    </Container>
  );
};


export default App;