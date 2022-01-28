import React, { useState, useEffect } from 'react';
import dinnerImg from '../../assets/steak-dinner.jpg';
import stopWatch from '../../assets/icon_time.svg';
import dinnerPlate from '../../assets/icon_plate.svg';
import starLikes from '../../assets/icon_star.svg';
import popUpArrow from '../../assets/icon_arrows_white.svg';
import './AllRecipes.css';
export const Lunch = () => {

    const [recipes, setRecipes] = useState([]);
    const getRecipes = async () => {
        try {
            const res = await fetch("/api/v1/recipes/category/lunch")
            let data = await res.json();
            console.log(data)
            setRecipes(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getRecipes()
    }, []);

    return (
        <div id='main'>
            <section class='section-one'>
                <div class='meals-div'>
                    <h2 class='meals-name'>Lunch</h2>
                    <div class='lunch-line'></div>
                </div>
                <div id='breakfast-container-one' >
                    {recipes.length > 0 && recipes.map((recipe, i) => {
                        return <>
                            <div id='meal-container' key={i}>
                                <div class='breakfast-img'>
                                    <img src={dinnerImg} alt='macbacon' id='img' class='breakfast-img' />
                                    <h4 class='h4-breakfast-category'>{recipe.category}</h4>
                                </div>
                                <div id='meal-description' class='breakfast-text'>
                                    <h1 class='breakfast-meal-name'>{recipe.recipe_title}</h1>
                                    <p class='breakfast-paragraph'>{recipe.short_description}</p><br />
                                    <div class='breakfast-articles-container'>
                                        <div class='breakfast-articles'>
                                            <img src={stopWatch} alt='pic2' class='breakfast-pic2' />
                                            <p class='p-preparation-time'>{recipe.preparation_time}</p>
                                            <img src={dinnerPlate} alt='pic3' class='breakfast-pic3' />
                                            <p class='p-no-people'>{recipe.no_people} &nbsp; persons</p>
                                            <img src={starLikes} alt='pic1' class='breakfast-pic1' />
                                            <p class='breakfast-likes'>1000</p>
                                        </div>
                                        <div class='div-pic4'><img src={popUpArrow} alt='pic4' class='breakfast-pic4' /></div>
                                    </div>
                                </div>
                            </div>
                        </>
                    })}
                </div>
            </section>
        </div>
    )

}