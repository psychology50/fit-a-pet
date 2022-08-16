import './App.css';
import Splash from './page/Start/Splash';
import Login from './page/Start/Login';
import SignUp from './page/Start/SignUp';
import CreatePet from './page/Initial/CreatePet';
import InitialMain from './page/Initial/InitialMain';
import ModifyMember from './page/Initial/ModifyMember';
import { useState } from 'react';
import Main from './page/MainPage/Main';
import PetProfile from './page/MainPage/PetProfile';
import TotalContainer from './styles/TotalForm';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MyProfile from './page/Profile/MyProfile'

function App() {

  const[petlist,setPetlist]=useState([]);

  return (
    <TotalContainer>
      <Router>
				<Routes>
          <Route path="/" element={<Splash/>}></Route>
					<Route path="/Login" element={<Login/>}></Route>
          <Route path="/SignUp" element={<SignUp/>}></Route>
          <Route path="/InitialMain" element={<InitialMain/>}></Route>
          <Route path="/Main" element={<Main petlist={petlist} setPetlist={setPetlist}/>}></Route>
          <Route path="/CreatePet" element={<CreatePet/>}></Route>
          <Route path="/ModifyMember" element={<ModifyMember/>}></Route>
          <Route path="/PetProfile/:id" element={<PetProfile/>}></Route>
          <Route path="/MyProfile" element={<MyProfile/>}></Route>
				</Routes>
			</Router>
    </TotalContainer>
    );
}

export default App;
