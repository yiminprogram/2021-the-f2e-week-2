import StationCard from '../components/StationCard';

const Station = () => {
  return (
    <>
      {[...Array(5)].map((ele, idx) => (
        <StationCard key={idx} />
      ))}
    </>
  );
};

export default Station;
