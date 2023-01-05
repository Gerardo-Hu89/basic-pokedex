import 'bulma/css/bulma.min.css';
import { Body } from './components/body';
import { Header } from './components/header';

export const App = (): JSX.Element => (
  <div
    className='section is-fullheight'
    style={{
      background: '#fff url("https://assets.pokemon.com/static2/_ui/img/chrome/container_bg.png")',
    }}
  >
    <div className='box container'>
      <Header />
      <Body />
    </div>
  </div>
);

export default App;
