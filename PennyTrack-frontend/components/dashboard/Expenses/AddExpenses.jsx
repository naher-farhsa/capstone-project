import React, { useState } from "react";
import axios from "axios"; // Import axios
import Alert from "@/components/utils/Alert";

export default function AddExpenses() {
  const [formData, setFormData] = useState({
    expense_description: "",
    expense_category: "",
    expense_amount: "",
    expense_date: "", // Add expense_date to formData
  });
  const [showAlert, setShowAlert] = useState(false);

  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/expense/addExpense`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      console.log("Form Data:", formData);
      const response = await axios.post(url, formData, config);

      console.log("Expense added successfully:", response.data);
      setShowAlert(true);

      setFormData({
        expense_description: "",
        expense_category: "",
        expense_amount: "",
        expense_date: "", // Clear expense_date as well
      });
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <div className="text-white">
      <div className="my-2 px-10">
        {showAlert ? (
          <Alert className="green" message="Expense successfully created" />
        ) : null}
      </div>
      <form
        className="lg:flex flex-col m-4 lg:mx-[20rem]"
        onSubmit={handleSubmit}
      >
        <div className="">
          {/* category */}
          <div className="mb-6">
            <p className="text-lg mb-6">Expense Category</p>
            <select
              name="expense_category" // Set name attribute
              value={formData.expense_category} // Set value attribute
              onChange={handleChange} // Handle change
              className="w-full h-[3.25rem] bg-[#292929] border border-[#333333] rounded-md p-4"
            >
              <option value="rent">Rent</option>
              <option value="shopping">Shopping</option>
              <option value="grocery">Grocery</option>
              <option value="fun_eating_out">Fun & Eating Out</option>
              <option value="trip">Trip</option>
              <option value="others">Others</option>
            </select>
          </div>
          {/* Desc */}
          <div className="mb-6">
            <p className="text-lg mb-6">Expense Description</p>
            <input
              type="text"
              name="expense_description" // Set name attribute
              value={formData.expense_description} // Set value attribute
              onChange={handleChange} // Handle change
              className="w-full h-[3.25rem] bg-[#292929] border border-[#333333] rounded-md p-4"
            />
          </div>
          {/* Amount */}
          <div className="mb-6">
            <p className="text-lg mb-6">Expense Amount</p>
            <input
              type="number"
              name="expense_amount" // Set name attribute
              value={formData.expense_amount} // Set value attribute
              onChange={handleChange} // Handle change
              className="w-full h-[3.25rem] bg-[#292929] border border-[#333333] rounded-md p-4"
            />
          </div>
          {/* Date */}
          <div className="mb-6">
            <p className="text-lg mb-6">Expense Date</p>
            <input
              type="date"
              name="expense_date" // Set name attribute
              value={formData.expense_date} // Set value attribute
              onChange={handleChange} // Handle change
              className="w-full h-[3.25rem] bg-[#292929] border border-[#333333] rounded-md p-4"
            />
          </div>
          <button
            type="submit" // Specify type attribute
            className="w-full flex justify-center items-center bg-gradient-to-r from-light-green-800 via-light-green-500 to-light-green-300 text-black text-xl font-medium rounded-[0.25rem] py-[0.6875rem] pr-4 pl-6 transition duration-300 ease-in-out hover:shadow-top-md hover:shadow-bottom-md"
          >
            Add Expense
          </button>
        </div>
      </form>
    </div>
  );
}
