import ReactMarkdown from "react-markdown";

export default function RoboRecipe(props){
    return(
        <>
            <div className="recipe-info">
                <ReactMarkdown>
                    {props.genRecipe}
                </ReactMarkdown>
            </div>
        </>
    )
}