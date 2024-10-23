import College from "./College";



function Unversity(props){
    return(
        <>
            <h1>University details</h1>
            <p>{props.record.name} --- {props.record.established}</p>
            <College cdata={props.record.college}/>
        </>
    )
}

export default Unversity;