import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getActors } from "../../../services/actorService";
import { Actor } from "../../../types/actor.types";
import Page from "../../ui/Page";
import Button from "../../ui/Button";

const ActorList: React.FC = () => {
  const [actors, setActors] = useState<Actor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActors = async () => {
      try {
        const response = await getActors();
        setActors(response.data);
      } catch (err) {
        setError("Failed to fetch actors");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchActors();
  }, []);

  if (loading) return <div>Loading actors...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <Page title="Actors">
      <div className="flex justify-between text-center">
        <Link to="/actors/create">
          <Button>Create New Actor</Button>
        </Link>
      </div>
      <ul>
        {actors.map((actor) => (
          <li key={actor.id}>{actor.name}</li>
        ))}
      </ul>
    </Page>
  );
};

export default ActorList;
