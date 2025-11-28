import { useEffect, useReducer } from 'react';
import { initialTaskState } from './initialTaskState';
import { TaskContext } from './TaskContext';
import { taskReducer } from './taskReducer';

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatchTask] = useReducer(taskReducer, initialTaskState);

  useEffect(() => {
    console.log('TaskContext state changed:', state);
  }, [state]);

  return (
    <TaskContext.Provider value={{ state, dispatchTask }}>
      {children}
    </TaskContext.Provider>
  );
}
