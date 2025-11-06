import { useState } from "react";
import './IngAdder.css';


export default function IngAdder(){
    const [IngredientList, setIngredientList] = useState([]);
    const [showRecipe, setShowRecipe] = useState(false);

    function addIng(e){
        e.preventDefault();

        const curIng = new FormData(e.currentTarget);
        setIngredientList((item)=>[...item, curIng.get('ing')]);
        e.currentTarget.reset();
    }

    function removeIng(index){
        IngredientList.splice(index, 1);
        setIngredientList([...IngredientList]);
    }

    const newList = IngredientList.map((item, index)=>{
        return <li key={index}>{item} <button onClick={() => removeIng(index)}>X</button></li>
    })

    function genRecipe(){
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
        {IngredientList.length > 3 &&
            <section>
                <h3>Ready to create a recipe?</h3>
                <button onClick={genRecipe}>{showRecipe? "Hide" : "Generate" } Recipe</button>
            </section>
        }
        {showRecipe && 
            <div className="recipe-info">
                <h4>
                    Recipe info
                </h4>
                <p>jajaja</p>
            </div>
        }
        
        </>
    )

}