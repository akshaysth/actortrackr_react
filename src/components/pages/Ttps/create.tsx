import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PageContent from "../../ui/page-content";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";

const TTPCreate = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Validation error", { description: "TTP name is required." });
      return;
    }
    toast.success("TTP created", { description: `${name} has been added.` });
    navigate("/ttps");
  };

  return (
    <PageContent title="Create TTP">
      <Card>
        <CardHeader>
          <CardTitle>TTP Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="ttp-name" className="mb-2 block">
                  TTP Name
                </Label>
                <Input
                  id="ttp-name"
                  type="text"
                  placeholder="Enter TTP name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="ttp-description" className="mb-2 block">
                  TTP Description
                </Label>
                <Textarea
                  id="ttp-description"
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
        </CardContent>
      </Card>
    </PageContent>
  );
};

export default TTPCreate;
