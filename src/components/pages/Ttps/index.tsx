import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageContent from "../../ui/page-content";
import { Card, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";
import { HiOutlineEye, HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";

interface TTP {
  id: number;
  name: string;
  description: string;
}

const TTPList = () => {
  const [ttps, setTtps] = useState<TTP[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    fetch("http://localhost:3001/api/ttps")
      .then((res) => res.json())
      .then((data) => {
        if (mounted) {
          setTtps(data);
          setError(null);
        }
      })
      .catch(() => {
        if (mounted) {
          setError("Failed to load TTPs");
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <PageContent title="TTPs">
      {error && <p className="text-destructive mb-3">{error}</p>}
      <div className="flex justify-between items-center mb-3">
        <p className="text-sm text-muted-foreground">
          Showing {ttps.length} of {ttps.length} results
        </p>
        <Link to="/ttps/create">
          <Button>Add new</Button>
        </Link>
      </div>
      <Card>
        <CardContent>
          {ttps.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No TTPs yet. Click &quot;Add new&quot; to create one.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead className="text-left text-sm uppercase border-b border-border">
                  <tr>
                    <th className="py-3 px-6 tracking-wide">TTP</th>
                    <th className="py-3 px-6">Description</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {ttps?.map((ttp) => (
                    <tr key={ttp.id} className="border-b border-border/50">
                      <td className="py-4 px-6 whitespace-nowrap">{ttp.name}</td>
                      <td className="py-4 px-6">{ttp.description}</td>
                      <td className="py-4 px-6 flex justify-center space-x-1">
                        <Link to={`/ttps/${ttp.id}`} aria-label="View">
                          <Button variant="ghost" size="icon" className="size-8">
                            <HiOutlineEye className="size-4" />
                          </Button>
                        </Link>
                        <Link to={`/ttps/${ttp.id}/edit`} aria-label="Edit">
                          <Button variant="ghost" size="icon" className="size-8">
                            <HiOutlinePencilAlt className="size-4" />
                          </Button>
                        </Link>
                        <button onClick={() => { /* TODO: implement delete */ }} aria-label="Delete">
                          <Button variant="ghost" size="icon" className="size-8 text-destructive">
                            <HiOutlineTrash className="size-4" />
                          </Button>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </PageContent>
  );
};

export default TTPList;
