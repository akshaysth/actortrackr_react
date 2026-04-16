import { useState, useEffect } from "react";
import {
    HiOutlineEye,
    HiOutlinePencilAlt,
    HiOutlinePlus,
    HiOutlineTrash,
  } from "react-icons/hi";
  import { Link } from "react-router-dom";
  import Page from "../../ui/Page";
  import Card from "../../ui/Card";

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
      <Page title="TTPs">
          {error && <p className="text-red-600 mb-3">{error}</p>}
          <div className="flex justify-between items-center mb-3">
              <p className="text-sm text-gray-500">
                  Showing {ttps.length} of {ttps.length} results
              </p>
              <Link
                  to="/ttps/create"
                  className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                  <HiOutlinePlus />
                  <span>Add new</span>
              </Link>
          </div>
          <Card>
              <div className="overflow-x-auto">
              <table className="table-auto w-full">
              <thead className="text-left font-extralight text-sm uppercase border-b-2 border-gray-200">
                  <tr>
                  <th className="py-3 px-6 tracking-wide">TTP</th>
                  <th className="py-3 px-6">Description</th>
                  <th className="py-3 px-6 text-center">
                      Actions
                  </th>
                  </tr>
              </thead>
              <tbody>
                  {ttps?.map((ttp) => (
                  <tr key={ttp.id}>
                      <td className="py-4 px-6 whitespace-nowrap">
                      {ttp.name}
                      </td>
                      <td className="py-4 px-6">{ttp.description}</td>
                      <td className="py-4 px-6 flex justify-center space-x-1">
                      <Link
                          to={`/ttps/${ttp.id}`}
                          className="p-1 bg-gray-200 rounded-sm"
                          aria-label="View"
                      >
                          <HiOutlineEye />
                      </Link>
                      <Link
                          to={`/ttps/${ttp.id}/edit`}
                          className="p-1 bg-gray-200 rounded-sm"
                          aria-label="Edit"
                      >
                          <HiOutlinePencilAlt />
                      </Link>
                      <button
                          className="p-1 bg-gray-200 rounded-sm"
                          onClick={() => { /* TODO: implement delete */ }}
                          aria-label="Delete"
                      >
                          <HiOutlineTrash />
                      </button>
                      </td>
                  </tr>
                  ))}
              </tbody>
              </table>
              </div>
          </Card>
      </Page>
    );
  };
  
  export default TTPList;