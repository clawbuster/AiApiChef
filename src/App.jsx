import { useState } from 'react'
import './App.css'
import IngAdder from './components/IngAdder'



function App() {
  const [IngredientList, setIngredientList] = useState([]);
  const [showRecipe, setShowRecipe] = useState(false);

  return (

    <div className="app-container">
      <h1>My AI Chef</h1>
      <IngAdder ing={IngredientList} show={showRecipe}/>
    </div>

  )
}

export default App
