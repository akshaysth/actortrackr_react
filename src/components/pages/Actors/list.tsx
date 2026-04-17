import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getActors } from "../../../services/actorService";
import { Actor } from "../../../types/actor.types";
import PageContent from "../../ui/page-content";
import { Button } from "../../ui/button";
import DataTable, { type Column } from "../../ui/data-table";

const ActorList: React.FC = () => {
  const [actors, setActors] = useState<Actor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const fetchActors = async () => {
      try {
        setLoading(true);
        const response = await getActors();
        if (mounted) {
          setActors(response.data);
          setError(null);
        }
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

  const columns: Column<Actor>[] = [
    {
      key: "name",
      header: "Actor Name",
      accessorKey: "name",
      isSortable: true,
    },
  ];

  return (
    <PageContent title="Actors">
      <div className="flex justify-end items-center mb-4 gap-3">
        <p className="text-sm text-muted-foreground">
          {actors.length} total
        </p>
        <Link to="/actors/create">
          <Button>Create New Actor</Button>
        </Link>
      </div>
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
          {error}
        </div>
      )}
      {loading ? (
        <div className="text-center text-muted-foreground py-8">Loading actors...</div>
      ) : (
        <DataTable
          columns={columns}
          data={actors}
          searchKey="name"
          searchPlaceholder="Search actors..."
        />
      )}
    </PageContent>
  );
};

export default ActorList;
