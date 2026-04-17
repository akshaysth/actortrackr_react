import { Link } from "react-router-dom";
import PageContent from "../../ui/page-content";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../ui/card";
import { Button } from "../../ui/button";

const Homepage = ({ title }: { title: string }) => {
  return (
    <PageContent title={title}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Actors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">—</div>
            <p className="text-xs text-muted-foreground mt-1">Total threat actors</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">TTPs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">—</div>
            <p className="text-xs text-muted-foreground mt-1">Total tactics, techniques & procedures</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">—</div>
            <p className="text-xs text-muted-foreground mt-1">Total reports generated</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Threat Actors</CardTitle>
            <CardDescription>Manage and track threat actor profiles</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/actors">
              <Button className="w-full">View Actors</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>TTPs</CardTitle>
            <CardDescription>View and manage tactics, techniques & procedures</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/ttps">
              <Button className="w-full">View TTPs</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Reports</CardTitle>
            <CardDescription>Generate and view threat intelligence reports</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/reports">
              <Button className="w-full">View Reports</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Create New</CardTitle>
            <CardDescription>Quick actions to add new entries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <Link to="/actors/create">
                <Button variant="outline" className="w-full">New Actor</Button>
              </Link>
              <Link to="/ttps/create">
                <Button variant="outline" className="w-full">New TTP</Button>
              </Link>
              <Link to="/reports/create">
                <Button variant="outline" className="w-full">New Report</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContent>
  );
};

export default Homepage;
