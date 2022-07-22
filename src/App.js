import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Authenticate from "./pages/Authenticate";
import Choose from "./pages/Choose";
import CreatePlaylist from "./pages/CreatePlaylist";
import Favorite from "./pages/Favorite";
import SongTinder from "./pages/SongTinder";
import Test from "./pages/Test";
import Visualize from "./pages/Visualize";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Authenticate/>}/>
          <Route path="/choose" element={<Choose/>}/>
          <Route path="/create_playlist" element={<CreatePlaylist/>}/>
          <Route path="/song_tinder" element={<SongTinder/>}/>
          <Route path="/test" element={<Test/>}/>
          <Route path="/data" element={<Visualize/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
