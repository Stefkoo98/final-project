import React, { useState, useEffect } from 'react';
import healthyMeal from '../../assets/healthy-meal.jpg';
import stopWatch from '../../assets/icon_time.svg';
import dinnerPlate from '../../assets/icon_plate.svg';
import starLikes from '../../assets/icon_star.svg';
import popUpArrow from '../../assets/icon_arrows_white.svg';
import './AllRecipes.css';

export function Brunch() {

    const [meals, setMeals] = useState([]);

    const getRecipes = async () => {
        try {
            const res = await fetch("/api/v1/recipes/category/brunch")
            let data = await res.json();
            console.log(data)
            setMeals(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getRecipes()
    }, []);

    return (
        <div className='brunch-container'>
            <div className='brunch-title'>
                <h1>Brunch</h1>
                <div className='brunch-line'></div>
            </div>
            <div className='meals-section' >
                {meals.length > 0 && meals.map((meal, i) => {
                    return <>
                        <div className='meals-container' key={i}>
                            <div className='meal-img'>
                                <img src={healthyMeal} alt='meal' />
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
                                        <h3>{meal.likes}</h3>
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