import styled from 'styled-components';

const Cross = ({
  size = "20px",
  color = "red",
  width = "1.5",
  $hovercolor = "blue",
  onClick = () => { },
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
      onClick={onClick}
      cursor={cursor}
    >
      <path
        d="M19 5L4.99998 19M5.00001 5L19 19"
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

export default Cross;