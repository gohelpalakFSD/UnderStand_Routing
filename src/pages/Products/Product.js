
import Recipe from '../Recipe/Recipe';
import Searchbar from '../Searchbar/Searchbar';
import './Product.css'

let recipe = [
    {
        title: "first Product"
    },
    {
        title: "first Product1"
    },
    {
        title: "first Product 3"
    }
]

function Product(){
    return(
          <>
            <div id="productPage">
                <h1 style={{marginTop:"100px", color:"black",textAlign:"center"}}> Food Recipe Plaza</h1>
                <Searchbar />
                <Recipe recipeData={recipe}/>
            </div>
          </>  
    )
}

export default Product;