import { ChangeEvent, useState } from 'react';
import styles from './Form.module.scss';
import Button from '../UI/Button/Button.tsx';

type FormProps = {
	isFetching: boolean;
	onSubmit: (arg: number) => Promise<void>;
}

const Form = ({ isFetching, onSubmit }: FormProps) => {
	const [inputValue, setInputValue] = useState('');
	const [error, setError] = useState<string>('');

	const submitHandler = (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (+inputValue >= 1 && +inputValue <= 100) {
			setError('');
			onSubmit(+inputValue);
		} else {
			setError('Enter value from 1 to 100');
		}
	};

	return (
		<form className={ styles.form } onSubmit={ submitHandler }>
			<label htmlFor='input' className={ styles.form__label }>
				<input
					id='input'
					name='input'
					type='number'
					min='1'
					max='100'
					value={ inputValue }
					className={ styles.form__input }
					onChange={ e => setInputValue(e.target.value) }
				/>
			</label>
			<Button type='submit' disabled={ isFetching }>
				{ isFetching ? 'Fetching...' : 'Start' }
			</Button>
			{ error && <p className={styles.form__error}>{error}</p> }
		</form>
	);
};

export default Form;
