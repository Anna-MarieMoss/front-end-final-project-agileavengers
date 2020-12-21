import React from 'react';
import {BrowserRouter as Router, Switch,Route,Link} from "react-router-dom";
import './App.css';
import DeleteButton from "./Components/Buttons/DeleteButton";
import FavoriteButton from "./Components/Buttons/FavouriteButton";
import MaterialUIPickers from "./Components/Input/DateInput";
import SimpleBottomNavigation from "./Components/NavBar"
import SubmitButton from "./Components/Buttons/SubmitButton"

function App() {
  return (
    <div className="App">


    <p>Hello World</p> 
    <DeleteButton deleteColor="#f39a9d"/>
    <DeleteButton deleteColor="#3f6c51"/>
    <FavoriteButton favoriteColor="#301a4b"/>
    <FavoriteButton favoriteColor="red"/>
    <SubmitButton submitColor="#f39a9d"/>
    <MaterialUIPickers />
    <SimpleBottomNavigation />
    </div>
  );
}

export default App;
