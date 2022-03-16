import React from "react";
import closeButton from '../../assets/icon_close.svg';
import foodImg from '../../assets/food.jpg';
import stopWatch from '../../assets/icon_time.svg';
import dinnerPlate from '../../assets/icon_plate.svg';
import starLikes from '../../assets/icon_star.svg';
import './PopUp.css';

export function PopUp(props) {
    return (
        <div className='pop-up'>
            <div className='close-btn'>
                <img src={closeButton} alt='close-button' className='close-btn' onClick={props.handleClose} />
            </div>
            <div className='pop-up-container'>
                <div className='pop-up-header'>
                    <h1>{props.data.recipe_title}</h1>
                </div>
                <div className='pop-up-section'>
                    <div className='pop-up-gadgets'>
                        <img src={foodImg} alt='meal' />
                        <div className='under-img-description'>
                            <h4 className='best-served-for-title'>Best Served For</h4>
                            <h3 className='recipe-category' style={{ color: "white" }}>{props.data.category}</h3>
                        </div>
                        <p className='short-paragraph'>{props.data.short_description}</p>
                        <div className='gadgets'>
                            <img src={stopWatch} alt='stop-watch' />
                            <h3 className=''>{props.data.preparation_time} min</h3>
                            <img src={dinnerPlate} alt='dinner-plate' />
                            <h3 className=''>{props.data.no_people} persons</h3>
                            <img src={starLikes} alt='likes' />
                            <h3>{props.data.likes}</h3>
                        </div>
                    </div>
                    <div className='recipe-details'>
                        <h4>Recipe Details</h4>
                        <p>{props.data.recipe}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

