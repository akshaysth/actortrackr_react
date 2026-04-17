import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getActors } from "../../../services/actorService";
import { Actor } from "../../../types/actor.types";
import PageContent from "../../ui/page-content";
import { Button } from "../../ui/button";

const ActorList: React.FC = () => {
  const [actors, setActors] = useState<Actor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const fetchActors = async () => {
      try {
        const response = await getActors();
        if (mounted) setActors(response.data);
      } catch (err) {
        if (mounted) {
          setError("Failed to fetch actors");
          console.error(err);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchActors();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <div>Loading actors...</div>;
  if (error) return <div className="text-destructive">{error}</div>;

  return (
    <PageContent title="Actors">
      <div className="flex justify-end text-center">
        <Link to="/actors/create">
          <Button>Create New Actor</Button>
        </Link>
      </div>
      <ul>
        {actors.map((actor) => (
          <li key={actor.id}>{actor.name}</li>
        ))}
      </ul>
    </PageContent>
  );
};

export default ActorList;
