import Std from "./Std";



function College(props){
    return(
        <>
            <h1>College details</h1>
            <p>{props.cdata.name} -- {props.cdata.established}</p>
            <Std stData={props.cdata.student}/>
        </>
    )
}

export default College;