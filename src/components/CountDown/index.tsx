import type { TaskStateModel } from '../../models/TaskStateModel';
import styles from './styles.module.css';

type CountDownProps = {
  formatedSecondsRemaining: string;
};

export function CountDown({ formatedSecondsRemaining }: CountDownProps) {
  return <div className={styles.container}>{formatedSecondsRemaining}</div>;
}
