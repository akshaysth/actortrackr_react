import LayoutHeader from "../../Layout/header";

const Homepage = ({ title }) => {
  return (
    <>
      <LayoutHeader title="Dashboard" />
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="container"></div>
        </div>
      </main>
    </>
  );
};

export default Homepage;
