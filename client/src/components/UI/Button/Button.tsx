import { type ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
	const {
		children,
		type = 'button',
		disabled
	} = props;

	return (
		<button type={ type } disabled={ disabled } className={ styles.btn }>
			{ children }
		</button>
	);
};

export default Button;
