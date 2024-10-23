

function Recipe(props){
    return(
        <>
            {props.recipeData.map((v,i)=>{
                return(
                    <div style={{height:"300px", width:"200px", backgroundColor:"green",margin:"20px",color:"white", float:"left"}}>
                        <h2>{v.title}</h2>
                    
                    </div>
                )
            })}
            
        </>
    )
}

export default Recipe;