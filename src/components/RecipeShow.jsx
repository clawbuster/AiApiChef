export default function RecipeShow(props){
    
    return(
        <>
            <div>
                <h3 style={{color: "black"}}>Ready to create a recipe?</h3>
                {props.enough > 3 && <button onClick={()=>{props.gen()}}>Generate</button>}
                <button onClick={()=>{props.show()}}>{props.status? "Hide" : "Show"}</button>
            </div>
        </>
    )
}