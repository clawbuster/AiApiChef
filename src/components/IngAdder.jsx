import { useState } from "react";
import './IngAdder.css';


export default function IngAdder(){
    const [IngredientList, setIngredientList] = useState([]);
    const ing = '';

    function addIng(e){
        e.preventDefault();

        const curIng = new FormData(e.currentTarget);
        setIngredientList((item)=>[...item, curIng.get('ing')]);
        curIng.set('ing', '');
    }

    function removeIng(index){
        IngredientList.splice(index, 1);
        setIngredientList([...IngredientList]);
    }

    const newList = IngredientList.map((item, index)=>{
        return <li key={index}>{item} <button onClick={() => removeIng(index)}>X</button></li>
    })

    return(
        <>
        <form onSubmit={addIng}>
            <input type="text" name="ing" placeholder="eg Tomato sauce" />
            <button type="submit">ADD Ingredient</button>
        </form>
        <ul>
            {newList}
        </ul>
        </>
    )

}