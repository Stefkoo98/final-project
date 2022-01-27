import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import goBack from '../../assets/icon_back_white.svg';
import meal from '../../assets/healthy-food.jpg';
import './CreateRecipes.css';

export function CreateRecipes() {

    const recipes = {
        recipe_title: '',
        category: '',
        preparation_time: '',
        no_people: '',
        short_description: '',
        recipe: ''
    }
    const [recipesData, setRecipesData] = useState(recipes);
    const [uploadImg, setUploadImg] = useState();

    const token = localStorage.getItem('jwt');
    const userId = localStorage.getItem('id');

    const create = (e) => {
        setRecipesData({ ...recipesData, [e.target.name]: e.target.value });
    }

    const createRecipe = async () => {
        try {
            let res = await fetch(
                'http://localhost:8000/api/v1/recipes/create',
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(recipesData)
                }
            );
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    };

    const onRecipeUpload = async (event) => {
        setUploadImg(event.target.files[0])
        const formData = new FormData();
        formData.append(
            "document",
            event.target.files[0],
            event.target.files[0].name
        );

        formData.append("recipeId", userId);
        try {
            await fetch(
                `http://localhost:8000/api/v1/storage/recipeUpload`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: formData
                }
            );
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='create-recipes-container'>
            <div className='create-recipes-title'>
                <h1>My Recipes</h1>
                <div className='my-recipes-line'></div>
                <Link to='add-recipes'><img src={goBack}></img></Link>
            </div>
            <div className='inside-create-recipes'>
                <div className='left-div-recipe-img'>
                    <h4>Recipe Image</h4>
                    <img src={uploadImg ? URL.createObjectURL(uploadImg) : meal}></img>
                    <label className='upload-recipe-button'>
                        <input type='file' onChange={onRecipeUpload} />
                        Upload Image
                    </label>
                </div>
                <div className='middle-div'>
                    <div className='recipe-title'>
                        <h4>Recipe Title</h4>
                        <input placeholder='Homemade Pizza' name="recipe_title" value={recipesData.recipe_title} onChange={create} />
                    </div>
                    <div className='three-divs-in-a-row'>
                        <div className='category'>
                            <form>
                                <label>
                                    Category
                                </label>
                                <input placeholder='Breakfast' name="category" value={recipesData.category} onChange={create} />
                            </form>
                        </div>
                        <div className='prep-time'>
                            <form>
                                <label>
                                    Preparation Time
                                </label>
                                <input placeholder='45' name="preparation_time" value={recipesData.preparation_time} onChange={create} />
                            </form>
                        </div>
                        <div className='numb-of-ppl'>
                            <form>
                                <label>
                                    No.People
                                </label>
                                <input placeholder='4' value={recipesData.no_people} name="no_people" onChange={create} />
                            </form>
                        </div>
                    </div>
                    <div className='short-description'>
                        <h4>Short Description</h4>
                        <textarea placeholder='There are many lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' name="short_description" value={recipesData.short_description} onChange={create}></textarea>
                    </div>
                    <button className='save-btn' onClick={createRecipe}>Save</button>
                </div>
                <div className='right-div'>
                    <h4>Recipe</h4>
                    <textarea placeholder='There are many lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' name="recipe" rows={5} value={recipesData.recipe} onChange={create}></textarea>
                </div>
            </div>
        </div>
    )
}