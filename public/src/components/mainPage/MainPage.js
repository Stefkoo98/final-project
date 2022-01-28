import React from 'react';
import { FreshAndNew } from './FreshAndNew';
import { MostPopularRecipes } from './MostPopularRecipes';
import './MainPage.css'

export function MainPage() {
    return (
        <div>
            <FreshAndNew />
            <MostPopularRecipes />
        </div>
    )
}
