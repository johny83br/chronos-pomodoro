import { PlayCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { Input } from '../Input';
import { Button } from '../Button';
import { useRef } from 'react';
import type { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import { formatSecondsToMinutes } from '../../utils/formatSecondsToMinutes';

export function MainForm() {
  const { state, setState } = useTaskContext();

  // const [taskName, setTaskName] = useState('');
  const taskNameInput = useRef<HTMLInputElement>(null);

  // ciclos

  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (taskNameInput.current === null) return;

    const taskName = taskNameInput.current.value.trim();

    if (!taskName) {
      alert('Por favor, insira o nome da tarefa.');
      return;
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    };

    const secondsRemaining = newTask.duration * 60;

    setState(prevState => ({
      ...prevState,
      config: { ...prevState.config },
      activeTask: newTask,
      currentCycle: nextCycle,
      secondsRemaining,
      formatedSecondsRemaining: formatSecondsToMinutes(secondsRemaining),
      tasks: [...prevState.tasks, newTask],
    }));
  }

  return (
    <form onSubmit={handleCreateNewTask} className='form' action=''>
      <div className='formRow'>
        <Input
          id='meuInput'
          labelText='Task:'
          type='text'
          placeholder='Digite algo'
          ref={taskNameInput}
          // onChange={e => {
          //   setTaskName(e.target.value);
          // }}
          // value={taskName}
        />
      </div>
      <div className='formRow'>
        <p>Próximo intervalo é de {state.config.workTime}min.</p>
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
