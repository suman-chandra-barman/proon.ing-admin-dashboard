import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { FaTrash } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import DeleteUserModal from "@/components/modals/DeleteUserModal";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  type AdminUser,
} from "@/redux/features/users/usersApi";

export default function UserManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteUserOpen, setIsDeleteUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<number | null>(null);
  const itemsPerPage = 8;

  const {
    data: users = [],
    isLoading,
    isFetching,
    isError,
  } = useGetUsersQuery();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const handleDelete = (user: AdminUser) => {
    setSelectedUser(user);
    setIsDeleteUserOpen(true);
  };

  const handleDeleteModalChange = (open: boolean) => {
    setIsDeleteUserOpen(open);
    if (!open) {
      setSelectedUser(null);
    }
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    if (toastTimeoutRef.current) {
      window.clearTimeout(toastTimeoutRef.current);
    }
    toastTimeoutRef.current = window.setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        window.clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const filteredUsers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return users;
    }

    return users.filter((user) => {
      const nameMatch = user.username.toLowerCase().includes(query);
      const emailMatch = (user.email || "").toLowerCase().includes(query);
      return nameMatch || emailMatch;
    });
  }, [users, searchQuery]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredUsers.length / itemsPerPage),
  );
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleConfirmDelete = async () => {
    if (!selectedUser) {
      return;
    }

    try {
      await deleteUser(selectedUser.id).unwrap();
      showToast("User deleted successfully.");
      setIsDeleteUserOpen(false);
      setSelectedUser(null);
    } catch (error) {
      console.error("Failed to delete user:", error);
      showToast("Failed to delete user.");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">User Management</h1>

      {/* Filters */}
      <Card>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="relative flex-1 max-w-100">
              <IoSearch className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-9 border-gray-500 focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total Scans</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading || isFetching
                ? Array.from({ length: itemsPerPage }).map((_, index) => (
                    <TableRow key={`skeleton-${index}`}>
                      <TableCell>
                        <Skeleton className="h-4 w-32" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-40" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-16" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-16" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-8 w-8" />
                      </TableCell>
                    </TableRow>
                  ))
                : paginatedUsers.map((user) => {
                    const statusLabel =
                      user.status?.toLowerCase() === "active"
                        ? "Active"
                        : user.status;
                    return (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          {user.username}
                        </TableCell>
                        <TableCell>{user.email || "-"}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {user.subscription_plan}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              user.status?.toLowerCase() === "active"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {statusLabel}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.total_scan}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(user)}
                            >
                              <FaTrash className="h-4 w-4 text-red-600" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              {!isLoading && !isFetching && !paginatedUsers.length && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-muted-foreground"
                  >
                    {isError ? "Failed to load users." : "No users found."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
            <div className="text-muted-foreground">
              Showing {paginatedUsers.length ? startIndex + 1 : 0}-
              {startIndex + paginatedUsers.length} of {filteredUsers.length}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={safePage === 1 || isLoading || isFetching}
              >
                Previous
              </Button>
              <span className="text-muted-foreground">
                Page {safePage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={safePage === totalPages || isLoading || isFetching}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}

      <Dialog open={isDeleteUserOpen} onOpenChange={handleDeleteModalChange}>
        {selectedUser && (
          <DeleteUserModal
            user={selectedUser}
            onClose={() => setIsDeleteUserOpen(false)}
            onConfirm={handleConfirmDelete}
            isDeleting={isDeleting}
          />
        )}
      </Dialog>

      {toastMessage && (
        <div className="fixed right-6 top-6 z-50 rounded-lg bg-foreground px-4 py-3 text-sm text-background shadow-lg">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
