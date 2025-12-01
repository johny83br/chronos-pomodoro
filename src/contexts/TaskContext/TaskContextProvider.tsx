import { useEffect, useReducer } from 'react';
import { initialTaskState } from './initialTaskState';
import { TaskContext } from './TaskContext';
import { taskReducer } from './taskReducer';
import { TimerWorkerManager } from '../../workers/TimerWorkerManager';
import { TaskActionTypes } from './taskActions';

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatchTask] = useReducer(taskReducer, initialTaskState);

  const worker = TimerWorkerManager.getInstance();

  worker.onmessage((event: MessageEvent) => {
    const countDownSeconds = event.data;
    console.log('Message from worker:', event.data);

    if (countDownSeconds <= 0) {
      console.log('Worker COMPLETED');
      dispatchTask({
        type: TaskActionTypes.COMPLETE_TASK,
      });
      worker.terminate();
    } else {
      dispatchTask({
        type: TaskActionTypes.COUNT_DOWN,
        payload: { secondsRemaining: countDownSeconds },
      });
    }
    // Here you can handle messages from the worker and dispatch actions if needed
  });

  useEffect(() => {
    if (!state.activeTask) {
      console.log('No active task, terminating worker.');
      worker.terminate();
    }
    worker.postMessage(state);
    console.log('TaskContext state changed:', state);
  }, [worker, state]);

  return (
    <TaskContext.Provider value={{ state, dispatchTask }}>
      {children}
    </TaskContext.Provider>
  );
}
