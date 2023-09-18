import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Authenticate from "./pages/Authenticate";
import SongTinder from "./pages/SongTinder";
import Test from "./pages/Test";
import Trends from "./pages/Trends";
import Main from "./pages/Main";
import Error from "./pages/Error";
import PrivateRoute from "./util/PrivateRoute";
import { useEffect } from "react";
import './App.css';

function App() {

  useEffect(() => {
    if (!localStorage.getItem("savedSongs"))
    {
      localStorage.setItem("savedSongs", JSON.stringify([]));
    }
  }, []);

  return (
    <div className="App">
      <Router>
        {/* <NavBar/> */}
        <Routes>
          <Route path="/" element={<Authenticate/>}/>
          <Route path="/songs" element={<PrivateRoute/>}>
              <Route path="/songs" element={<SongTinder/>}/>
          </Route>
          <Route path="/test" element={<Test/>}/>
          <Route path="/trends" element={<PrivateRoute/>}>
            <Route path="/trends" element={<Trends/>}/>
          </Route>
          <Route path="/main" element={<PrivateRoute/>}>
            <Route path="/main" element={<Main/>}/>
          </Route>
          <Route path="*" element={<Error/>}/>
        </Routes>
      </Router> 
    </div>
  );
}

export default App;
