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
import MyPetProfile from './page/PetProfile/MyPetProfile';

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
<<<<<<< HEAD
          <Route path="/UserEdit" element={<UserEdit/>}></Route>
=======
          <Route path="/PetProfile/:id" element={<PetProfile/>}></Route>
          <Route path="/MyPetProfile" element={<MyPetProfile/>}></Route>
>>>>>>> 4024e2baff0f76f5e5bc6a51ba7c1f11ef6e9658
				</Routes>
			</Router>
    </TotalContainer>
    );
}

export default App;
