import React, { useEffect, useState } from "react";
import { InboxArrowDownIcon } from "@heroicons/react/24/solid";
import axios from "axios";

const IEBCards = () => {
	const [income, setIncome] = useState("0");
	const [expenses, setExpenses] = useState("0");
	const [balance, setBalance] = useState("0");

	const incomeUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/income/totalIncome`;
	const expensesUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/expense/totalExpense`;
	const accessToken = localStorage.getItem("accessToken");

	const getIncomeExpenses = async () => {
		try {
			const config = {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			};

			const [incomeResponse, expensesResponse] = await Promise.all([
				axios.get(incomeUrl, config),
				axios.get(expensesUrl, config),
			]);

			const { totalIncome } = incomeResponse.data.data;
			const { totalExpense } = expensesResponse.data.data;

			console.log("Income Response:", totalIncome);
			console.log("Expenses Response:", totalExpense);

			setIncome(totalIncome);
			setExpenses(totalExpense);
			setBalance(totalIncome - totalExpense);
		} catch (error) {
			console.error("Error fetching income and expenses:", error);
		}
	};

	useEffect(() => {
		getIncomeExpenses();
	}, []);

	return (
		<div className="flex  justify-around items-center space-x-10 w-full">
			<Card title="Income" value={`₹${income}`} />
			<Card title="Expenses" value={`₹${expenses}`} />
			<Card title="Balance" value={`₹${balance}`} />
		</div>
	);
};

const Card = ({ title, value }) => (
	<div className="grid place-items-center w-[26rem] bg-[#1d1d1d] p-8 rounded-lg text-light-green-500">
		<div className="flex justify-center items-center w-10 h-10 bg-gray-800 rounded-lg mb-4">
			<InboxArrowDownIcon className="w-5 h-5" />
		</div>
		<p className="text-xl">{title}</p>
		<p className="text-3xl">{value}</p>
	</div>
);

export default IEBCards;
