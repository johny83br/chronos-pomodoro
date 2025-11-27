import { PlayCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { Input } from '../Input';
import { Button } from '../Button';

export function MainForm() {
  return (
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
  );
}
