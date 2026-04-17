import { useParams } from "react-router-dom";
import PageContent from "../../ui/page-content";
import { Card } from "../../ui/card";

const Report = () => {
  const { reportId } = useParams();
  const title = "Report: " + (reportId ?? "Unknown");

  return (
    <PageContent title={title}>
      <Card />
    </PageContent>
  );
};

export default Report;