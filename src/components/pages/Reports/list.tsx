import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageContent from "../../ui/page-content";
import { Button } from "../../ui/button";
import DataTable, { type Column } from "../../ui/data-table";
import {
  HiOutlineEye,
  HiOutlinePencilAlt,
  HiOutlineTrash,
} from "react-icons/hi";

interface Report {
  id: number;
  name: string;
  author: string;
}

const ReportsIndex = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
          setError("Failed to load reports");
          setLoading(false);
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  const handleDelete = async (report: Report) => {
    if (!confirm(`Delete report "${report.name}"?`)) return;
    try {
      await fetch(`http://localhost:3001/api/reports/${report.id}`, {
        method: "DELETE",
      });
      setReports((prev) => prev.filter((r) => r.id !== report.id));
    } catch {
      setError("Failed to delete report");
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
      <Link to={`/reports/${row.id}`} aria-label="View">
        <Button variant="ghost" size="icon" className="size-8">
          <HiOutlineEye className="size-4" />
        </Button>
      </Link>
      <Link to={`/reports/${row.id}/edit`} aria-label="Edit">
        <Button variant="ghost" size="icon" className="size-8">
          <HiOutlinePencilAlt className="size-4" />
        </Button>
      </Link>
      <button
        onClick={() => handleDelete(row)}
        aria-label="Delete"
      >
        <Button variant="ghost" size="icon" className="size-8 text-destructive">
          <HiOutlineTrash className="size-4" />
        </Button>
      </button>
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
        <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
          {error}
        </div>
      )}
      {loading ? (
        <div className="text-center text-muted-foreground py-8">Loading reports...</div>
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
