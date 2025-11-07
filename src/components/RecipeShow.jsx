export default function RecipeShow(props){
    return(
        <>
            <section>
                <h3>Ready to create a recipe?</h3>
                <button onClick={()=>{props.show()}}>{props.enough? "Hide" : "Generate" } Recipe</button>
            </section>
        </>
    )
}