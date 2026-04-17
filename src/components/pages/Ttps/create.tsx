import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "../../ui/Page";
import { Card } from "../../ui/card";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

const TTPCreate = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: submit to API
    navigate("/ttps");
  };

  return (
    <Page title="Create TTP">
      <Card>
        <h1 className="text-2xl py-2 border-b-indigo-50 border-b-2">
          TTP Details
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4">
            <div>
              <label
                htmlFor="ttp-name"
                className="text-lg py-2 block"
              >
                TTP Name
              </label>
              <Input
                id="ttp-name"
                type="text"
                placeholder="Enter TTP name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="ttp-description"
                className="text-lg py-2 block"
              >
                TTP Description
              </label>
              <textarea
                id="ttp-description"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter TTP description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <div className="mt-4">
            <Button type="submit">Create TTP</Button>
          </div>
        </form>
      </Card>
    </Page>
  );
};

export default TTPCreate;
