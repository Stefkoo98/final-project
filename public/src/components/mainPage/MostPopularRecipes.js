import React, { useState, useEffect } from 'react';
import dinnerImg from '../../assets/steak-dinner.jpg';
import stopWatch from '../../assets/icon_time.svg';
import dinnerPlate from '../../assets/icon_plate.svg';
import starLikes from '../../assets/icon_star.svg';
import popUpArrow from '../../assets/icon_arrows_white.svg';
import { PopUp } from '../popUp/PopUp';
import './MainPage.css';

export function MostPopularRecipes() {

    const [meals, setMeals] = useState([]);
    const [openPopUp, setOpenPopUp] = useState(false);
    const token = localStorage.getItem("jwt");

    const getRecipes = async () => {
        try {
            const res = await fetch("/api/v1/recipes/get-all", {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            })
            let data = await res.json();
            setMeals(data);
        } catch (error) {
            console.log(error);
        }
    }

    const getRecipe = async (id) => {
        try {
            const res = await fetch(`/api/v1/recipes/get-one/${id}`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            })
            let data = await res.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    const saveLikes = async (recipeId, recipe) => {
        try {
            recipe.likes += 1;
            let res = await fetch(
                `http://localhost:8000/api/v1/recipes/update/${recipeId}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-type': 'application/json',
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(recipe)
                }
            );
            console.log(res);
            return true;
        } catch (err) {
            console.log(err.message);
        }
    };

    const onClickLike = async (event) => {
        let numberlikes = document.getElementById(event.target.id).nextSibling.innerHTML;
        let parsedlikes = parseInt(numberlikes);
        parsedlikes += 1;
        let recipe = await getRecipe(event.target.id);
        let result = await saveLikes(event.target.id, recipe);
        if (result) {
            document.getElementById(event.target.id).nextSibling.innerHTML = parsedlikes;
        }
    };

    const togglePopUp = () => {
        setOpenPopUp(!openPopUp)
    }

    useEffect(() => {
        getRecipes()
    }, []);

    return (
        <div className='most-popular-recipes-container'>
            <div className='most-popular-recipes-title'>
                <h1>Most Popular Recipes</h1>
                <div className='most-popular-recipes-line'></div>
            </div>
            <div className='meals-section'>
                {meals.sort((min, max) => { return max.likes - min.likes }).map((meal, i) => {
                    return <>
                        <div className='meals-container' key={i}>
                            <div className='meal-img' >
                                <img src={dinnerImg} alt='meal' />
                                <h4>{meal.category}</h4>
                            </div>
                            <div className='meal-description'>
                                <h2>{meal.recipe_title}</h2>
                                <p>{meal.short_description}</p><br />
                                <div className='meal-gadgets-container'>
                                    <div className='meal-gadgets'>
                                        <img src={stopWatch} alt='stop-watch' />
                                        <h3>{meal.preparation_time} min</h3>
                                        <img src={dinnerPlate} alt='dinner-plate' />
                                        <h3>{meal.no_people} persons</h3>
                                        <img src={starLikes} alt='star' id={meal._id} onClick={onClickLike} />
                                        <h3 id='likescounter'>{meal.likes}</h3>
                                    </div>
                                    <div className='pop-up-arrow' onClick={togglePopUp}>
                                        {openPopUp && <PopUp
                                            closePopUp={togglePopUp}
                                            id={meal._id}
                                        />}
                                        <img src={popUpArrow} alt='arrows' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                })}
            </div>
        </div>
    )
}