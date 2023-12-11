import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

import { getColor, getFontSize } from '~/styles/theme';
import type { Color, FontSize, FontWeight } from '~/styles/theme/types';

interface TextProps {
	weight?: FontWeight;
	size?: FontSize;
	color?: Color;
	opacity?: number;
}

export const Text = styled.Text<TextProps>`
	${({ theme, weight, color, size, opacity }) => css`
		font-family: ${weight ? theme.font.weight[weight] : theme.font.weight.regular};
		color: ${color ? getColor(color, theme) : theme.colors.gray[500]};
		font-size: ${size
			? `${RFValue(getFontSize(size, theme))}px`
			: `${RFValue(theme.font.sizes['body-md'])}px`};
		opacity: ${opacity || 1};
	`}
`;
