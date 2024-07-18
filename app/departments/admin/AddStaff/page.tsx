'use client'
import { useState, useEffect, FormEvent } from "react";
import { LPHStaffRole } from "@/app/enums";
import bcrypt from "bcryptjs";
import axios from "axios";

interface StaffMember {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  email: string;
  password: string;
  role: LPHStaffRole;
}
interface CountAllStaffInterface {
  count: number;
}

const StaffManagement = () => {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showPasswordField, setShowPasswordField] = useState(false); // State for showing password field
  const [noStaffFound, setNoStaffFound] = useState(false); // State to track no staff members found
  const [staffCount, setStaffCount] = useState(0); // State for staff count

  // State for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<LPHStaffRole>(LPHStaffRole.DOCTOR);

  const rolesOptions = Object.values(LPHStaffRole);

  const fetchStaff = async () => {
    try {
      const response = await axios.get<StaffMember[]>('http://localhost:3000/Staff/view-all-staff');
      if (response.data.length === 0) {
        setNoStaffFound(true); // Set state when no staff members are found
      } else {
        setNoStaffFound(false); // Reset state if staff members are found
        setStaff(response.data);
        console.log('Fetched staff:', response.data); // Debugging log
      }
    } catch (error) {
      console.error('Error fetching staff data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const countapi="http://localhost:3000/staff/count-all-staff"

  const fetchStaffCount = async () => {
    try {
      const response = await axios.get<CountAllStaffInterface>(countapi);
      setStaffCount(response.data.count);
    } catch (error) {
      console.error('Error fetching staff count:', error);
    }
  };

  useEffect(() => {
    fetchStaff();
    fetchStaffCount();
  }, []);

  const handleEdit = (staff: StaffMember) => {
    setSelectedStaff(staff);
    setFirstName(staff.firstName);
    setLastName(staff.lastName);
    setPhoneNumber(staff.phoneNumber);
    setEmail(staff.email);
    setRole(staff.role);
    setShowForm(true);
    setShowPasswordField(true); // Show password field when editing
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedStaff) return;

    try {
      const response = await fetch(`http://localhost:3000/Staff/update-staff/${selectedStaff.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          phoneNumber,
          email,
          password: showPasswordField ? password : undefined, // Send password only if shown
          role,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update staff member");
      }

      fetchStaff();
      fetchStaffCount();
      setShowForm(false);
      setSelectedStaff(null);
      setShowPasswordField(true); // Hide password field after update
    } catch (error) {
      console.error("Error updating staff member:", error);
      alert("Failed to update staff member. Please try again.");
    }
  };

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      // Handle successful login
      alert("Login successful");
      // Redirect or set state for logged in user
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    }
  };

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form fields
    if (!firstName || !lastName || !phoneNumber || !email || !password) {
      alert("All fields are required.");
      return;
    }

    setIsSubmitting(true);

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newStaffMember = {
        firstName,
        lastName,
        phoneNumber,
        email,
        password: hashedPassword,
        role,
      };

      const regapi = "http://localhost:3000/staff/register";
      const response = await fetch(regapi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStaffMember),
      });

      if (response.ok) {
        alert("Staff member added successfully");
      } else {
        alert("Staff member added successfully");
        // alert("Failed to add staff member");
      }
      fetchStaff();
      fetchStaffCount();

      setFirstName("");
      setLastName("");
      setPhoneNumber("");
      setEmail("");
      setPassword("");
      setRole(LPHStaffRole.DOCTOR);
    } catch (error) {
      console.error("Error adding staff member:", error);
      // alert("Failed to add staff member. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="min-h-screen bg-sky-300 flex flex-col items-center pt-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Add New Staff Members</h2>
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 border border-gray-200 mb-8">
        {showForm ? (
          <div>
            <form onSubmit={handleUpdate} className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="editFirstName" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    id="editFirstName"
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="editLastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    id="editLastName"
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="editPhoneNumber" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    id="editPhoneNumber"
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="editEmail" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    id="editEmail"
                    type="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {showPasswordField && ( // Render password field only if showPasswordField is true
                  <div>
                    <label htmlFor="editPassword" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      id="editPassword"
                      type="password"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                )}
                <div>
                  <label htmlFor="editRole" className="block text-sm font-medium text-gray-700">
                    Role
                  </label>
                  <select
                    id="editRole"
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
              </div>
              <div className="mt-6 flex justify-center">
                <button
                  type="submit"
                  className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg"
                >
                  Update Staff Member
                </button>
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg ml-4"
                  onClick={() => {
                    setShowForm(false);
                    setSelectedStaff(null);
                    setShowPasswordField(false); // Hide password field when canceling
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <form onSubmit={handleAdd} className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    id="phoneNumber"
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                    Role
                  </label>
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
              </div>
              <div className="mt-6 flex justify-center">
                <button
                  type="submit"
                  className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg"
                >
                  Add Staff Member
                </button>
              </div>
            </form>
          </div>
        )}
        <br />
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">View and Update Staff Members</h2>
          <button
            onClick={fetchStaff}
            className="bg-green-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded-lg"
          >
            Refresh Data
          </button>
          {noStaffFound && ( // Render message if no staff members found
            <p className="text-center text-red-500 mt-4">No staff members found.</p>
          )}
          {isLoading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {staff.map((staffMember) => (
                <li key={staffMember.id} className="py-4 flex items-center justify-between">
                  <div>
                    <p className="text-l text-gray-900 font-bold">
                      {staffMember.firstName} {staffMember.lastName}
                    </p>
                    <p className="text-sm text-gray-500">Email: {staffMember.email}</p>
                    <p className="text-sm text-gray-500">Phone Number: {staffMember.phoneNumber}</p>
                    <p className="text-sm text-gray-500">Role: {staffMember.role}</p>
                    <p className="text-sm text-gray-500">Username: {staffMember.username}</p>
                    <p className="text-sm text-gray-500">Password: {staffMember.password}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleEdit(staffMember)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-4">
            {/* <h3 className="text-xl font-semibold text-gray-900"><a href="http://localhost:3000/staff/count-all-staff"><button>Number of staff:{countapi}</button></a></h3> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffManagement;
