import { Container } from "react-bootstrap";
import Header from "./components/views/Header/Header";
import Footer from './components/views/Footer/Footer';
import { Routes, Route } from 'react-router-dom';
import Home from "./components/pages/Home/Home";
import Ad from "./components/pages/Ad/Ad";
import EditAd from "./components/pages/EditAd/EditAd";
import NewAd from "./components/pages/NewAd/NewAd";
import Search from "./components/pages/Search/Search";
import Login from "./components/pages/Login/Login";
import Logout from "./components/pages/Logout/Logout";
import Register from "./components/pages/Register/Register";
import NotFound from "./components/pages/NotFound/NotFound";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAds } from "./redux/adsRedux";

const App = () => {

  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchAds()), [dispatch]);

  return (
    <Container>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ad/:id" element={<Ad />} />
          <Route path="/ad/edit/:id" element={<EditAd />} />
          <Route path="/ad/new" element={<NewAd />} />
          <Route path="/search/:search" element={<Search />} />
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


