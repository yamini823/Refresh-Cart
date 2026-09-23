import "../styles/categories.css";
import { useNavigate } from "react-router-dom";

function Categories() {
  const navigate = useNavigate();
  return (
    <div className="categories-wrapper">
      <div className="categories-left">
        <h1> Shop by Category</h1>
      </div>

      <div className="categories-right">
        <div className="category-grid">

          <div className="category-box" onClick={()=>navigate("/signup") }>
            <span>🍎</span>
            <h3>Fruits & Vegetables</h3> 
            <p>120 items</p>
          </div>

           <div className="category-box" onClick={()=>navigate("/signup") }>
            <span>🥛</span>
            <h3> Dairy & Eggs </h3>
            <p>85 items</p>
          </div>

           <div className="category-box" onClick={()=>navigate("/signup") }>
            <span>🍞</span>
            <h3>Bakery</h3>
            <p>60 items</p>
          </div>

           <div className="category-box" onClick={()=>navigate("/signup") }>
            <span>🍖</span>
            <h3>  Meat & Seafood </h3>
            <p>95 items</p>
          </div>

           <div className="category-box" onClick={()=>navigate("/signup") }>
            <span>🍿</span>
            <h3>Snacks</h3>
            <p>150 items</p>
          </div>

          <div className="category-box" onClick={()=>navigate("/signup") }>
            <span>🧃</span>
            <h3>Beverages</h3>
            <p>110 items</p>
          </div>

          <div className="category-box" onClick={()=>navigate("/signup") }>
            <span>🧊</span>
            <h3> Frozen Foods </h3>
            <p>70 items</p>
          </div>

           <div className="category-box" onClick={()=>navigate("/signup") }>
            <span>🫙</span>
            <h3>
              Pantry Staples
            </h3>
            <p>200 items</p>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Categories;