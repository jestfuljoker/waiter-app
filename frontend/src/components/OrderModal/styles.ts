import styled, { css, keyframes } from 'styled-components';

interface ModalProps {
	$isLeaving: boolean;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const scaleIn = keyframes`
  from {
    transform: scale(0);
  }

  to {
    transform: scale(1);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

const scaleOut = keyframes`
  from {
    transform: scale(1);
  }

  to {
    transform: scale(0);
  }
`;

export const Overlay = styled.div<ModalProps>`
	${({ $isLeaving }) => css`
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		background: rgba(0, 0, 0, 0.8);
		backdrop-filter: blur(4.5px);
		display: flex;
		align-items: center;
		justify-content: center;
		animation: ${fadeIn} 0.3s;

		${$isLeaving &&
		css`
			animation: ${fadeOut} 0.2s forwards;
		`}
	`}
`;

export const Body = styled.div<ModalProps>`
	${({ theme, $isLeaving }) => css`
		background: ${theme.colors.gray[0]};
		width: 30rem;
		border-radius: 8px;
		padding: 2rem;
		animation: ${scaleIn} 0.3s;

		${$isLeaving &&
		css`
			animation: ${scaleOut} 0.2s forwards;
		`}

		header {
			display: flex;
			justify-content: space-between;
			align-items: center;

			strong {
				font-size: ${theme.font.sizes.md};
			}

			button {
				line-height: 0;
				border: 0;
				background: transparent;
			}
		}
	`}
`;

export const StatusContainer = styled.div`
	${({ theme }) => css`
		margin-top: 2rem;

		small {
			font-size: ${theme.font.sizes.xxsm};
			opacity: 0.8;
		}

		div {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			margin-top: 0.5rem;
		}
	`}
`;

export const OrderDetails = styled.div`
	${({ theme }) => css`
		margin-top: 2rem;

		> strong {
			font-weight: ${theme.font.weight.medium};
			font-size: ${theme.font.sizes.xxsm};
			opacity: 0.8;
		}

		.order-items {
			margin-top: 1rem;

			.item {
				display: flex;

				& + .item {
					margin-top: 1rem;
				}

				img {
					border-radius: 6px;
				}

				.quantity {
					font-size: ${theme.font.sizes.xxsm};
					color: ${theme.colors.gray[400]};
					display: block;
					min-width: 1.25rem;
					margin-left: 0.75rem;
				}

				.product-details {
					margin-left: 0.25rem;

					strong {
						display: block;
						margin-bottom: 0.25rem;
					}

					span {
						font-size: ${theme.font.sizes.xxsm};
						color: ${theme.colors.gray[400]};
					}
				}
			}
		}

		.total {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 1.5rem;

			span {
				font-weight: ${theme.font.weight.medium};
				font-size: ${theme.font.sizes.xxsm};
				opacity: 0.8;
			}
	`}
`;

export const Actions = styled.footer`
	${({ theme }) => css`
		display: flex;
		flex-direction: column;
		margin-top: 2rem;

		.primary {
			background-color: ${theme.colors.gray[500]};
			border-radius: 48px;
			border: 0;
			color: ${theme.colors.gray[0]};
			padding: 0.75rem 1.5rem;
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 0.5rem;
		}

		.secondary {
			padding: 0.875rem 1.5rem;
			color: ${theme.colors.brand.primary};
			font-weight: ${theme.font.weight.bold};
			border: 0;
			background: transparent;
			margin-top: 0.75rem;
		}
	`}
`;
