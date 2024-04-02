const Homepage = ({ title }) => {
  return <div>{title[0].toUpperCase() + title.slice(1)}</div>;
};

export default Homepage;
