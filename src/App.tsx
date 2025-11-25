import { Container } from './components/Container';
import { Logo } from './components/Logo';
import { Menu } from './components/Menu';
import { Input } from './components/Input';
import { CountDown } from './components/CountDown';
import { Cycles } from './components/Cycles';
import { Button } from './components/Button';
import { Footer } from './components/Footer';
import { PlayCircleIcon } from 'lucide-react';

import './styles/theme.css';
import './styles/global.css';

export function App() {
  return (
    <>
      <Container>
        <Logo />
      </Container>
      <Container>
        <Menu />
      </Container>
      <Container>
        <CountDown />
      </Container>
      <Container>
        <form className='form' action=''>
          <div className='formRow'>
            <Input
              id='meuInput'
              labelText='Task:'
              type='text'
              placeholder='Digite algo'
            />
          </div>
          <div className='formRow'>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
          <div className='formRow'>
            <Cycles></Cycles>
          </div>
          <div className='formRow'>
            <Button icon={<PlayCircleIcon />}></Button>
          </div>
        </form>
      </Container>
      <Container>
        <Footer />
      </Container>
    </>
  );
}
