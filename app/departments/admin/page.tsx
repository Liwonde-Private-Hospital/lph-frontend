"use client";
import { LPHStaffRole } from "@/app/enums";
import Header from "@/componets/navbar";
import React, { useState, useEffect } from "react";

const API_BASE_URL = "http://localhost:3000/Staff";

export default function MembersTable() {
  const [staffList, setStaffList] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Number of items per page
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<LPHStaffRole>(LPHStaffRole.DOCTOR); // Default role
  const rolesOptions = Object.values(LPHStaffRole);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/register-staff`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          dateOfBirth: new Date(dateOfBirth).toISOString(),
          phoneNumber,
          email,
          password,
          roles: [role],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add staff member");
      }

      console.log("Staff member added successfully");
      fetchStaffList(); // Refresh the staff list
      // Optionally, you can clear the form fields after submission
      setFirstName("");
      setLastName("");
      setDateOfBirth("");
      setPhoneNumber("");
      setEmail("");
      setPassword("");
      setRole(LPHStaffRole.DOCTOR); // Reset role to default
    } catch (error) {
      console.error("Error adding staff member:", error);
    }
  };

  useEffect(() => {
    fetchStaffList();
  }, []);

  const fetchStaffList = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/view-all-staff`);
      if (!response.ok) {
        throw new Error("Failed to fetch staff members");
      }
      const data = await response.json();
      setStaffList(data);
    } catch (error) {
      console.error("Error fetching staff list:", error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = async (userId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/delete-staff/${userId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete staff member");
      }
      // Remove the deleted staff member from the local state
      setStaffList(staffList.filter((member) => member.userId !== userId));
      console.log("Staff member deleted successfully");
    } catch (error) {
      console.error("Error deleting staff member:", error);
    }
  };

  const handleEdit = async (userId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/view-staff/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch staff member details");
      }
      const userData = await response.json();
      setSelectedUser(userData);
      setDialogOpen(true);
    } catch (error) {
      console.error("Error fetching staff member details:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      if (!selectedUser) return;

      const response = await fetch(
        `${API_BASE_URL}/update-staff/${selectedUser.userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedUser), // Assuming selectedUser contains updated fields
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update staff member");
      }

      // Update the staff list with the updated user data
      setStaffList(
        staffList.map((member) =>
          member.userId === selectedUser.userId ? selectedUser : member
        )
      );

      console.log("Staff member updated successfully");
      setDialogOpen(false);
    } catch (error) {
      console.error("Error updating staff member:", error);
    }
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setSelectedUser(null);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStaffList = staffList.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  return (
    <>
      <Header />
      <h1 className="text-center text-3xl font-bold">Liwonde Private Hospital</h1>
      <div className="flex justify-center">Managers Dashboard</div>
      <><div className="w-full flex items-center justify-center">
      <div className=" bg-white shadow-md rounded-lg overflow-hidden mr-4">
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Staff Members</h2>
            <p className="text-sm text-gray-500">See information about all staff members</p>
          </div>
          <div className="flex gap-2">
            <button
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:bg-indigo-200"
              onClick={fetchStaffList}
            >
              Refresh
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white sm:px-6">
          <div className="flex-1 flex">
            <div className="w-full">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <input
                  id="search"
                  name="search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Function</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employed</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentStaffList.map((staff) => (
                <tr key={staff.userId}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img className="h-10 w-10 rounded-full" src={staff.profilePic} alt={`${staff.firstName} ${staff.lastName}`} />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{`${staff.firstName} ${staff.lastName}`}</div>
                        <div className="text-sm text-gray-500">{staff.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{staff.role}</div>
                    {/* Add additional job or organization details if needed */}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${staff.status === 'employed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {staff.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(staff.employedSince).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      className="text-indigo-600 hover:text-indigo-900"
                      onClick={() => handleEdit(staff.userId)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900 ml-4"
                      onClick={() => handleDelete(staff.userId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="py-2">
            <div className="flex justify-between">
              <div>
                <label>
                  Items per page:
                  <select
                    className="ml-2 border-gray-300 rounded-md"
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                  </select>
                </label>
              </div>
              <div>
                Page {currentPage} of {Math.ceil(staffList.length / itemsPerPage)}
                <button
                  className="ml-2 px-2 py-1 border border-gray-300 rounded-md"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <button
                  className="ml-2 px-2 py-1 border border-gray-300 rounded-md"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === Math.ceil(staffList.length / itemsPerPage)}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/3 bg-white shadow-md rounded-lg p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Staff Member</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                id="firstName"
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                id="lastName"
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                id="dateOfBirth"
                type="date"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                id="phoneNumber"
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                type="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
              <select
                id="role"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm"
                value={role}
                onChange={(e) => setRole(e.target.value as LPHStaffRole)}
              >
                {rolesOptions.map((roleOption) => (
                  <option key={roleOption} value={roleOption}>
                    {roleOption}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Staff Member
              </button>
            </div>
          </div>
        </form>
      </div>
      {dialogOpen && selectedUser && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Edit Staff Member
                    </h3>
                    <div className="mt-2">
                      <form>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                            <input
                              id="firstName"
                              type="text"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm"
                              value={selectedUser.firstName}
                              onChange={(e) => setSelectedUser({ ...selectedUser, firstName: e.target.value })}
                            />
                          </div>
                          <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                            <input
                              id="lastName"
                              type="text"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm"
                              value={selectedUser.lastName}
                              onChange={(e) => setSelectedUser({ ...selectedUser, lastName: e.target.value })}
                            />
                          </div>
                          <div>
                            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                            <input
                              id="dateOfBirth"
                              type="date"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm"
                              value={selectedUser.dateOfBirth}
                              onChange={(e) => setSelectedUser({ ...selectedUser, dateOfBirth: e.target.value })}
                            />
                          </div>
                          <div>
                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input
                              id="phoneNumber"
                              type="text"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm"
                              value={selectedUser.phoneNumber}
                              onChange={(e) => setSelectedUser({ ...selectedUser, phoneNumber: e.target.value })}
                            />
                          </div>
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                              id="email"
                              type="email"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm"
                              value={selectedUser.email}
                              onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                            />
                          </div>
                          <div>
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                            <select
                              id="role"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm"
                              value={selectedUser.role}
                              onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value as LPHStaffRole })}
                            >
                              {rolesOptions.map((roleOption) => (
                                <option key={roleOption} value={roleOption}>
                                  {roleOption}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleUpdate}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={closeDialog}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div></>
    </>
  );
}
