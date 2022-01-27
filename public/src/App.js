import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header } from './components/header/Header';
import { Footer } from './components/footer/Footer';
import { Login } from './components/login/Login';
import { CreateAccount } from './components/createAccount/CreateAccount';
import { MyProfile } from './components/myProfile/MyProfile';
import { CreateRecipes } from './components/createRecipes/CreateRecipes';
import { MyRecipes } from './components/myRecipes/MyRecipes';
import './css/global.css'

export function App() {
  return (
    <main>
      <Header />
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/create-account' component={CreateAccount} />
        <Route path='/login' component={Login} />
        <Route path='/my-profile' component={MyProfile} />
        <Route path='/my-recipes' component={CreateRecipes} />
        <Route path='/add-recipes' component={MyRecipes} />
      </Switch>
      <Footer />
    </main>
  )
}