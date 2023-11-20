import type { ReactElement } from 'react';

import type { Order } from '~/@types/global';

import * as S from './styles';

interface BoardProps {
	icon: string;
	title: string;
	orders: Order[];
}

export function Board({ icon, title }: BoardProps): ReactElement {
	return (
		<S.Container>
			<header>
				<span>{icon}</span>
				<strong>{title}</strong>
				<span>(1)</span>
			</header>

			<S.OrdersContainer>
				<button type="button">
					<strong>Mesa 2</strong>
					<span>2 items</span>
				</button>

				<button type="button">
					<strong>Mesa 2</strong>
					<span>2 items</span>
				</button>
			</S.OrdersContainer>
		</S.Container>
	);
}
