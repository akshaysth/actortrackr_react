import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PageContent from "../../ui/page-content";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../../ui/card";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Label } from "../../ui/label";
import { Separator } from "../../ui/separator";
import { Button } from "../../ui/button";
import { Skeleton } from "../../ui/skeleton";

interface TTPData {
  name: string;
  description: string;
  criticality: number;
  classification_family: string;
  classification_id: string;
}

const TTPView = () => {
  const { ttpId } = useParams();
  const [ttp, setTtp] = useState<TTPData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch(`http://localhost:3001/api/ttps/${ttpId}`)
      .then((res) => res.json())
      .then((data) => {
        if (mounted) {
          setTtp(data);
          setError(null);
          setLoading(false);
        }
      })
      .catch(() => {
        if (mounted) {
          setError("Failed to load TTP");
          setLoading(false);
        }
      });
    return () => {
      mounted = false;
    };
  }, [ttpId]);

  if (loading) {
    return (
      <PageContent title="TTP">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div>
              <Skeleton className="h-4 w-28 mb-2" />
              <Skeleton className="h-24 w-full" />
            </div>
            <div>
              <Skeleton className="h-4 w-28 mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="flex gap-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-px w-full" />
            <div>
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
          <CardFooter className="gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-28" />
          </CardFooter>
        </Card>
      </PageContent>
    );
  }

  if (error || !ttp) {
    return <PageContent title="TTP"><div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error || "TTP not found"}</div></PageContent>;
  }

  return (
    <PageContent title={`TTP: ${ttp.name}`}>
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div>
              <Label htmlFor="name" className="mb-2 block">
                Name
              </Label>
              <Input
                type="text"
                name="name"
                id="name"
                defaultValue={ttp.name}
              />
            </div>
            <div>
              <Label htmlFor="description" className="mb-2 block">
                Description
              </Label>
              <Textarea
                name="description"
                id="description"
                defaultValue={ttp.description}
              />
            </div>
            <div>
              <Label htmlFor="first-obs-date" className="mb-2 block">
                First Observed Date
              </Label>
              <Input
                type="date"
                name="first-obs-date"
                id="first-obs-date"
              />
            </div>
            <div className="flex flex-row gap-4">
              <div className="flex flex-col w-full">
                <Label htmlFor="criticality" className="mb-2 block">
                  Criticality
                </Label>
                <Input
                  type="number"
                  name="criticality"
                  id="criticality"
                  disabled
                  defaultValue={ttp.criticality}
                />
              </div>
              <div className="flex flex-col w-full">
                <Label htmlFor="family" className="mb-2 block">
                  Classification Family
                </Label>
                <Input
                  name="family"
                  id="family"
                  defaultValue={ttp.classification_family}
                  disabled
                />
              </div>
            </div>
            <Separator />
            <div>
              <Label htmlFor="related-actors">Related Actors</Label>
              <Input type="text" name="related-actors" id="related-actors" disabled />
            </div>
          </div>
        </CardContent>
        <CardFooter className="gap-2">
          <Link to={`/ttps/${ttpId}/edit`}>
            <Button variant="secondary">Edit</Button>
          </Link>
          <Link to="/ttps">
            <Button variant="ghost">Back to List</Button>
          </Link>
        </CardFooter>
      </Card>
    </PageContent>
  );
};

export default TTPView;
