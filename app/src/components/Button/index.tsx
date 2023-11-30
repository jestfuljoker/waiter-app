import type { ReactNode } from 'react';
import type { TouchableOpacityProps } from 'react-native';

import { Text } from '../Text';
import * as S from './styles';

interface ButtonProps extends TouchableOpacityProps {
	children: ReactNode;
}

export function Button({ children, ...props }: ButtonProps) {
	return (
		<S.Container {...props}>
			<Text weight="600" color="#fff">
				{children}
			</Text>
		</S.Container>
	);
}
