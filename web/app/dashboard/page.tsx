export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
                <h1 className="text-xl font-bold">Vehicle Dispatch</h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a href="/dashboard" className="border-b-2 border-blue-500 px-1 pt-1 text-sm font-medium">
                  Dashboard
                </a>
                <a href="/dashboard/drivers" className="border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                  Drivers
                </a>
                <a href="/dashboard/assignments" className="border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                  Assignments
                </a>
                <a href="/dashboard/tests" className="border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                  Tests
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Drivers</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">--</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Active Assignments</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">--</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Qualified Drivers</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">--</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Pending Responses</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">--</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
