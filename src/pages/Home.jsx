import "../assets/css/Home.css";
import SideBarFilter from '../components/SideBarFilter';
import RecipesContainer from '../components/RecipesContainer'
import useLoadIngredients from '../hooks/useLoadIngredients';

function Home() {
  const [ingredients] = useLoadIngredients();

  return (
    <div className='main-home'>
      <SideBarFilter ingredients={ ingredients }/>
      <RecipesContainer/>
    </div>
  );
}

export default Home; 