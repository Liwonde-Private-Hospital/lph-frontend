'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from '../adminLayout';

type StaffMember = {
  id: number;
  firstName: string;
  username:string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  role: string;
};

const StaffManagement = () => {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

 
  const fetchStaff = async () => {
    try {
      const response = await axios.get<StaffMember[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/Staff/view-all-staff`
      );
      if (response.data.length === 0) {
        ('No staff members found');
        // Optionally handle no staff members found scenario here
      }
      setStaff(response.data);
      console.log('Fetched staff:', response.data); // Debugging log
    } catch (error) {
      console.error('Error fetching staff data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);
  const handleDelete = async (staffId: number) => {
    console.log('Delete button clicked for staff ID:', staffId); // Debugging log
    const confirmDelete = confirm('Are you sure you want to delete this user? This action is undoable.');
    if (confirmDelete) {
      try {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/Staff/delete-staff/${staffId}`
        );
        setStaff(staff.filter((member) => member.id !== staffId));
        console.log('Deleted staff ID:', staffId); // Debugging log
      } catch (error) {
        console.error('Error deleting staff member:', error);
      }
    }
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  return (
    <SideBar>
      <div className="container mx-auto p-4 bg-opacity-75">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="flex items-center justify-between bg-gray-800 text-white p-4">
            <h1 className="text-4xl font-bold">Delete Staff Members</h1>
            <button
              onClick={fetchStaff}
              className="bg-green-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded-lg"
            >
              Refresh Data
            </button>
          </div>
          <div className="px-4 py-2">
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2">First Name</th>
                    <th className="px-4 py-2">Last Name</th>
                    <th className="px-4 py-2">Phone Number</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">username</th>

                    <th className="px-4 py-2">Password</th>
                    <th className="px-4 py-2">Role</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {staff.map((member, index) => (
                    <tr
                      key={member.id}
                      className={`border-b border-gray-300 ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <td className="px-4 py-2">{member.firstName}</td>
                      <td className="px-4 py-2">{member.lastName}</td>
                      <td className="px-4 py-2">{member.phoneNumber}</td>
                      <td className="px-4 py-2">{member.email}</td>
                      <td className="px-4 py-2">{member.username}</td>
                      <td className="px-4 py-2">{member.password}</td>
                      <td className="px-4 py-2">{member.role}</td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => handleDelete(member.id)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </SideBar>
  );
};

export default StaffManagement;
