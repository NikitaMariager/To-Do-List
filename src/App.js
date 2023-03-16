import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.scss";

import ToDo from "./pages/airtable/ToDo";
import ToDoAdmin from "./pages/airtable/ToDoAdmin";
import Edit from "./pages/airtable/EditTodo";
import Notfound from "./pages/Notfound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ToDo />}></Route>

        <Route path="/todoEdit/:id" element={<Edit />}></Route>

        <Route path="*" element={<Notfound />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
