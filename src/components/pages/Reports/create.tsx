import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "../../ui/Page";
import Card from "../../ui/Card";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

const CreateReport = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: submit to API
    navigate("/reports");
  };

  return (
    <Page title="Create Report">
      <Card>
        <h1 className="text-2xl py-2 border-b-indigo-50 border-b-2">
          Report Details
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4">
            <div>
              <label
                htmlFor="report-title"
                className="text-lg py-2 block"
              >
                Report Title
              </label>
              <Input
                id="report-title"
                type="text"
                placeholder="Enter report title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-4">
            <Button type="submit">Create Report</Button>
          </div>
        </form>
      </Card>
    </Page>
  );
};

export default CreateReport;