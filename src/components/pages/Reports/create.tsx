import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PageContent from "../../ui/page-content";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";

const CreateReport = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Validation error", { description: "Report title is required." });
      return;
    }
    toast.success("Report created", { description: `${title} has been added.` });
    navigate("/reports");
  };

  return (
    <PageContent title="Create Report">
      <Card>
        <CardHeader>
          <CardTitle>Report Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="report-title" className="mb-2 block">
                  Report Title
                </Label>
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
        </CardContent>
      </Card>
    </PageContent>
  );
};

export default CreateReport;
