import {
    HiOutlineEye,
    HiOutlinePencilAlt,
    HiOutlinePlus,
    HiOutlineTrash,
  } from "react-icons/hi";
  import { Link } from "react-router-dom";
  import Page from "../../ui/Page";
  import Card from "../../ui/Card";
  
  const TTPs = [
      {id: 1, name: "TTP1", description: "TT1 Description"},
  ];
  
  const TTPList = () => {
    return (
      <Page title="TTPs">
          <div className="flex justify-between items-center mb-3">
              <p className="text-md text-gray-500">
                  Showing {TTPs.length} of {TTPs.length} results
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
                  {TTPs?.map((report) => (
                  <tr key={report.id}>
                      <td className="py-4 px-6 whitespace-nowrap">
                      {report.name}
                      </td>
                      <td className="py-4 px-6">{report.description}</td>
                      <td className="py-4 px-6 flex justify-center space-x-1">
                      <Link
                          to={`/ttps/${report.id}`}
                          className="p-1 bg-gray-200 rounded-sm"
                      >
                          <HiOutlineEye />
                      </Link>
                      <Link
                          to={`/ttps/${report.id}/edit`}
                          className="p-1 bg-gray-200 rounded-sm"
                      >
                          <HiOutlinePencilAlt />
                      </Link>
                      <button
                          className="p-1 bg-gray-200 rounded-sm"
                          onClick={() => { /* TODO: implement delete */ }}
                      >
                          <HiOutlineTrash />
                      </button>
                      </td>
                  </tr>
                  ))}
              </tbody>
              </table>
          </Card>
      </Page>
    );
  };
  
  export default TTPList;