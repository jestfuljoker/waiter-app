import styled from 'styled-components/native';

export const Overlay = styled.KeyboardAvoidingView`
	background: rgba(0, 0, 0, 0.6);
	flex: 1;
	align-items: stretch;
	justify-content: center;
	padding: 0 24px;
`;

export const Body = styled.View`
	background: #fafafa;
	border-radius: 8px;
	padding: 24px;
`;

export const Header = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

export const Form = styled.View`
	margin-top: 32px;
`;

export const Input = styled.TextInput`
	padding: 16px;
	border-radius: 8px;
	border: 1px solid rgba(204, 204, 204, 0.5);
	background: #ffffff;
	margin-bottom: 24px;
`;
