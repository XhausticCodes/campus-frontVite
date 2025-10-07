import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getUserDetails,
  getAllStudent,
  deleteStudent,
} from "../../Services/LoginService";
import { FaUsers, FaRegSadTear } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // First, get the current logged-in user's details to check their role
    getUserDetails()
      .then((response) => {
        setCurrentUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === "Admin") {
        getAllStudent()
          .then((response) => {
            setStudents(response.data);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching all students:", error);
            setLoading(false);
          });
      } else {
        // Not an admin
        setLoading(false);
      }
    }
  }, [currentUser]); // This effect runs when the currentUser state is updated

  const handleDeleteStudent = (usernameToDelete) => {
    //Final Confirmation from Admin
    if (
      window.confirm(
        `Are you sure you want to delete the student: ${usernameToDelete}?`
      )
    ) {
      deleteStudent(usernameToDelete)
        .then(() => {
          alert("Student deleted successfully!");
          // Refreshing frontend with filtered list.
          setStudents((prevStudents) =>
            prevStudents.filter(
              (student) => student.username !== usernameToDelete
            )
          );
        })
        .catch((error) => {
          console.error("Error deleting student:", error);
          alert(
            "Failed to delete student. They might have associated records."
          );
        });
    }
  };

  if (loading) {
    return <div className="text-center text-lg mt-10">Loading students...</div>;
  }

  const returnBack = () => {
    if (currentUser?.role === "Admin") {
      navigate("/AdminMenu");
    } else {
      navigate("/StudentMenu");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8">
      <div className="mx-auto bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-row justify-start">
          <button
            className="bg-indigo-500 text-white px-3 py-2 rounded flex flex-row items-center justify-center gap-2 hover:bg-indigo-700 transition-all duration-300 group"
            style={{ cursor: "pointer" }}
            onClick={returnBack}
          >
            <FaArrowLeftLong className="h-5 w-5 group-hover:scale-80 group-hover:translate-x-1 transition-all duration-300" />
            <span className="group-hover:translate-x-1 transition-all duration-300">
              Back
            </span>
          </button>
        </div>

        <div className="text-center mb-8">
          <FaUsers size={40} className="text-indigo-600 mx-auto mb-3" />
          <h1 className="text-3xl font-bold text-gray-800">Student List</h1>
          <p className="text-gray-500 mt-2">
            All registered students in the system.
          </p>
        </div>

        {students.length === 0 ? (
          <div className="text-center py-10">
            <FaRegSadTear size={50} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700">
              No Students Found
            </h2>
            <p className="text-gray-500 mt-2">
              There are currently no students registered in the system.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full ">
              <thead className="bg-gray-100">
                <tr>
                  {[
                    "Student ID",
                    "Username",
                    "Full Name",
                    "Email",
                    "Role",
                    "Actions",
                  ].map((header) => (
                    <th
                      key={header}
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-extrabold text-gray-500 uppercase tracking-wider border border-gray-400"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {students.map((student, index) => (
                  <tr
                    key={student.userId || student.username || index}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-gray-400">
                      {student.userId || index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-600 border border-gray-400">
                      {student.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-400">
                      {student.personName || student.fullName || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-400">
                      {student.email || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-400">
                      <div className="flex items-center justify-center">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            student.role === "Admin"
                              ? "bg-red-100 text-red-800"
                              : student.role === "Student"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {student.role}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium border border-gray-400">
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => handleDeleteStudent(student.username)}
                          style={{ cursor: "pointer" }}
                          className="bg-red-500 text-white font-bold py-1 px-3 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out text-xs"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentList;
