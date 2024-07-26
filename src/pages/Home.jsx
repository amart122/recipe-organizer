import "../assets/css/Home.css";
import SideBarFilter from '../components/SideBarFilter';
import RecipesContainer from '../components/RecipesContainer'
import useLoadIngredients from '../hooks/useLoadIngredients';
import { useEffect, useState } from "react";
import { syncLocalStorage } from "../modules/ApiUtils";
import Toast from "../components/Toast";
import { useAuth } from "../modules/AuthContext";

function Home() {
  const [ingredients] = useLoadIngredients();
  const [synced, setSynced] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '', show: false });
  const { currentUser } = useAuth();

  useEffect(() => {
    if(synced || !currentUser) return

    async function handleSync(idToken) {
      const _synced = await syncLocalStorage(idToken);
      if(_synced) {
        setSynced(_synced);
        setToast({ message: "Recipes Synced", type: 'success', show: true });
      } else {
        setToast({ message: "Unable to Sync Recipes", type: 'error', show: true });
      }
    }

    currentUser.getIdToken(true).then((idToken) => {
      handleSync(idToken);
    })
  }, [synced, currentUser]);

  return (
    <div className='main-home'>
      <SideBarFilter ingredients={ ingredients }/>
      <RecipesContainer/>
      <Toast {...toast} setToast={setToast}/>
    </div>
  );
}

export default Home;