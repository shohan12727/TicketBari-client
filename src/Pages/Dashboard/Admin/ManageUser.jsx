import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxios";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import toast from "react-hot-toast";

const ManageUser = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  /* ---------------- FETCH USERS ---------------- */
  const { data: allUsers = [], isLoading } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  /* ---------------- MUTATIONS ---------------- */
  const makeAdminMutation = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/users/make-admin/${id}`),
    onSuccess: () => {
      toast.success("User promoted to Admin");
      queryClient.invalidateQueries(["all-users"]);
    },
  });

  const makeVendorMutation = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/users/make-vendor/${id}`),
    onSuccess: () => {
      toast.success("User promoted to Vendor");
      queryClient.invalidateQueries(["all-users"]);
    },
  });

  const markFraudMutation = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/users/mark-fraud/${id}`),
    onSuccess: () => {
      toast.success("Vendor marked as Fraud");
      queryClient.invalidateQueries(["all-users"]);
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">
        Manage Users ({allUsers.length})
      </h2>

      <div className="overflow-x-auto rounded-xl border border-base-300">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th>SL</th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {allUsers.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>

                {/* USER INFO */}
                <td className="flex items-center gap-3">
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="font-medium">{user.name}</span>
                </td>

                <td>{user.email}</td>

                {/* ROLE BADGE */}
                <td>
                  <span
                    className={`badge capitalize ${
                      user.role === "admin"
                        ? "badge-success"
                        : user.role === "vendor"
                        ? "badge-warning"
                        : "badge-ghost"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                {/* ACTIONS */}
                <td className="flex flex-wrap gap-2 justify-center">
                  {/* MAKE ADMIN */}
                  {user.role !== "admin" && (
                    <button
                      className="btn btn-xs btn-outline btn-success"
                      onClick={() => makeAdminMutation.mutate(user._id)}
                      disabled={makeAdminMutation.isPending}
                    >
                      Make Admin
                    </button>
                  )}

                  {/* MAKE VENDOR */}
                  {user.role === "customer" && (
                    <button
                      className="btn btn-xs btn-outline btn-info"
                      onClick={() => makeVendorMutation.mutate(user._id)}
                      disabled={makeVendorMutation.isPending}
                    >
                      Make Vendor
                    </button>
                  )}

                  {/* MARK AS FRAUD */}
                  {user.role === "vendor" && (
                    <button
                      className="btn btn-xs btn-outline btn-error"
                      onClick={() => markFraudMutation.mutate(user._id)}
                      disabled={markFraudMutation.isPending}
                    >
                      Mark as Fraud
                    </button>
                  )}

                  {/* ADMIN LABEL */}
                  {user.role === "admin" && (
                    <span className="text-xs text-gray-500">
                      No actions
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
