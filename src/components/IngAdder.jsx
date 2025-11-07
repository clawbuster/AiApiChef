import { useState } from "react";
import './IngAdder.css';
import RoboRecipe from "./roboRecipe";
import RecipeShow from "./RecipeShow";


export default function IngAdder(props){
    const [IngredientList, setIngredientList] = useState(['1', '2', '3']);
    const [showRecipe, setShowRecipe] = useState(false);

    function addIng(e){
        e.preventDefault();

        const curIng = new FormData(e.currentTarget);
        if(curIng.get('ing').trim() !== ''){
            setIngredientList((item)=>[...item, curIng.get('ing')]);
            e.currentTarget.reset();
        }
    }

    function removeIng(index){
        IngredientList.splice(index, 1);
        setIngredientList([...IngredientList]);
    }

    const newList = IngredientList.map((item, index)=>{
        return <li key={index}>{item} <button onClick={() => removeIng(index)}>X</button></li>
    })

    function toggleRecipe(){
        setShowRecipe((prev)=>prev=!prev);
    }

    return(
        <>
            <form onSubmit={addIng}>
                <input type="text" name="ing" placeholder="eg Tomato sauce" />
                <button type="submit">ADD Ingredient</button>
            </form>
            <ul>
                {newList}
            </ul>
            {IngredientList.length > 3 && <RecipeShow enough={showRecipe} show={toggleRecipe} />}
            {showRecipe && <RoboRecipe/> }
        </>
    )

}