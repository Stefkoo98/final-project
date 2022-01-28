import React, { useState, useEffect } from 'react';
import nextPage from '../../assets/icon_plus_white.svg';
import deleteIcon from '../../assets/icon_trashcan.svg'
import { Link } from 'react-router-dom';
import './MyRecipes.css';

export function MyRecipes() {

    const [recipes, setRecipes] = useState([]);
    const [imageRecipe, setImageRecipe] = useState();

    const token = localStorage.getItem('jwt');

    const getMyRecipe = async () => {
        try {
            const res = await fetch("/api/v1/recipes/getmine", {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            })
            let data = await res.json();
            setRecipes(data);
        } catch (error) {
            console.log(error);
        }
    }

    const removeRecipe = async (id) => {
        try {
            await fetch(`/api/v1/recipes/remove/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            })
        } catch (error) {
            console.log(error);
        }
    }
    const deleteRecipe = (_id) => {
        setRecipes([...recipes.filter(recipe => recipe._id !== _id)]);
    }

    useEffect(() => {
        getMyRecipe()
    }, []);

    return (
        <div className='my-recipes-container'>
            <div className='my-recipes-title'>
                <h1>My Recipes</h1>
                <div className='my-recipes-line'></div>
                <Link to='my-recipes'><img src={nextPage}></img></Link>
            </div>
            <div className='my-recipes-table'>
                <div className='thead-section'>
                    <h4>Recipe Name</h4>
                    <h4>Category</h4>
                    <h4>Created On</h4>
                    <h4>Delete</h4>
                </div>
                <div>
                    {recipes.length > 0 && recipes.map((recipe, i) => {
                        return (
                            <Link to={`update-recipe/${recipe._id}`}>
                                <div className='tbody-section' key={i}>
                                    <h4>{recipe.recipe_title}</h4>
                                    <h4>{recipe.category}</h4>
                                    <h4>{recipe.created_on}</h4>
                                    <img src={deleteIcon} className='delete-icon' alt='trashcan' onClick={() => { removeRecipe(recipe._id); deleteRecipe(recipe._id) }} />
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
