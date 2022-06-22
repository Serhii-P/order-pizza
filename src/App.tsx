
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import NotFoundBlock from './components/NotFoundBlock';
import Cart from './pages/Cart';
import FullPizza from './pages/FullPizza';
import MainLayout from './layouts/MainLayout';
import './scss/app.scss';

// https://62987937f2decf5bb74365d0.mockapi.io

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<NotFoundBlock />} />
      </Route>
    </Routes>
  );
}

export default App;
