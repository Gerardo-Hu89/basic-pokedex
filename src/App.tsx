import 'bulma/css/bulma.min.css';
import { Body } from './components/body';
import { GoToTopButton } from './components/goToTopButton';
import { Header } from './components/header';
import { AppProvider } from './context/appContext';

export const App = (): JSX.Element => (
  <div
    className='section is-fullheight'
    style={{
      background: '#fff url("https://assets.pokemon.com/static2/_ui/img/chrome/container_bg.png")',
    }}
  >
    <AppProvider>
      <div className='box container'>
        <Header />
        <Body />
        <GoToTopButton />
      </div>
    </AppProvider>
  </div>
);

export default App;
