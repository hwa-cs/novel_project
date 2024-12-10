import Header from './components/Header'
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer'
import { LoginCheckProvider } from './context/LoginCheck';

const App = () => {
  return (
      <LoginCheckProvider>
          <Header />
          <Outlet />
          <Footer />
      </LoginCheckProvider>
    )
}

export default App