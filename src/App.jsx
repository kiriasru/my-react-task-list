import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import './App.css';

const HomePage = lazy(() => import('./components/Home'));
const Tareas = lazy(() => import('./components/Tareas'));
const SobreNosotros = lazy(() => import('./components/SobreNosotros'));
const Menu = lazy(() => import('./components/Menu'));

const App = () => {
  return (
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
  );
};

export default App;
