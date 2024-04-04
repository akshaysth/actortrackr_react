import LayoutHeader from "../../Layout/header";

const Actor = ({ title }) => {
  return (
    <>
      <LayoutHeader title="Actors" />
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="container"></div>
        </div>
      </main>
    </>
  );
};

export default Actor;
