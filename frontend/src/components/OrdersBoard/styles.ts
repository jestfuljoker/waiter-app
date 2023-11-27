import styled, { css } from 'styled-components';

export const Container = styled.div`
	${({ theme }) => css`
		padding: 1rem;
		border: 1px solid ${theme.colors.gray['100-40%']};
		border-radius: 16px;
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 1;

		> header {
			padding: 0.5rem;
			display: flex;
			align-items: center;
			gap: 0.5rem;
			font-size: ${theme.font.sizes.xxsm};
		}
	`}
`;

export const OrdersContainer = styled.div`
	${({ theme }) => css`
		display: flex;
		flex-direction: column;
		width: 100%;
		margin-top: 1.5rem;

		button {
			background: ${theme.colors.gray['0']};
			border: 1px solid ${theme.colors.gray['100-40%']};
			height: 8rem;
			border-radius: 8px;
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 0.25rem;

			& + button {
				margin-top: 1.5rem;
			}

			strong {
				font-weight: ${theme.font.weight.medium};
			}

			span {
				font-size: ${theme.font.sizes.xxsm};
				color: ${theme.colors.gray['400']};
			}
		}
	`}
`;
