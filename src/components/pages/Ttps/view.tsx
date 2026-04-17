import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Page from "../../ui/Page";
import Card from "../../ui/Card";
import { Input } from "../../ui/input";

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

  if (!ttp) return <Page title={title}><p>Loading...</p></Page>;

  return (
    <Page title={title}>
      <Card>
        <div className="row">
          <h1 className="text-2xl my-2">Overview</h1>
          <div className="py-2 border-t-purple-50 border-t-2 flex flex-col gap-2">
            <div>
              <label
                htmlFor="name"
                className="text-gray-700 font-bold mt-2"
              >
                Name
              </label>
              <Input
                type="text"
                name="name"
                id="name"
                defaultValue={ttp.name}
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="text-gray-700 font-bold mt-2"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                className="w-full border p-2 rounded-md"
                defaultValue={ttp.description}
              />
            </div>
            <div>
              <label
                htmlFor="first-obs-date"
                className="text-gray-700 font-bold mt-2"
              >
                First Observed Date
              </label>
              <Input
                type="date"
                name="first-obs-date"
                id="first-obs-date"
              />
            </div>
            <div className="flex flex-row space-x-8">
              <div className="flex flex-col w-full">
                <label
                  htmlFor="criticality"
                  className="text-gray-700 font-bold mt-2"
                >
                  Criticality
                </label>
                <Input
                  type="number"
                  name="criticality"
                  id="criticality"
                  disabled
                  defaultValue={ttp.criticality}
                />
              </div>
              <div className="flex flex-col w-full">
                <label
                  htmlFor="family"
                  className="text-gray-700 font-bold mt-2"
                >
                  Classification Family
                </label>
                <Input
                  name="family"
                  id="family"
                  defaultValue={ttp.classification_family}
                  disabled
                />
              </div>
            </div>
            <hr className="border-t-indigo-400 mt-8" />
            <h1 className="text-2xl my-2">Related</h1>
            <div className="flex flex-col">
              <label htmlFor="related-actors">Actors</label>
              <Input type="text" name="related-actors" id="related-actors" disabled />
            </div>
          </div>
        </div>
      </Card>
    </Page>
  );
};

export default TTPView;