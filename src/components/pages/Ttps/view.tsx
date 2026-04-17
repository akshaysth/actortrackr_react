import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PageContent from "../../ui/page-content";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Label } from "../../ui/label";
import { Separator } from "../../ui/separator";

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

  useEffect(() => {
    fetch(`http://localhost:3001/api/ttps/${ttpId}`)
      .then((res) => res.json())
      .then((data) => setTtp(data));
  }, [ttpId]);

  const title = "TTP: " + (ttpId ?? "Unknown");

  if (!ttp) return <PageContent title={title}><p>Loading...</p></PageContent>;

  return (
    <PageContent title={title}>
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
            <CardHeader>
              <CardTitle>Related</CardTitle>
            </CardHeader>
            <div>
              <Label htmlFor="related-actors">Actors</Label>
              <Input type="text" name="related-actors" id="related-actors" disabled />
            </div>
          </div>
        </CardContent>
      </Card>
    </PageContent>
  );
};

export default TTPView;
