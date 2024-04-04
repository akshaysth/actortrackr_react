import {
  HiOutlineEye,
  HiOutlinePencilAlt,
  HiOutlinePlus,
  HiOutlineTrash,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import LayoutHeader from "../../Layout/header";

const ReportsIndex = ({ reports }) => {
  return (
    <>
      <LayoutHeader title="Reports" />
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="container">
            {/* <div className="py-3 px-6 bg-gray-50 text-3xl mb-5 rounded-md">
              Reports
            </div> */}
            <div className="flex justify-between items-center mb-3">
              <p className="text-md text-gray-500">
                Showing x to x of y results
              </p>
              <a
                href="/reports/create"
                className="flex justify-center items-center space-x-2 bg-indigo-300 p-2 rounded-md text-sm font-semibold"
              >
                <span>
                  <HiOutlinePlus />
                </span>
                <span>Add new</span>
              </a>
            </div>
            <div className="flex">
              <table className="table-auto w-full bg-gray-50">
                <thead className="text-left font-extralight text-sm uppercase border-b-2 border-gray-200">
                  <tr>
                    <th className="py-3 px-6 tracking-wide">Report Title</th>
                    <th className="py-3 px-6">Author</th>
                    <th className="py-3 px-6 text-center items-center justify-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reports?.map((report) => (
                    <tr key={report.id}>
                      <td className="py-4 px-6 whitespace-nowrap">
                        {report.name}
                      </td>
                      <td className="py-4 px-6">{report.author}</td>
                      <td className="py-4 px-6 grid grid-flow-col items-center justify-center space-x-1">
                        <Link
                          to={report.id.toString()}
                          className="p-1 bg-gray-200 rounded-sm"
                        >
                          <HiOutlineEye />
                        </Link>
                        <a href="#" className="p-1 bg-gray-200 rounded-sm">
                          <HiOutlinePencilAlt />
                        </a>
                        <a href="#" className="p-1 bg-gray-200 rounded-sm">
                          <HiOutlineTrash />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ReportsIndex;
