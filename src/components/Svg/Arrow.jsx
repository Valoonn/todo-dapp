import styled from 'styled-components';

const Arrow = ({
  size = '20px',
  color = 'green',
  width = '2',
  $hovercolor = 'blue',
  cursor = 'default',
  rotate = false,
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      $hovercolor={$hovercolor}
      cursor={cursor}
      $rotate={rotate}
    >
      <path
        d='M17 15L12 10L7 15'
        stroke={color}
        strokeWidth={width}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
}


const Svg = styled.svg`
  cursor: ${(props) => props.cursor};
  transform: ${(props) => props.$rotate ? 'rotate(180deg)' : 'none'};
  transition: transform 0.5s ease;

  &:hover {
    path {
      stroke: ${(props) => props.$hovercolor};
    }
  }
`;

export default Arrow;