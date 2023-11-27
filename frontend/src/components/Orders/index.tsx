import type { ReactElement } from 'react';

import { OrdersBoard } from '../OrdersBoard';
import * as S from './styles';

const orders = [
	{
		table: '3',
		status: 'WAITING',
		products: [
			{
				product: {
					name: 'Coca cola',
					description: 'Coquinha gelada',
					imagePath: '1700394637268-coca-cola.png',
					price: 7,
					ingredients: [],
					category: '6558c9a845ac30c10ecff22f',
					id: '6559f68d0cc7e4c282ea7e2c',
				},
				quantity: 2,
				id: '655a35925f8eba777eb18709',
			},
			{
				product: {
					name: 'Coca cola',
					description: 'Coquinha gelada',
					imagePath: '1700394637268-coca-cola.png',
					price: 7,
					ingredients: [],
					category: '6558c9a845ac30c10ecff22f',
					id: '6559f68d0cc7e4c282ea7e2c',
				},
				quantity: 2,
				id: '655a35925f8eba777eb187091',
			},
			{
				product: {
					name: 'Coca cola',
					description: 'Coquinha gelada',
					imagePath: '1700394637268-coca-cola.png',
					price: 7,
					ingredients: [],
					category: '6558c9a845ac30c10ecff22f',
					id: '6559f68d0cc7e4c282ea7e2c',
				},
				quantity: 2,
				id: '655a35925f8eba777eb187092',
			},
		],
		createdAt: '2023-11-19T16:19:30.885Z',
		id: '655a35925f8eba777eb18708',
	},
	{
		table: '3',
		status: 'WAITING',
		products: [
			{
				product: {
					name: 'Coca cola',
					description: 'Coquinha gelada',
					imagePath: '1700394637268-coca-cola.png',
					price: 7,
					ingredients: [],
					category: '6558c9a845ac30c10ecff22f',
					id: '6559f68d0cc7e4c282ea7e2c',
				},
				quantity: 2,
				id: '655a38f35f8eba777eb1870f',
			},
		],
		createdAt: '2023-11-19T16:33:55.055Z',
		id: '655a38f35f8eba777eb1870e',
	},
	{
		table: '4',
		status: 'WAITING',
		products: [
			{
				product: {
					name: 'Pizza 4 queijos',
					description: 'Deliciosa pizza 4 queijos com borda simples',
					imagePath: '1700393839643-quatro-queijos.png',
					price: 40,
					ingredients: [
						{
							name: 'Mussarela',
							icon: '🧀',
							id: '6559f36f68c9989bc714ca62',
						},
						{
							name: 'Parmesão',
							icon: '🧀',
							id: '6559f36f68c9989bc714ca63',
						},
						{
							name: 'Gouda',
							icon: '🧀',
							id: '6559f36f68c9989bc714ca64',
						},
						{
							name: 'Brie',
							icon: '🧀',
							id: '6559f36f68c9989bc714ca65',
						},
					],
					category: '6558c95545ac30c10ecff22c',
					id: '6559f36f68c9989bc714ca61',
				},
				quantity: 2,
				id: '655b5d4085522130f877faaf',
			},
		],
		createdAt: '2023-11-20T13:21:04.095Z',
		id: '655b5d4085522130f877faae',
	},
];

export function Orders(): ReactElement {
	return (
		<S.Container>
			<OrdersBoard icon="🕑" title="Pedidos" orders={orders} />
			<OrdersBoard icon="👨‍🍳" title="Em preparação" orders={[]} />
			<OrdersBoard icon="✅" title="Pronto" orders={[]} />
		</S.Container>
	);
}
