import 'bulma/css/bulma.min.css';
import { Body } from './components/body';
import { Header } from './components/header';

export const App = (): JSX.Element => (
  <section className='section'>
    <div className='box container'>
      <Header />
      <Body />
    </div>
  </section>
);

export default App;
