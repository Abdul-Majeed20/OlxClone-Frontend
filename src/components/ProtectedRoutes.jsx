import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const checkUser = async () => {
      let BASE_URL = "https://olx-clone-backend-new.vercel.app"

    try {
      console.log("Checking authentication...");
      const response = await fetch(`${BASE_URL}/auth/me`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        setIsAuth(false);
        return navigate("/login");
      }

      const data = await response.json();

      // ✅ Your structure: { status: 1, data: { _id, role, email, firstName } }
      if (data.status === 1 && data.data) {
        const userData = data.data;
        setUser(userData);

        // 🧠 Role-based access check
        if (allowedRoles.length > 0 && !allowedRoles.includes(userData.role)) {
          console.warn(`Access denied: role "${userData.role}" cannot access ${location.pathname}`);
          setIsAuth(false);
          return navigate("/unauthorized");
        }

        // ✅ Authenticated and authorized
        setIsAuth(true);
      } else {
        setIsAuth(false);
        navigate("/login");
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setIsAuth(false);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return isAuth ? children : null;
}
