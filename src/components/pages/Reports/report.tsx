import { useParams } from "react-router-dom";

const Report = () => {
  const { reportId } = useParams();
  return (
    <>
      <div className="container">
        <h1>Report: {reportId}</h1>
        <p></p>
      </div>
    </>
  );
};

export default Report;
