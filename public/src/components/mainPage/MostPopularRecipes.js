import React, { useState, useEffect } from 'react';
import dinnerImg from '../../assets/steak-dinner.jpg';
import stopWatch from '../../assets/icon_time.svg';
import dinnerPlate from '../../assets/icon_plate.svg';
import starLikes from '../../assets/icon_star.svg';
import popUpArrow from '../../assets/icon_arrows_white.svg';
import './MainPage.css';

export function MostPopularRecipes() {

    const [meals, setMeals] = useState([]);
    const token = localStorage.getItem("jwt");

    const getRecipe = async () => {
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
    useEffect(() => {
        getRecipe()
    }, []);

    return (
        <div className='most-popular-recipes-container'>
            <div className='most-popular-recipes-title'>
                <h1>Most Popular Recipes</h1>
                <div className='most-popular-recipes-line'></div>
            </div>
            <div className='meals-section' >
                {meals.length > 0 && meals.map((meal, i) => {
                    return <>
                        <div className='meals-container' key={i}>
                            <div className='meal-img'>
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
                                        <img src={starLikes} alt='star' />
                                        <h3>28</h3>
                                    </div>
                                    <div className='pop-up-arrow'>
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