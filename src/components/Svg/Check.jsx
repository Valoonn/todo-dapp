import styled from 'styled-components';

const Check = ({
  size = "20px",
  color = "green",
  width = "2",
  $hovercolor = "blue",
  cursor = 'pointer'
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      $hovercolor={$hovercolor}
      cursor={cursor}
    >
      <path
        d="M4 12.6111L8.92308 17.5L20 6.5"
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}


const Svg = styled.svg`
  cursor: ${(props) => props.cursor};

  &:hover {
    path {
      stroke: ${(props) => props.$hovercolor};
    }
  }
`;

export default Check;