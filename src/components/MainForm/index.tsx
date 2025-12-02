import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { Input } from '../Input';
import { Button } from '../Button';
import { Tips } from '../Tips';
import { useRef } from 'react';
import type { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';
import { showMessage } from '../../adapters/showMessage';

export function MainForm() {
  const { state, dispatchTask } = useTaskContext();

  // const [taskName, setTaskName] = useState('');
  const taskNameInput = useRef<HTMLInputElement>(null);

  // ciclos

  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  function handleInterruptTask() {
    showMessage.dismiss();
    showMessage.error('Tarefa interrompida');
    dispatchTask({ type: TaskActionTypes.INTERRUPT_TASK });
  }

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    showMessage.dismiss();

    if (taskNameInput.current === null) return;

    const taskName = taskNameInput.current.value.trim();

    if (!taskName) {
      showMessage.warning('Por favor, insira o nome da tarefa.');
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

    dispatchTask({ type: TaskActionTypes.START_TASK, payload: newTask });

    showMessage.success('Tarefa iniciada');
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
          disabled={!!state.activeTask}
        />
      </div>
      <div className='formRow'>
        <Tips />
      </div>
      {state.currentCycle > 0 && (
        <div className='formRow'>
          <Cycles />
        </div>
      )}
      <div className='formRow'>
        {!state.activeTask && (
          <Button
            aria-label='Iniciar nova tarefa'
            title='Iniciar nova tarefa'
            type='submit'
            icon={<PlayCircleIcon />}
            key='btn_submit'
          />
        )}
        {!!state.activeTask && (
          <Button
            aria-label='Parar tarefa em andamento'
            title='Parar tarefa em andamento'
            type='button'
            color='red'
            onClick={handleInterruptTask}
            icon={<StopCircleIcon />}
            key='btn_interrupt'
          />
        )}
      </div>
    </form>
  );
}
