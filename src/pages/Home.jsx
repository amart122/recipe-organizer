import "../assets/css/Home.css";
import SideBarFilter from '../components/SideBarFilter';
import useLoadIngredients from '../hooks/useLoadIngredients';

function Home() {
  const [ingredients] = useLoadIngredients();

  return (
    <div className='main-home'>
      <SideBarFilter ingredients={ ingredients }/>
    </div>
  );
}

export default Home; 