import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createActor } from "../../../services/actorService";
import PageContent from "../../ui/page-content";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { FormField } from "../../ui/form-field";

const CreateActor: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim()) {
      setError("Actor name cannot be empty.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await createActor({ name });
      navigate("/actors");
    } catch (err) {
      setError(
        "Failed to create actor. Please ensure the server is running and try again."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContent title="Create New Threat Actor">
      <h1>Create New Threat Actor</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 mt-4">
          <FormField label="Actor Name" error={error} id="actor-name">
            <Input
              id="actor-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              required
            />
          </FormField>
        </div>
        <div className="mt-4">
          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Actor"}
          </Button>
        </div>
        {error && <p className="text-destructive">{error}</p>}
      </form>
    </PageContent>
  );
};

export default CreateActor;
