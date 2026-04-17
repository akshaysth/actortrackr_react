import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { getActors, deleteActor } from "../../../services/actorService";
import { Actor } from "../../../types/actor.types";
import PageContent from "../../ui/page-content";
import { Button } from "../../ui/button";
import DataTable, { type Column } from "../../ui/data-table";
import { Skeleton } from "../../ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../ui/alert-dialog";
import { Trash2 } from "lucide-react";

const ActorList: React.FC = () => {
  const [actors, setActors] = useState<Actor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; actor: Actor | null }>({
    open: false,
    actor: null,
  });
  const [deleting, setDeleting] = useState(false);

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
          const msg = "Failed to fetch actors";
          setError(msg);
          toast.error("Error", { description: msg });
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

  const handleDelete = async (actor: Actor) => {
    try {
      setDeleting(true);
      await deleteActor(actor.id);
      setActors((prev) => prev.filter((a) => a.id !== actor.id));
      toast.success("Actor deleted", { description: `${actor.name} has been removed.` });
    } catch {
      toast.error("Error", { description: "Failed to delete actor" });
    } finally {
      setDeleting(false);
      setDeleteDialog({ open: false, actor: null });
    }
  };

  const columns: Column<Actor>[] = [
    {
      key: "name",
      header: "Actor Name",
      accessorKey: "name",
      isSortable: true,
    },
  ];

  const actions = (row: Actor) => (
    <div className="flex items-center gap-1">
      <AlertDialog open={deleteDialog.open && deleteDialog.actor?.id === row.id}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Actor</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{row.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDelete(row)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
        <button
          onClick={() => setDeleteDialog({ open: true, actor: row })}
          aria-label="Delete actor"
        >
          <Button variant="ghost" size="icon" className="size-8 text-destructive">
            <Trash2 className="size-4" />
          </Button>
        </button>
      </AlertDialog>
    </div>
  );

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
        <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm" role="alert" aria-live="assertive">
          {error}
        </div>
      )}
      {loading ? (
        <div className="space-y-3">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={actors}
          searchKey="name"
          searchPlaceholder="Search actors..."
          actions={actions}
        />
      )}
    </PageContent>
  );
};

export default ActorList;
