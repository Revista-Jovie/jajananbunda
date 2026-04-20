export default function PageHeader() {
  return (
    <div
      id="pageheader-container"
      className="flex items-center justify-between p-4"
    >
      <div id="pageheader-left" className="flex flex-col">
        <span
          id="page-title"
          className="text-3xl font-semibold font-nunitosans"
        >
          Dashboard
        </span>
        <div id="breadcrumb-links" className="flex items-center font-medium font-nunitosans space-x-2 mt-2">
                    <span id="breadcrumb-home" className="text-gray-500">Home</span>
                    <span id="breadcrumb-separator" className="text-gray-500">/</span>
                    <span id="breadcrumb-current" className="text-gray-500">Dashboard</span>
                </div>
      </div>
    </div>
  );
}
