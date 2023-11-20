import type { ReactElement } from 'react';

import { Board } from '../Board';
import * as S from './styles';

export function Orders(): ReactElement {
	return (
		<S.Container>
			<Board icon="🕑" title="Pedidos" orders={[]} />
			<Board icon="👨‍🍳" title="Em preparação" orders={[]} />
			<Board icon="✅" title="Pronto" orders={[]} />
		</S.Container>
	);
}
