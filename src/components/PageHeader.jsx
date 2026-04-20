import { useLocation } from 'react-router-dom';

export default function PageHeader({ title}) {
  const location = useLocation();
  const pathname = location.pathname;

  // Pisahkan path jadi array & kapitalisasi
  const pathSegments = pathname
    .split('/')
    .filter((segment) => segment)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1));

  const showBreadcrumb = pathSegments.length > 1;

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
          {title || pathSegments[pathSegments.length - 1] || 'Dashboard'}
        </span>

        {/* Breadcrumb tanpa "Home" */}
        {showBreadcrumb && (
          <div
            id="breadcrumb-links"
            className="flex items-center font-medium font-nunitosans space-x-2 mt-2"
          >
            {pathSegments.map((segment, index) => (
              <div key={index} className="flex items-center space-x-2">
                {index !== 0 && <span className="text-gray-500">/</span>}
                <span className="text-gray-500">{segment}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
