import './App.css';
import Splash from './Start/Splash';
import Login from './Start/Login';
import SignUp from './Start/SignUp';
import CreatePet from './Initial/CreatePet';
import InitialMain from './Initial/InitialMain';
import ModifyMember from './Initial/ModifyMember';
import Main from './Main';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
				<Routes>
          <Route path="/" element={<Splash/>}></Route>
					<Route path="/Login" element={<Login/>}></Route>
          <Route path="/SignUp" element={<SignUp/>}></Route>
          <Route path="/InitialMain" element={<InitialMain/>}></Route>
          <Route path="/Main" element={<Main/>}></Route>
          <Route path="/CreatePet" element={<CreatePet/>}></Route>
          <Route path="/ModifyMember" element={<ModifyMember/>}></Route>
				</Routes>
			</Router>
    </>
    );
}

export default App;
