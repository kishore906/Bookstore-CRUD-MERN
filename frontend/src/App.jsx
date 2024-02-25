import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateBook from "./pages/CreateBook";
import EditBook from "./pages/EditBook";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addBook" element={<CreateBook />} />
        <Route path="/editBook/:id" element={<EditBook />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
