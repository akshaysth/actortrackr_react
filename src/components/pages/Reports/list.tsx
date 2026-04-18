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

interface Report {
  id: number;
  name: string;
  author: string;
}

const ReportsIndex = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; report: Report | null }>({
    open: false,
    report: null,
  });
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch("http://localhost:3001/api/reports")
      .then((res) => res.json())
      .then((data) => {
        if (mounted) {
          setReports(data);
          setError(null);
          setLoading(false);
        }
      })
      .catch(() => {
        if (mounted) {
          const msg = "Failed to load reports";
          setError(msg);
          toast.error("Error", { description: msg });
          setLoading(false);
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  const handleDelete = async (report: Report) => {
    try {
      setDeleting(true);
      await fetch(`http://localhost:3001/api/reports/${report.id}`, {
        method: "DELETE",
      });
      setReports((prev) => prev.filter((r) => r.id !== report.id));
      toast.success("Report deleted", { description: `${report.name} has been removed.` });
    } catch {
      toast.error("Error", { description: "Failed to delete report" });
    } finally {
      setDeleting(false);
      setDeleteDialog({ open: false, report: null });
    }
  };

  const columns: Column<Report>[] = [
    {
      key: "name",
      header: "Report Title",
      accessorKey: "name",
      isSortable: true,
    },
    {
      key: "author",
      header: "Author",
      accessorKey: "author",
      isSortable: true,
    },
  ];

  const actions = (row: Report) => (
    <div className="flex items-center gap-1">
      <Link to={`/reports/${row.id}`} aria-label="View report">
        <Button variant="ghost" size="icon" className="size-8">
          <HiOutlineEye className="size-4" />
        </Button>
      </Link>
      <Link to={`/reports/${row.id}/edit`} aria-label="Edit report">
        <Button variant="ghost" size="icon" className="size-8">
          <HiOutlinePencilAlt className="size-4" />
        </Button>
      </Link>
      <AlertDialog open={deleteDialog.open && deleteDialog.report?.id === row.id}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Report</AlertDialogTitle>
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
          onClick={() => setDeleteDialog({ open: true, report: row })}
          aria-label="Delete report"
        >
          <Button variant="ghost" size="icon" className="size-8 text-destructive">
            <HiOutlineTrash className="size-4" />
          </Button>
        </button>
      </AlertDialog>
    </div>
  );

  return (
    <PageContent title="Reports">
      <div className="flex justify-end items-center mb-4 gap-3">
        <p className="text-sm text-muted-foreground">
          {reports.length} total
        </p>
        <Link to="/reports/create">
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
          data={reports}
          searchKey="name"
          searchPlaceholder="Search reports..."
          actions={actions}
        />
      )}
    </PageContent>
  );
};

export default ReportsIndex;
