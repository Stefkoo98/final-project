import React, { useState, useEffect } from 'react';
import foodImg from '../../assets/food.jpg';
import stopWatch from '../../assets/icon_time.svg';
import dinnerPlate from '../../assets/icon_plate.svg';
import starLikes from '../../assets/icon_star.svg';
import popUpArrow from '../../assets/icon_arrows_white.svg';
import { PopUp } from '../popUp/PopUp';
import './AllRecipes.css';


export function Breakfast() {

    const [meals, setMeals] = useState([]);
    const [openPopUp, setOpenPopUp] = useState(false);
    const [openPopUpId, setOpenPopUpId] = useState(null);

    const token = localStorage.getItem('jwt');

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

    const togglePopUp = (id) => {

        if (!openPopUp) {
            setOpenPopUp(true)
            setOpenPopUpId(id)
        } else {
            setOpenPopUp(false)
            setOpenPopUpId(null)
        }
    }

    useEffect(() => {
        getRecipes()
    }, []);

    return (
        <div className='breakfast-container'>
            <div className='breakfast-title'>
                <h1>Breakfast</h1>
                <div className='breakfast-line'></div>
            </div>
            <div className='meals-section' >
                {meals.length > 0 && meals.sort((min, max) => { return max.likes - min.likes }).map((meal, i) => {
                    return <>
                        {openPopUp && meal._id === openPopUpId && <PopUp
                            data={meal}
                            handleClose={togglePopUp}
                        />}
                        <div className='meals-container' key={i}>
                            <div className='meal-img'>
                                <img src={foodImg} alt='meal' />
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
                                        <h3 id="likescounter">{meal.likes}</h3>
                                    </div>
                                    <div className='pop-up-arrow'>
                                        <img src={popUpArrow} alt='arrows' onClick={() => togglePopUp(meal._id)} />
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