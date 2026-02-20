import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import Product from './pages/Product';
import Survey from './pages/Survey';
import Results from './pages/Results';
import Dashboard from './pages/dashboard';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="product" element={<Product />} />
        <Route path="survey" element={<Survey />} />
        <Route path="results" element={<Results />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}
