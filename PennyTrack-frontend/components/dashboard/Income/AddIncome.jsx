import React, { useState } from "react";
import axios from "axios";
import Alert from "@/components/utils/Alert";

export default function AddIncome() {
  const [formData, setFormData] = useState({
    income_description: "",
    income_category: "",
    income_amount: "",
    income_date: "", // Add income_date to formData
  });

  const [showAlert, setShowAlert] = useState(false);

  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/income/addIncome`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
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

      console.log("Income added successfully:", response.data);
      setShowAlert(true);

      setFormData({
        income_description: "",
        income_category: "",
        income_amount: "",
        income_date: "", // Add income_date to formData
      });
    } catch (error) {
      console.error("Error adding income:", error);
    }
  };

  return (
    <div className="text-white">
      <div className="my-2 px-10">
        {showAlert ? (
          <Alert className="green" message="Income successfully added" />
        ) : null}
      </div>
      <form
        className="lg:flex flex-col m-4 lg:mx-[20rem]"
        onSubmit={handleSubmit}
      >
        <div className="">
          {/* category */}
          <div className="mb-6">
            <p className="text-lg mb-6">Income Category</p>
            <select
              type="text"
              name="income_category"
              value={formData.income_category}
              onChange={handleChange}
              className="w-full h-[3.25rem] bg-[#292929] border border-[#333333] rounded-md p-4"
            >
              <option value="work">Work</option>
              <option value="main-hustle">Main Hustle</option>
              <option value="side-hustle">Side Hustle</option>
              <option value="trading">Trading</option>
              <option value="theft">Theft</option>
              <option value="others">Others</option>
            </select>
          </div>
          {/* Desc */}
          <div className="mb-6">
            <p className="text-lg mb-6">Income Description</p>
            <input
              type="text"
              name="income_description"
              value={formData.income_description}
              onChange={handleChange}
              className="w-full h-[3.25rem] bg-[#292929] border border-[#333333] rounded-md p-4"
            />
          </div>
          {/* Amount */}
          <div className="mb-6">
            <p className="text-lg mb-6">Income Amount</p>
            <input
              type="number"
              name="income_amount"
              value={formData.income_amount}
              onChange={handleChange}
              className="w-full h-[3.25rem] bg-[#292929] border border-[#333333] rounded-md p-4"
            />
          </div>
          {/* Date */}
          <div className="mb-6">
            <p className="text-lg mb-6">Income Date</p>
            <input
              type="date"
              name="income_date" // Set name attribute
              value={formData.income_date} // Set value attribute
              onChange={handleChange} // Handle change
              className="w-full h-[3.25rem] bg-[#292929] border border-[#333333] rounded-md p-4"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center items-center bg-gradient-to-r from-light-green-800 via-light-green-500 to-light-green-300 text-black text-xl font-medium rounded-[0.25rem] py-[0.6875rem] pr-4 pl-6 transition duration-300 ease-in-out hover:shadow-top-md hover:shadow-bottom-md"
          >
            Add Income
          </button>
        </div>
      </form>
    </div>
  );
}
