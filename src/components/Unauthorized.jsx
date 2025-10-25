// src/pages/Unauthorized.jsx
export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center">
      <h1 className="text-3xl font-semibold text-red-600 mb-4">Access Denied</h1>
      <p className="text-gray-700">You don’t have permission to view this page.</p>
    </div>
  );
}
