import styled, { css } from 'styled-components';

export const Container = styled.header`
	${({ theme }) => css`
		background-color: ${theme.colors.brand.primary};
		display: flex;
		justify-content: center;
		align-items: center;
		height: 12.375rem;
	`}
`;

export const Content = styled.div`
	${({ theme }) => css`
		width: 100%;
		max-width: 76rem;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.page-details {
			h1 {
				color: ${theme.colors.gray[0]};
				font-size: ${theme.font.sizes.lg};
			}

			h2 {
				margin-top: 0.375rem;
				color: ${theme.colors.gray[0]};
				font-weight: ${theme.font.weight.regular};
				font-size: ${theme.font.sizes.xs};
				opacity: 0.9;
			}
		}
	`}
`;
