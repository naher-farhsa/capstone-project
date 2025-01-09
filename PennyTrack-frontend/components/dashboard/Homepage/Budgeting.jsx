import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Budgeting() {
	const [budget, setBudget] = useState([]);
	const [transactions, setTransactions] = useState([]);

	useEffect(() => {
		const fetchBudget = async () => {
			try {
				const accessToken = localStorage.getItem("accessToken");
				if (!accessToken) {
					console.error("Access token not found");
					return;
				}

				const response = await axios.post(
					`${process.env.NEXT_PUBLIC_BACKEND_URL}/budget/getBudget`,
					{},
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					},
				);

				if (response.data.success) {
					setBudget(response.data.data);
				} else {
					console.error("Failed to fetch Budget:", response.data.message);
				}
			} catch (error) {
				console.error("Error fetching Budget:", error);
			}
		};

		const fetchTransactions = async () => {
			try {
				const accessToken = localStorage.getItem("accessToken");
				if (!accessToken) {
					console.error("Access token not found");
					return;
				}

				const response = await axios.post(
					`${process.env.NEXT_PUBLIC_BACKEND_URL}/transactions/getTransaction`,
					{},
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					},
				);

				if (response.data.success) {
					setTransactions(response.data.data);
				} else {
					console.error("Failed to fetch Transactions:", response.data.message);
				}
			} catch (error) {
				console.error("Error fetching Transactions:", error);
			}
		};

		fetchBudget();
		fetchTransactions();
	}, []);

	// Calculate total spent for each category
	const getCategorySpentAmount = (category) => {
		return transactions
			.filter((transaction) => transaction.transaction_category === category)
			.reduce(
				(total, transaction) => total + transaction.transaction_amount,
				0,
			);
	};

	// Calculate progress for each category based on the threshold amount
	const getCategoryProgress = (category) => {
		const budgetItem = budget.find((item) => item.budget_category === category);
		const spentAmount = getCategorySpentAmount(category);
		const thresholdAmount = budgetItem ? budgetItem.threshold_amount : 0;
		return (spentAmount / thresholdAmount) * 100;
	};

	// Check if the amount crossed the budget amount
	const isBudgetExceeded = (category) => {
		const budgetItem = budget.find((item) => item.budget_category === category);
		const spentAmount = getCategorySpentAmount(category);
		const budgetAmount = budgetItem ? budgetItem.budget_amount : 0;
		return spentAmount > budgetAmount;
	};

	return (
		<div className="w-1/2">
			<div className="bg-[#1d1d1d] w-full h-full p-8 rounded-xl">
				<h1 className="text-3xl text-light-green-500 font-medium">
					Budget Tracker
				</h1>
				{budget.map((item) => (
					<div key={item._id} className="my-4">
						<h2 className="text-xl text-white font-semibold">
							{item.budget_title}
						</h2>
						<p className="text-sm text-gray-400">{item.budget_description}</p>
						<p className="text-sm text-gray-400">
							Budget: ₹{item.budget_amount}
						</p>
						<div className="h-4 bg-gray-300 rounded-full mt-2">
							<div
								className="h-full bg-light-green-500 rounded-full"
								style={{
									width: `${getCategoryProgress(item.budget_category)}%`,
								}}
							></div>
						</div>
						<p className="text-xs text-gray-400 mt-1">
							Spent: ₹{getCategorySpentAmount(item.budget_category)}
						</p>
						{isBudgetExceeded(item.budget_category) && (
							<p className="text-xs text-red-500 mt-1">Budget Exceeded!</p>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
