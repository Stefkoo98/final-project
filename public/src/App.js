import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header } from './components/header/Header';
import { MainPage } from './components/mainPage/MainPage';
import { Breakfast } from './components/allRecipes/Breakfast';
import { Brunch } from './components/allRecipes/Brunch';
import { Dinner } from './components/allRecipes/Dinner';
import { Lunch } from './components/allRecipes/Lunch'
import { Footer } from './components/footer/Footer';
import { Login } from './components/login/Login';
import { CreateAccount } from './components/createAccount/CreateAccount';
import { MyProfile } from './components/myProfile/MyProfile';
import { CreateRecipes } from './components/createRecipes/CreateRecipes';
import { MyRecipes } from './components/myRecipes/MyRecipes';
import { UpdateRecipes } from './components/updateRecipes/UpdateRecipes';
import './css/global.css'

export function App() {
  return (
    <main>
      <Header />
      <Switch>
        <Route path='/' exact component={MainPage} />
        <Route path='/create-account' component={CreateAccount} />
        <Route path='/login' component={Login} />
        <Route path='/my-profile' component={MyProfile} />
        <Route path='/breakfast' component={Breakfast} />
        <Route path='/brunch' component={Brunch} />
        <Route path='/dinner' component={Dinner} />
        <Route path='/lunch' component={Lunch} />
        <Route path='/my-recipes' component={CreateRecipes} />
        <Route path='/add-recipes' component={MyRecipes} />
        <Route path='/update-recipe/:id' component={UpdateRecipes} />
      </Switch>
      <Footer />
    </main>
  )
}