import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import PageContent from "../../ui/page-content";
import { Button } from "../../ui/button";
import DataTable, { type Column } from "../../ui/data-table";
import {
  HiOutlineEye,
  HiOutlinePencilAlt,
  HiOutlineTrash,
} from "react-icons/hi";
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
import { Skeleton } from "../../ui/skeleton";

interface TTP {
  id: number;
  name: string;
  description: string;
}

const TTPList = () => {
  const [ttps, setTtps] = useState<TTP[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; ttp: TTP | null }>({
    open: false,
    ttp: null,
  });
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch("http://localhost:3001/api/ttps")
      .then((res) => res.json())
      .then((data) => {
        if (mounted) {
          setTtps(data);
          setError(null);
          setLoading(false);
        }
      })
      .catch(() => {
        if (mounted) {
          const msg = "Failed to load TTPs";
          setError(msg);
          toast.error("Error", { description: msg });
          setLoading(false);
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  const handleDelete = async (ttp: TTP) => {
    try {
      setDeleting(true);
      await fetch(`http://localhost:3001/api/ttps/${ttp.id}`, {
        method: "DELETE",
      });
      setTtps((prev) => prev.filter((t) => t.id !== ttp.id));
      toast.success("TTP deleted", { description: `${ttp.name} has been removed.` });
    } catch {
      toast.error("Error", { description: "Failed to delete TTP" });
    } finally {
      setDeleting(false);
      setDeleteDialog({ open: false, ttp: null });
    }
  };

  const columns: Column<TTP>[] = [
    {
      key: "name",
      header: "TTP",
      accessorKey: "name",
      isSortable: true,
    },
    {
      key: "description",
      header: "Description",
      accessorKey: "description",
      isSortable: true,
      render: (value: string) => value || "—",
    },
  ];

  const actions = (row: TTP) => (
    <div className="flex items-center gap-1">
      <Link to={`/ttps/${row.id}`} aria-label="View TTP">
        <Button variant="ghost" size="icon" className="size-8">
          <HiOutlineEye className="size-4" />
        </Button>
      </Link>
      <Link to={`/ttps/${row.id}/edit`} aria-label="Edit TTP">
        <Button variant="ghost" size="icon" className="size-8">
          <HiOutlinePencilAlt className="size-4" />
        </Button>
      </Link>
      <AlertDialog open={deleteDialog.open && deleteDialog.ttp?.id === row.id}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete TTP</AlertDialogTitle>
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
          onClick={() => setDeleteDialog({ open: true, ttp: row })}
          aria-label="Delete TTP"
        >
          <Button variant="ghost" size="icon" className="size-8 text-destructive">
            <HiOutlineTrash className="size-4" />
          </Button>
        </button>
      </AlertDialog>
    </div>
  );

  return (
    <PageContent title="TTPs">
      <div className="flex justify-end items-center mb-4 gap-3">
        <p className="text-sm text-muted-foreground">
          {ttps.length} total
        </p>
        <Link to="/ttps/create">
          <Button>Add new</Button>
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
          data={ttps}
          searchKey="name"
          searchPlaceholder="Search TTPs..."
          actions={actions}
        />
      )}
    </PageContent>
  );
};

export default TTPList;
