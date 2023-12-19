import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'; // Importar ChakraProvider
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import './App.css';
import { Suspense, lazy } from 'react';

const HomePage = lazy(() => import('./components/Home'));
const Tareas = lazy(() => import('./components/Tareas'));
const SobreNosotros = lazy(() => import('./components/SobreNosotros'));
const Menu = lazy(() => import('./components/Menu'));

const App = () => {
  return (
    <ChakraProvider> {/* Envolver toda la aplicación con ChakraProvider */}
      <Router>
        <div className="App">
          <Header />
          <TaskForm />

          <Suspense fallback="Loading...">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/tareas" element={<Tareas />} />
              <Route path="/sobre-nosotros" element={<SobreNosotros />} />
            </Routes>
            <Menu />
          </Suspense>
        </div>
      </Router>
    </ChakraProvider>
  );
};

export default App;
