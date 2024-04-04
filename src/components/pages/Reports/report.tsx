import { useParams } from "react-router-dom";
import LayoutHeader from "../../Layout/header";

const Report = () => {
  const { reportId } = useParams();
  const title = "Report: " + reportId;
  console.log(title);
  return (
    <>
      <LayoutHeader title={title} />
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="container"></div>
        </div>
      </main>
    </>
  );
};

export default Report;
