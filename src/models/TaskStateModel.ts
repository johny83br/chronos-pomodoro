import type { TaskModel } from './TaskModel';

// Estado > Componentes > Filhos

export type TaskStateModel = {
  tasks: TaskModel[]; // Histórico, MainForm
  secondsRemaining: number; // CountDown, Histórico, MainForm, Button
  formatedSecondsRemaining: string; // Título, CountDown
  activeTask: TaskModel | null; // CountDown, Histórico, MainForm, Button
  currentCycle: number; // Home
  config: {
    workTime: number; // MainForm
    shortBreakTime: number; // Mainform
    longBreakTime: number; // Mainform
  };
};
