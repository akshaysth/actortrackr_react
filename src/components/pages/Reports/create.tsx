import LayoutHeader from "../../Layout/header";

const CreateReport = () => {
  return (
    <>
      <LayoutHeader title="Create Report" />
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="container">
            <div className="rounded-md shadow-md bg-white py-6 px-10">
              <h1 className="text-2xl py-2 border-b-indigo-50 border-b-2">
                Report Details
              </h1>
              <form>
                <div className="grid grid-cols-1 gap-6 mt-4">
                  <div>
                    <label
                      htmlFor="report-title"
                      className="text-lg py-2 block"
                    >
                      Report Title
                    </label>
                    <input
                      id="report-title"
                      type="text"
                      className="block w-full px-4 py-2 bg-gray-100 rounded-md outline-1 outline-indigo-300"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CreateReport;
