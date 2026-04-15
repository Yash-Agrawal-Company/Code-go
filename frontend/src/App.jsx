import { BrowserRouter, Routes, Route } from "react-router-dom";
import LaunchScreen from "./Screens/LaunchScreen";
import Login from "./Authentication/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LaunchScreen />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;