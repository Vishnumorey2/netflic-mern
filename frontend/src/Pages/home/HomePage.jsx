import HomeScreen from './HomeScreen.jsx'
import AuthScreen from './AuthScreen.jsx'
import { useAuthUser } from '../../store/authUser.js';
const HomePage = () => {

  const {user} = useAuthUser();

  return (
  <div>
    {user ? <HomeScreen/>  :  <AuthScreen/>}
    </div>
  )
}

export default HomePage
