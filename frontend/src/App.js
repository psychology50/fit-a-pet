import './App.css';
import Splash from './page/Start/Splash';
import Login from './page/Start/Login';
import SignUp from './page/Start/SignUp';
import CreatePet from './page/MainPage/CreatePet';
import ModifyMember from './page/MainPage/ModifyMember';
import { useState } from 'react';
import Main from './page/MainPage/Main';
import TotalContainer from './styles/TotalForm';
import UserEdit from './page/User/UserEdit';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {

  //const[petlist,setPetlist]=useState([]);

  return (
    <TotalContainer>
      <Router>
				<Routes>
          <Route path="/" element={<Splash/>}></Route>
					<Route path="/Login" element={<Login/>}></Route>
          <Route path="/SignUp" element={<SignUp/>}></Route>
          <Route path="/Main" element={<Main/>}></Route>
          <Route path="/CreatePet" element={<CreatePet/>}></Route>
          <Route path="/ModifyMember" element={<ModifyMember/>}></Route>
          <Route path="/UserEdit" element={<UserEdit/>}></Route>
				</Routes>
			</Router>
    </TotalContainer>
    );
}

export default App;
