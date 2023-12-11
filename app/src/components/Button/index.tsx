import { type ReactNode } from 'react';
import { ActivityIndicator, type TouchableOpacityProps } from 'react-native';

import { Text } from '../Text';
import * as S from './styles';

interface ButtonProps extends TouchableOpacityProps {
	children: ReactNode;
	loading?: boolean;
}

export function Button({ children, loading, ...props }: ButtonProps) {
	return (
		<S.Container {...props} disabled={props.disabled || loading}>
			{!loading ? (
				<Text weight="bold" color="gray-0">
					{children}
				</Text>
			) : (
				<ActivityIndicator color="#fff" />
			)}
		</S.Container>
	);
}
