import { useParams } from "react-router-dom";
import Page from "../../ui/Page";
import Card from "../../ui/Card";

const Report = () => {
  const { reportId } = useParams();
  const title = "Report: " + (reportId ?? "Unknown");

  return (
    <Page title={title}>
      <Card>
        <div className="container"></div>
      </Card>
    </Page>
  );
};

export default Report;