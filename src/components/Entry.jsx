import { createRoot } from "react-dom/client";


export default function Entry(props){

    return(
        props!=null &&
        <article>
            <div>
                <img src={props.img} alt={props.alt} />
            </div>
            <div>
                <img src="" alt="marker for map" />
                <a href={props.googleMapsLink}></a>
                <h1>{props.title}</h1>
                <h3>{props.country}</h3>
                <p>{props.dates}</p>
                <p>{props.text}</p>
            </div>
        
        </article>
    )
}

