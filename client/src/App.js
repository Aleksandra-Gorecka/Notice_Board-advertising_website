import { Container } from "react-bootstrap";
import Header from "./components/views/Header/Header";
import Footer from './components/views/Footer/Footer';
import { Routes, Route } from 'react-router-dom';
import Home from "./components/pages/Home/Home";
import Ad from "./components/pages/Ad/Ad";
import NotFound from "./components/pages/NotFound/NotFound";

const App = () => {
  return (
    <Container>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ads/:id" element={<Ad />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
    </Container>
  );
};


export default App;


