import styled from 'styled-components';
import { colors } from '../constant/color';

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const SubTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 400;
  overflow: hidden;
  white-space: nowrap;
`;

export const Body = styled.p`
  font-size: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  // no new line
  white-space: nowrap;
`;

export const Link = styled.a`
  color: blue;
  text-decoration: underline;
  cursor: pointer;
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.$bgcolor || 'blue'};
  color: ${(props) => props.color || 'white'};
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  &:hover {
    background-color: ${(props) => props.$hoverbgcolor || 'darkblue'};
  }
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const Input = styled.input`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  width: 100%;
`;

export const Select = styled.select`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
`;

export const TextArea = styled.textarea`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
`;

export const Error = styled.p`
  color: red;
  font-size: 1rem;
`;

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid ${colors.border};
  border-radius: 5px;
  cursor: pointer;
  &:hover {
      background-image: url('/check.svg');
      background-size: cover;
    }
  &:checked {
    background-image: url('/check.svg');
    background-size: cover;
    &:hover {
      background-image: url('/cross.svg');
    }
  }
`;