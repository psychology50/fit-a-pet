import './App.css';
import Splash from './page/Splash';
import LoginPage from './page/Auth/LoginPage';
import RegisterPage from './page/Auth/RegisterPage';
import CreatePetPage from './page/Pet/CreatePetPage.js';
import SelectMemberPage from './page/Member/SelectMemberPage';
import { useState } from 'react';
import MainPage from './page/Main/MainPage';
import TotalContainer from './styles/TotalForm';
import MyProfile from './page/Auth/MyProfile';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import PetProfile from './page/Pet/PetProfile';

function App() {

  //const[petlist,setPetlist]=useState([]);

  return (
    <TotalContainer>
      <Router>
				<Routes>
          <Route path="/" element={<Splash/>}></Route>
					<Route path="/LoginPage" element={<LoginPage/>}></Route>
          <Route path="/RegisterPage" element={<RegisterPage/>}></Route>
          <Route path="/MainPage" element={<MainPage/>}></Route>
          <Route path="/CreatePetPage" element={<CreatePetPage/>}></Route>
          <Route path="/SelectMemberPage" element={<SelectMemberPage/>}></Route>
          <Route path="/MyProfile" element={<MyProfile/>}></Route>
          <Route path="/PetProfile" element={<PetProfile/>}></Route>
				</Routes>
			</Router>
    </TotalContainer>
    );
}

export default App;
