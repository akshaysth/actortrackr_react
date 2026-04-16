import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createActor } from "../../../services/actorService";
import Page from "../../ui/Page";

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
      // On success, navigate back to the actor list
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
    <Page title="Create New Threat Actor">
      <div>
        <h1>Create New Threat Actor</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="actor-name">Actor Name: </label>
            <input
              id="actor-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Actor"}
          </button>
          {error && <p className="text-red-600">{error}</p>}
        </form>
      </div>
    </Page>
  );
};

export default CreateActor;
