import './App.css';
import { Route, Routes } from "react-router-dom";
import Navbar from './Components/Navbar';
import Pagination from './pages/pagination/Pagination';
import Scrolling from './pages/Scroll/Scrolling';
import Map from "./pages/Map";

function App() {
  return (
    <div className="container d-flex flex-column">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Map />}></Route>
        <Route path="/pagination" element={<Pagination />}></Route>
        <Route path="/scrolling" element={<Scrolling />}></Route>
      </Routes>
    </div>
  );
}

export default App;
