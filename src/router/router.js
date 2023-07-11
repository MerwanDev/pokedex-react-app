import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NoMatch from './NoMatch';
import Navigation from '../layout/navigations';
import Produits from '../components/pages/page_produits'
import Produit from '../components/PokemonDetails';
import Meteo from '../components/pages/page_meteo';


const Routeur = () => {
  return (
    <BrowserRouter>
      <Navigation>
        <Routes>
            <Route path="/pokemon" element={<Produits />} />
            <Route path="*" element={<NoMatch />} />
            <Route path="/pokemon/:id" element={<Produit />} />
            <Route path="/meteo" element={<Meteo />} />
          </Routes>
      </Navigation>
    </BrowserRouter>
  );
};

export default Routeur;
