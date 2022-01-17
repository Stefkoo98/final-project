import React from 'react';
import './CreateRecipes.css';
import { Link } from 'react-router-dom';
import goBack from '../../assets/icon_back_white.svg';
import meal from '../../assets/healthy-food.jpg';

export function CreateRecipes() {

    // const token = localStorage.getItem('jwt');
    // const createRecipe = async () => {
    //     try {
    //         let result = await fetch()
    //     }
    // }

    return (
        <div className='create-recipes-container'>
            <div className='create-recipes-title'>
                <h1>My Recipes</h1>
                <div className='create-recipes-line'></div>
                <Link to='my-recipes'><img src={goBack}></img></Link>
            </div>
            <div className='inside-create-recipes'>
                <div className='left-div-recipe-img'>
                    <h4>Recipe Image</h4>
                    <img src={meal}></img>
                    <button>Upload Image</button>
                </div>
                <div className='middle-div'>
                    <div className='recipe-title'>
                        <h4>Recipe Title</h4>
                        <input placeholder='Homemade Pizza' />
                    </div>
                    <div className='three-divs-in-a-row'>
                        <div className='category'>
                            <form>
                                <label>
                                    Category
                                </label>
                                <input placeholder='Breakfast' />
                            </form>
                        </div>
                        <div className='prep-time'>
                            <form>
                                <label>
                                    Preparation Time
                                </label>
                                <input placeholder='45' />
                            </form>
                        </div>
                        <div className='numb-of-ppl'>
                            <form>
                                <label>
                                    No.People
                                </label>
                                <input placeholder='4' />
                            </form>
                        </div>
                    </div>
                    <div className='short-description'>
                        <h4>Short Description</h4>
                        <textarea placeholder='There are many lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'></textarea>
                    </div>
                    <button className='save-btn'>Save</button>
                </div>
                <div className='right-div'>
                    <h4>Recipe</h4>
                    <textarea placeholder='There are many lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' rows={5}></textarea>
                </div>
            </div>
        </div>
    )
}