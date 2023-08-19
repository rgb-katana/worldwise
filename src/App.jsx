import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import CityList from './components/CityList';
import City from './components/City';
import CountryList from './components/CountryList';
import Form from './components/Form';
import SpinnerFullPage from './components/SpinnerFullPage';

import { CitiesProvider } from './Contexts/CitiesContext';
import { AuthProvider } from './Contexts/FakeAuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { Suspense, lazy } from 'react';

// import Product from './pages/Product';
// import Pricing from './pages/Pricing';
// import Homepage from './pages/Homepage';
// import PageNotFound from './pages/PageNotFound';
// import AppLayout from './pages/AppLayout';
// import Login from './pages/Login';

const Homepage = lazy(() => import('./pages/Homepage'));
const Product = lazy(() => import('./pages/Product'));
const Pricing = lazy(() => import('./pages/Pricing'));
const AppLayout = lazy(() => import('./pages/AppLayout'));
const Login = lazy(() => import('./pages/Login'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));

// dist/assets/index-906af7d3.css   30.14 kB │ gzip:   5.06 kB
// dist/assets/index-83ead7da.js   524.48 kB │ gzip: 148.69 kB

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="product" element={<Product />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
