import React, { useState, useEffect } from 'react';
import dinnerImg from '../../assets/steak-dinner.jpg';
import stopWatch from '../../assets/icon_time.svg';
import dinnerPlate from '../../assets/icon_plate.svg';
import starLikes from '../../assets/icon_star.svg';
import popUpArrow from '../../assets/icon_arrows_white.svg';
import './AllRecipes.css';

export const Breakfast = () => {

    const [meals, setMeals] = useState([]);
    const [count, setCount] = useState(0);

    const getRecipes = async () => {
        try {
            const res = await fetch("/api/v1/recipes/category/breakfast")
            let data = await res.json();
            console.log(data)
            setMeals(data);
        } catch (error) {
            console.log(error);
        }
    }
    const handleClick = () => {
        setCount(count + 1);
    };
    useEffect(() => {
        getRecipes()
    }, []);

    return (
        <div id='main'>
            <div class='meals-div'>
                <h2 class='meals-name'>Breakfast</h2>
                <div class='breakfast-line'></div>
            </div>
            <div id='breakfast-container-one' >
                {meals.length > 0 && meals.map((meal, i) => {
                    return <>
                        <div id='meal-container' key={i}>
                            <div class='breakfast-img'>
                                <img src={dinnerImg} alt='macbacon' id='img' class='breakfast-img' />
                                <h4 class='h4-breakfast-category'>{meal.category}</h4>
                            </div>
                            <div id='meal-description' class='breakfast-text'>
                                <h1 class='breakfast-meal-name'>{meal.recipe_title}</h1>
                                <p class='breakfast-paragraph'>{meal.short_description}</p><br />
                                <div class='breakfast-articles-container'>
                                    <div class='breakfast-articles'>
                                        <img src={stopWatch} alt='pic2' class='breakfast-pic2' />
                                        <p class='p-preparation-time'>{meal.preparation_time}</p>
                                        <img src={dinnerPlate} alt='pic3' class='breakfast-pic3' />
                                        <p class='p-no-people'>{meal.no_people}persons</p>
                                        <img src={starLikes} alt='pic1' class='breakfast-pic1' onClick={() => setCount(handleClick)} />
                                        <p class='breakfast-likes'>{count}</p>
                                    </div>
                                    <div class='div-pic4'><img src={popUpArrow} alt='pic4' class='breakfast-pic4' /></div>
                                </div>
                            </div>
                        </div>
                    </>
                })}
            </div>
        </div>
    )

}