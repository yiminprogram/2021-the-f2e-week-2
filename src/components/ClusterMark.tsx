import { Box, styled } from '@mui/material';

const Circle = styled('span')`
  display: inline-flex;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  color: #fff;
  background-color: #1e88e5;
  font-weight: 700;
  box-shadow: 0 0 0 3px #fff, 0 0 0 6px #1e88e5;
`;

type TProps = {
  count: number;
};

const ClusterMark = ({ count }: TProps) => {
  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
      <Circle>{count}</Circle>
    </Box>
  );
};

export default ClusterMark;
