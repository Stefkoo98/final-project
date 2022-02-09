import React, { useState, useEffect } from "react";
import healthyMeal from '../../assets/healthy-meal.jpg';
import stopWatch from '../../assets/icon_time.svg';
import dinnerPlate from '../../assets/icon_plate.svg';
import starLikes from '../../assets/icon_star.svg';
import closeButton from '../../assets/icon_close.svg';
import './PopUp.css'

export function PopUp(props) {

    const recipes = {
        recipe_title: '',
        category: '',
        preparation_time: '',
        no_people: '',
        short_description: '',
        recipe: '',
        likes: 0
    }

    const [recipesData, setRecipesData] = useState(recipes);
    const token = localStorage.getItem("jwt");
    let params = new URLSearchParams(document.location.search);
    let popUpId = params.get("id");

    const getRecipe = async () => {
        try {
            const res = await fetch(`/api/v1/recipes/get-one/${popUpId}`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            })
            let data = await res.json();
            setRecipesData(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getRecipe()
    }, []);

    return (
        <div className='pop-up'>
            <div className='pop-up-container'>
                <div className='pop-up-header'>
                    <h2>{recipesData.recipe_title}</h2>
                    <img src={closeButton} alt='close-button' onClick={props.handleClose} />
                    {props.content}
                </div>
                <div className='pop-up-section'>
                    <div className='pop-up-gadgets'>
                        <img src={healthyMeal} alt='meal' />
                        <div className='best-served-for-title'>
                            <h4 className=''>Best Served For</h4>
                            <h4 className=''>{recipesData.category}</h4>
                        </div>
                        <p className='short-paragraph'>{recipesData.short_description}</p>
                        <div className='gadgets'>
                            <img src={stopWatch} alt='stop-watch' />
                            <h3 className=''>{recipesData.preparation_time}</h3>
                            <img src={dinnerPlate} alt='dinner-plate' />
                            <h3 className=''>{recipesData.no_people} persons</h3>
                            <img src={starLikes} alt='likes' />
                            <h3>{recipesData.likes}</h3>
                        </div>
                    </div>
                    <div className='recipe-details'>
                        <h4 className=''>Recipe Details</h4>
                        <p className=''>{recipesData.recipe}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

