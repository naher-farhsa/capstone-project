import React, { useState } from "react";
import axios from "axios";
import Alert from "@/components/utils/Alert";

export default function AddBudget() {
  const [formData, setFormData] = useState({
    budget_category: "",
    budget_title: "",
    budget_description: "",
    budget_amount: "",
    threshold_amount: "",
  });

  const [showAlert, setShowAlert] = useState(false);

  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/budget/addBudget`;

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

      const response = await axios.post(url, formData, config);

      console.log("Budget added successfully:", response.data);
      setShowAlert(true);

      setFormData({
        budget_category: "",
        budget_title: "",
        budget_description: "",
        budget_amount: "",
        threshold_amount: "",
      });
      //   setShowAlert(false);
    } catch (error) {
      console.error("Error adding Budget:", error);
    }
  };

  return (
    <div className="text-white">
      <div className="my-2 px-10">
        {showAlert ? (
          <Alert className="green" message="Budget successfully created" />
        ) : null}
      </div>
      <form
        className="lg:flex flex-col m-4 lg:mx-[20rem]"
        onSubmit={handleSubmit}
      >
        <div className="">
          {/* category */}
          <div className="mb-6">
            <p className="text-lg mb-6">Budget Category</p>
            <select
              type="text"
              name="budget_category"
              value={formData.budget_category}
              onChange={handleChange}
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
          {/*Title */}
          <div className="mb-6">
            <p className="text-lg mb-6">Budget Title</p>
            <input
              type="text"
              name="budget_title"
              value={formData.budget_title}
              onChange={handleChange}
              className="w-full h-[3.25rem] bg-[#292929] border border-[#333333] rounded-md p-4"
            />
          </div>
          {/* Desc */}
          <div className="mb-6">
            <p className="text-lg mb-6">Budget Description</p>
            <input
              type="text"
              name="budget_description"
              value={formData.budget_description}
              onChange={handleChange}
              className="w-full h-[3.25rem] bg-[#292929] border border-[#333333] rounded-md p-4"
            />
          </div>
          {/* Budget Amount */}
          <div className="mb-6">
            <p className="text-lg mb-6">Budget Amount</p>
            <input
              type="number"
              name="budget_amount"
              value={formData.budget_amount}
              onChange={handleChange}
              className="w-full h-[3.25rem] bg-[#292929] border border-[#333333] rounded-md p-4"
            />
          </div>
          {/* Threshold Amount */}
          <div className="mb-6">
            <p className="text-lg mb-6">Threshold Amount</p>
            <input
              type="number"
              name="threshold_amount"
              value={formData.threshold_amount}
              onChange={handleChange}
              className="w-full h-[3.25rem] bg-[#292929] border border-[#333333] rounded-md p-4"
            />
          </div>
          <button className="w-full flex justify-center items-center bg-gradient-to-r from-light-green-800 via-light-green-500 to-light-green-300 text-black text-xl font-medium rounded-[0.25rem] py-[0.6875rem] pr-4 pl-6 transition duration-300 ease-in-out hover:shadow-top-md hover:shadow-bottom-md">
            Add Budget
          </button>
        </div>
      </form>
    </div>
  );
}
