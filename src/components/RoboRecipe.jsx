import ReactMarkdown from "react-markdown";

export default function RoboRecipe(props){
    return(
        <>
            <div ref={props.recipeRef} className="recipe-info">
                <ReactMarkdown>
                    {props.genRecipe}
                </ReactMarkdown>
            </div>
        </>
    )
}