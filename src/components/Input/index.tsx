import styles from './styles.module.css';

type InputProps = {
  id: string;
  labelText: string;
} & React.ComponentProps<'input'>;

export function Input({ id, labelText, type, ...rest }: InputProps) {
  return (
    <>
      <label htmlFor={id}>{labelText}</label>
      <input className={styles.input} type={type} id={id} {...rest} />
    </>
  );
}
