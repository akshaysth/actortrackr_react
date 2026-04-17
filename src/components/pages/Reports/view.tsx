import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PageContent from "../../ui/page-content";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../../ui/card";
import { Separator } from "../../ui/separator";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { Button } from "../../ui/button";

interface ReportData {
  name: string;
  author: string;
  content?: string;
}

const ReportView = () => {
  const { reportId } = useParams();
  const [report, setReport] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch(`http://localhost:3001/api/reports/${reportId}`)
      .then((res) => res.json())
      .then((data) => {
        if (mounted) {
          setReport(data);
          setError(null);
          setLoading(false);
        }
      })
      .catch(() => {
        if (mounted) {
          setError("Failed to load report");
          setLoading(false);
        }
      });
    return () => {
      mounted = false;
    };
  }, [reportId]);

  if (loading) {
    return <PageContent title="Report"><p className="text-center text-muted-foreground py-8">Loading...</p></PageContent>;
  }

  if (error || !report) {
    return <PageContent title="Report"><div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error || "Report not found"}</div></PageContent>;
  }

  return (
    <PageContent title={`Report: ${report.name}`}>
      <Card>
        <CardHeader>
          <CardTitle>{report.name}</CardTitle>
          <CardDescription>By {report.author}</CardDescription>
        </CardHeader>
        <CardContent>
          <Separator className="mb-4" />
          <div className="flex flex-col gap-4">
            <div>
              <Label htmlFor="content" className="mb-2 block">
                Content
              </Label>
              <Textarea
                name="content"
                id="content"
                defaultValue={report.content || "No content available."}
                rows={10}
                readOnly
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="gap-2">
          <Link to={`/reports/${reportId}/edit`}>
            <Button variant="secondary">Edit</Button>
          </Link>
          <Link to="/reports">
            <Button variant="ghost">Back to List</Button>
          </Link>
        </CardFooter>
      </Card>
    </PageContent>
  );
};

export default ReportView;
