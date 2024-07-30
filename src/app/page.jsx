
import Sidebar from "./components/Sidebar";
import Ingredientspage from "./components/Ingredientspage";
import Recipe from "./components/Recipe";



export default function Home() {
  return ( 
    <div className="grid grid-cols-12">  
      <Sidebar />
      <Ingredientspage/>
      <Recipe/>
      
     
    </div>
      

  );
}
