import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addEmployees,
  deleteAnEmployee,
  getEmployees,
  updateAnEmployee,
} from "../Redux/employeeSlice";
import {
  addSalary,
  deleteASalary,
  updateASalary,
} from "../Redux/salariesSlice";

const Employees = () => {
  const [showEmployee, setShowEmployee] = useState(false);
  const [showSalary, setShowSalary] = useState(false);
  const { employees } = useSelector((state) => state.employees);
  const { salary } = useSelector((state) => state.salaries);
  const dispatch = useDispatch();
  const [currentSalary, setCurrentSalary] = useState(null);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [editEmployee, setEditEmployee] = useState(false);
  const [editSalary, setEditSalary] = useState(false);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [department, setDepartment] = useState(null);
  const [position, setPosition] = useState(null);
  const [employeeSalary, setEmployeeSalary] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  const handleAddEmployee = (e) => {
    e.preventDefault();
    const payload = {
      name,
      email,
      phone,
      department,
      position,
    };

    dispatch(addEmployees(payload));
  };

  const handleAddSalary = () => {
    const payload = {
      salary: employeeSalary,
      employeeEmail: currentEmployee,
    };
    dispatch(addSalary(payload));
  };

  const handleEditEmployee = (email) => {
    setEditEmployee(true);
    setEditSalary(false);
    setCurrentEmployee(email);
  };

  const editEmployees = () => {
    dispatch(updateAnEmployee(currentEmployee));
  };
  const editSalaries = () => {
    const employeesSalary = salary.filter(
      (item) => item.employeeEmail == currentSalary
    )[0].id;
    dispatch(updateASalary(employeesSalary));
  };

  const handleDeleteEmployee = (email) => {
    dispatch(deleteAnEmployee(email));
  };

  const handleEditSalary = (email) => {
    setEditEmployee(false);
    setEditSalary(true);
    setCurrentSalary(email);
  };

  const handleDeleteSalary = (email) => {
    const employeesSalary = salary.filter(
      (item) => item.employeeEmail == email
    )[0].id;
    dispatch(deleteASalary(employeesSalary));
  };
  return (
    <div className="p-12">
      <div className="flex gap-1 mb-5">
        <button
          onClick={() => {
            setShowSalary(false);
            setShowEmployee(true);
          }}
          className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add Employee
        </button>
        <button
          onClick={() => {
            setShowEmployee(false);
            setShowSalary(true);
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Salary
        </button>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Employee ID
              </th>
              <th scope="col" className="px-6 py-3">
                Employee Name
              </th>
              <th scope="col" className="px-6 py-3">
                Employee Email
              </th>
              <th scope="col" className="px-6 py-3">
                Employee Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Employee Department
              </th>
              <th scope="col" className="px-6 py-3">
                Employee Position
              </th>
              <th scope="col" className="px-6 py-3">
                Edit Employee
              </th>
              <th scope="col" className="px-6 py-3">
                Edit Salary
              </th>
            </tr>
          </thead>
          <tbody>
            {employees &&
              employees.map((employee) => {
                return (
                  <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {employee.id}
                    </th>
                    <td className="px-6 py-4">{employee.name}</td>
                    <td className="px-6 py-4">{employee.email}</td>
                    <td className="px-6 py-4">{employee.phone}</td>
                    <td className="px-6 py-4">{employee.department}</td>
                    <td className="px-6 py-4">{employee.position}</td>
                    <td className="px-6 py-4">
                      <a
                        className="font-medium mr-1 text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => handleEditEmployee(employee.email)}
                      >
                        Edit Employee
                      </a>
                      <a
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => handleDeleteEmployee(employee.email)}
                      >
                        Delete Employee
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <a
                        className="font-medium mr-1 text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => handleEditSalary()}
                      >
                        Edit Salary
                      </a>
                      <a
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => handleDeleteSalary(employee)}
                      >
                        Delete Salary
                      </a>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {/* Add Employee Modal */}
      {showEmployee && (
        <div class="w-full max-w-xs mt-5">
          <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="flex justify-center font-bold pb-5">
              Add an Employee
            </h1>
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="username"
              >
                Employee Name
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div class="mb-6">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="email"
              >
                Employee Email
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div class="mb-6">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="email"
              >
                Employee Phone
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                type="number"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div class="mb-6">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="email"
              >
                Employee Department
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="department"
                type="text"
                onChange={(e) => setDepartment(e.target.value)}
              />
            </div>
            <div class="mb-6">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="email"
              >
                Employee Position
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="position"
                type="text"
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>
            <div class="flex items-center justify-between">
              <button
                onClick={(e) => handleAddEmployee(e)}
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="buttond"
              >
                Add Employee
              </button>
            </div>
          </form>
        </div>
      )}
      {showSalary && (
        <div class="w-full max-w-xs mt-5">
          <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="flex justify-center font-bold pb-5">
              Add Salary of an Employee
            </h1>
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="username"
              >
                Employee
              </label>
              <div className="relative w-full lg:max-w-sm">
                <select
                  className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
                  onChange={(e) => setSelectedEmployee(e.target.value)}
                >
                  {employees &&
                    employees.map((item) => {
                      return (
                        <option key={item.email} value={item.email}>
                          {item.name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div class="mb-6">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="password"
              >
                Salary
              </label>
              <input
                class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="salary"
                type="number"
                onChange={(e) => setEmployeeSalary(e.target.value)}
              />
            </div>
            <div class="flex items-center justify-between">
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => handleAddSalary()}
              >
                Add Salary
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Models */}
      {editEmployee && (
        <div class="w-full max-w-xs mt-5">
          <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="flex justify-center font-bold pb-5">
              Edit an Employee
            </h1>
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="username"
              >
                Employee Name
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div class="mb-6">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="email"
              >
                Employee Email
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div class="mb-6">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="email"
              >
                Employee Phone
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                type="number"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div class="mb-6">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="email"
              >
                Employee Department
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="department"
                type="text"
                onChange={(e) => setDepartment(e.target.value)}
              />
            </div>
            <div class="mb-6">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="email"
              >
                Employee Position
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="position"
                type="text"
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>
            <div class="flex items-center justify-between">
              <button
                onClick={(e) => editEmployees()}
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="buttond"
              >
                Edit Employee
              </button>
            </div>
          </form>
        </div>
      )}
      {editSalary && (
        <div class="w-full max-w-xs mt-5">
          <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="flex justify-center font-bold pb-5">
              Edit Salary of an Employee
            </h1>
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="username"
              >
                Username
              </label>
              <div className="relative w-full lg:max-w-sm">
                <select className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
                  <option>Select Employee</option>
                  <option>Emp1</option>
                  <option>Emp1</option>
                  <option>Emp1</option>
                </select>
              </div>
            </div>
            <div class="mb-6">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="password"
              >
                Password
              </label>
              <input
                class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="salary"
                type="number"
              />
            </div>
            <div class="flex items-center justify-between">
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => editSalaries()}
              >
                Edit Salary
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Employees;
