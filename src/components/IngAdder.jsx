import { useState } from "react";
import './IngAdder.css';
import RoboRecipe from "./roboRecipe";
import RecipeShow from "./RecipeShow";
import { getRecipeFromClaudeFree, getRecipeFromMistral } from "../aiChef";


export default function IngAdder(props){
    const [IngredientList, setIngredientList] = useState([]);
    const [showRecipe, setShowRecipe] = useState(false);
    const [Recipe, setRecipe] = useState('');

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

    async function generateRecipe(){
        // setShowRecipe((prev)=>prev=!prev);
        const genRecipe = await getRecipeFromClaudeFree(IngredientList);
        //console.log("HF API Key:", import.meta.env.VITE_HF_API_KEY)

        setRecipe(genRecipe);
    }

    function toggleRecipe(){
        setShowRecipe((prev)=>prev=!prev);
    }

    return(
        <>
            <form onSubmit={addIng}>
                <input type="text" name="ing" placeholder="eg Tomato sauce"/>
                <button type="submit">ADD Ingredient</button>
            </form>
            <ul>
                {newList}
            </ul>
            {IngredientList.length > 3 && <RecipeShow enough={IngredientList.length} show={toggleRecipe} gen={generateRecipe} status={showRecipe} />}
            {showRecipe && <RoboRecipe genRecipe={Recipe}/> }
        </>
    )

}