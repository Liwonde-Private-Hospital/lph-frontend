"use client";
import { useState, useEffect, FormEvent } from "react";
import { LPHStaffRole } from "@/app/enums";
import axios from "axios";
import {
  Button,
  Spinner,
  Select,
  Input,
  FormControl,
  FormLabel,
  IconButton,
} from "@chakra-ui/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  MdSearch,
  MdExpandMore,MdDelete ,
  MdEdit,
  MdPersonAdd,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

const TABS = [
  { label: "All", value: "all" },
  { label: "Admin", value: "admin" },
  { label: "Doctors", value: "doctors" },
];

export default function LIwondePrivateHospitalStaffManagement() {
  const TABLE_HEAD = [
    "ID",
    "Name",
    "Username",
    "Phone Number",
    "Email",
    "Role",
    "Actions",
  ];

  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [noStaffFound, setNoStaffFound] = useState(false);
  const [staffCount, setStaffCount] = useState(0);
  const [formFields, setFormFields] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    role: LPHStaffRole.OPD,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [staffPerPage] = useState(4); // Number of staff members per page
  const [adminPassword, setAdminPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const rolesOptions = Object.values(LPHStaffRole);

  useEffect(() => {
    fetchStaff();
    fetchStaffCount();
  }, [currentPage]);

  const fetchStaff = async () => {
    try {
      const { data } = await axios.get<StaffMember[]>(
        `${API_URL}/Staff/view-all-staff`,
        { params: { page: currentPage, limit: staffPerPage } }
      );
      setStaff(data);
      setNoStaffFound(data.length === 0);
    } catch (error) {
      console.error("Error fetching staff data:", error);
      toast.error("Failed to fetch staff data.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStaffCount = async () => {
    try {
      const { data } = await axios.get<CountAllStaffInterface>(
        `${API_URL}/staff/count-all-staffs`
      );
      setStaffCount(data.count);
    } catch (error) {
      console.error("Error fetching staff count:", error);
      toast.error("Failed to fetch staff count.");
    }
  };

  const handleEdit = (staff: StaffMember) => {
    setSelectedStaff(staff);
    setFormFields({
      firstName: staff.firstName,
      lastName: staff.lastName,
      phoneNumber: staff.phoneNumber,
      email: staff.email,
      password: "",
      role: staff.role,
    });
    setShowForm(true);
    setShowPasswordField(true);
  };

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedStaff) return;

    try {
      const response = await fetch(
        `${API_URL}/Staff/update-staff/${selectedStaff.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formFields,
            password: showPasswordField ? formFields.password : undefined,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to update staff member");

      toast.success("Staff member updated successfully.");
      fetchStaff();
      fetchStaffCount();
      resetForm();
    } catch (error) {
      console.error("Error updating staff member:", error);
      toast.error("Failed to update staff member. Please try again.");
    }
  };

  const handleAdd = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { firstName, lastName, phoneNumber, email, password } = formFields;
    if (!firstName || !lastName || !phoneNumber || !email || !password) {
      toast.error("All fields are required.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/staff/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formFields),
      });

      if (response.ok) {
        toast.success("Staff member added successfully.");
        fetchStaff();
        fetchStaffCount();
        resetForm();
      } else {
        toast.error("Failed to add staff member.");
      }
    } catch (error) {
      console.error("Error adding staff member:", error);
      toast.error("Failed to add staff member. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };


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
        toast.success("Staff member deleted successfully.");
      } catch (error) {
        console.error('Error deleting staff member:', error);
        toast.error("Failed to delete staff member. Please try again.");
      }
    } else {
      console.log('User canceled the deletion'); // Debugging log
      toast.info("Deletion canceled.");
    }
  };
  

  const resetForm = () => {
    setFormFields({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
      role: LPHStaffRole.OPD,
    });
    setSelectedStaff(null);
    setShowForm(false);
    setShowPasswordField(false);
    setAdminPassword("");
    setShowPassword(false);
  };

  const totalPages = Math.ceil(staffCount / staffPerPage);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
        Liwonde Private Hospital Staff Members
      </h2>
      <div className="w-full max-w-7xl bg-white shadow-md rounded-lg p-6 border border-gray-200 mb-8">
        {showForm ? (
          <form
            onSubmit={selectedStaff ? handleUpdate : handleAdd}
            className="mb-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(formFields).map(
                ([key, value]) =>
                  key !== "role" &&
                  key !== "password" && (
                    <FormControl key={key}>
                      <FormLabel
                        htmlFor={`edit${
                          key.charAt(0).toUpperCase() + key.slice(1)
                        }`}
                        className="text-gray-700"
                      >
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </FormLabel>
                      <Input
                        id={`edit${key.charAt(0).toUpperCase() + key.slice(1)}`}
                        type={key === "email" ? "email" : "text"}
                        className="mt-1 border border-green-500 rounded-md"
                        value={value}
                        onChange={(e) =>
                          setFormFields((prev) => ({
                            ...prev,
                            [key]: e.target.value,
                          }))
                        }
                      />
                    </FormControl>
                  )
              )}
              <FormControl>
                <FormLabel htmlFor="editPassword" className="text-gray-700">
                  Password
                </FormLabel>
                <div className="relative">
                  <Input
                    id="editPassword"
                    type={showPassword ? "text" : "password"}
                    className="mt-1 border border-green-500 rounded-md"
                    value={formFields.password}
                    onChange={(e) =>
                      setFormFields((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                  />
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    icon={showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                    size="sm"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  />
                </div>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="editRole" className="text-gray-700">
                  Role
                </FormLabel>
                <Select
                  id="editRole"
                  className="mt-1 border border-green-500 rounded-md"
                  value={formFields.role}
                  onChange={(e) =>
                    setFormFields((prev) => ({
                      ...prev,
                      role: e.target.value as LPHStaffRole,
                    }))
                  }
                >
                  {rolesOptions.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="flex justify-end mt-6">
              <Button
                type="submit"
                className="mr-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
                isLoading={isSubmitting}
              >
                {selectedStaff ? "Update Staff" : "Add Staff"}
              </Button>
              <Button
                onClick={resetForm}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <Button
            onClick={() => setShowForm(true)}
            className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-orange-600"
          >
            <MdPersonAdd className="mr-2" />
            Add New Staff
          </Button>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner size="xl" color="green.500" />
          </div>
        ) : noStaffFound ? (
          <p className="text-center text-gray-500 mt-6">
            No staff members found.
          </p>
        ) : (
          <>
            <table className="w-full bg-white mt-6 border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-green-500 text-white">
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="px-4 py-2 text-left text-sm font-medium text-gray-200 border-b border-gray-200"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {staff.map((staffMember) => (
                  <tr key={staffMember.id}>
                    <td className="px-4 py-2 border-b border-gray-200">
                      {staffMember.id}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200">
                      {staffMember.firstName} {staffMember.lastName}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200">
                      {staffMember.username}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200">
                      {staffMember.phoneNumber}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200">
                      {staffMember.email}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200">
                      {staffMember.role}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 flex justify-end space-x-2">
                      <IconButton
                        onClick={() => handleEdit(staffMember)}
                        className="text-gray-500 hover:text-gray-700"
                        icon={<MdEdit />}
                        size="sm"
                        aria-label="Edit staff"
                      />
                      <IconButton
                        onClick={() => handleDelete(staffMember.id)}
                        className="text-red-500 hover:text-red-700"
                        icon={<MdDelete />}
                        size="sm"
                        aria-label="Delete staff"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between mt-4">
              <Button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                isDisabled={currentPage === 1}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Previous
              </Button>
              <span className="text-gray-500">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                isDisabled={currentPage === totalPages}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Next
              </Button>
            </div>
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
