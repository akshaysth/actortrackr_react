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

interface TTP {
  id: number;
  name: string;
  description: string;
}

const TTPList = () => {
  const [ttps, setTtps] = useState<TTP[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
          setError("Failed to load TTPs");
          setLoading(false);
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  const handleDelete = async (ttp: TTP) => {
    if (!confirm(`Delete TTP "${ttp.name}"?`)) return;
    try {
      await fetch(`http://localhost:3001/api/ttps/${ttp.id}`, {
        method: "DELETE",
      });
      setTtps((prev) => prev.filter((t) => t.id !== ttp.id));
    } catch {
      setError("Failed to delete TTP");
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
      <Link to={`/ttps/${row.id}`} aria-label="View">
        <Button variant="ghost" size="icon" className="size-8">
          <HiOutlineEye className="size-4" />
        </Button>
      </Link>
      <Link to={`/ttps/${row.id}/edit`} aria-label="Edit">
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
        <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
          {error}
        </div>
      )}
      {loading ? (
        <div className="text-center text-muted-foreground py-8">Loading TTPs...</div>
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
