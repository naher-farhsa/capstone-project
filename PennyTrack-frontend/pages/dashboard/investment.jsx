"use client";
import { Sidebar } from "@/components/dashboard/Sidebar";
import {
	ArrowTrendingUpIcon,
	ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { Avatar } from "@material-tailwind/react";
import axios from "axios";
import { SunMedium } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Investment() {
	const [income, setIncome] = useState("");
	const [suggestions, setSuggestions] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [fullName, setFullName] = useState("");

	const router = useRouter();

	useEffect(() => {
		if (typeof window !== "undefined") {
			const accessToken = localStorage.getItem("accessToken");
			if (!accessToken) {
				router.push("/login");
			}
			const storedFullName = localStorage.getItem("fullName");
			setFullName(storedFullName);
		}
	}, []);

	const handleGetSuggestions = async () => {
		if (!income) {
			setError("Please enter your income to get suggestions.");
			return;
		}

		if (isNaN(income) || income < 0) {
			setError("Please enter a valid income value.");
			return;
		}

		setLoading(true);
		setError(null);
		try {
			const response = await axios.post(
				"http://127.0.0.1:5000/getInvestmentSuggestions",
				{
					income: parseFloat(income),
				},
			);

			// Handle the new response format
			if (response.data && response.data.recommendations) {
				// Transform the recommendations into the format expected by the UI
				const transformedSuggestions = response.data.recommendations.flatMap(
					(recommendation) =>
						recommendation.options.map((option) => ({
							PredictedOption: option.option,
							RiskLevel: option.risk_level,
							ExpectedReturn: option.expected_return,
							MaxPotentialLoss: option.max_loss,
							Confidence: (option.confidence * 100).toFixed(1),
						})),
				);
				setSuggestions(transformedSuggestions);
			} else if (response.data && Array.isArray(response.data)) {
				// Handle the old format for backward compatibility
				setSuggestions(response.data);
			} else {
				throw new Error("Invalid response format");
			}
		} catch (err) {
			setError(
				err.response?.data?.message ||
					"Error fetching investment suggestions. Please try again.",
			);
			console.error("Error:", err);
		} finally {
			setLoading(false);
		}
	};

	const getRiskIcon = (riskLevel) => {
		riskLevel = riskLevel.toLowerCase();
		if (riskLevel.includes("low")) {
			return <ShieldCheckIcon className="w-6 h-6 text-green-500 mr-3" />;
		} else if (riskLevel.includes("medium") || riskLevel.includes("moderate")) {
			return <SunMedium className="w-6 h-6 text-yellow-500 mr-3" />;
		} else {
			return <ArrowTrendingUpIcon className="w-6 h-6 text-red-500 mr-3" />;
		}
	};

	return (
		<div className="flex flex-col">
			<div className="flex">
				<div className="min-h-screen">
					<Sidebar />
				</div>
				<div className="flex flex-col w-full space-x-6">
					<InvestmentTopbar fullName={fullName} />
					<div className="p-6 text-white">
						<h1 className="text-2xl font-bold mb-6">Investment Suggestions</h1>
						<div className="mb-6 flex items-center">
							<input
								type="number"
								value={income}
								onChange={(e) => setIncome(e.target.value)}
								placeholder="Enter your income in Lakhs"
								className="border border-gray-300 p-3 rounded bg-[#292929] text-white w-64 mr-4"
							/>
							<button
								onClick={handleGetSuggestions}
								className="bg-light-green-500 text-black px-6 py-3 rounded hover:bg-light-green-600"
							>
								{loading ? "Loading..." : "Get Suggestions"}
							</button>
						</div>

						{error && <p className="text-red-500 mb-4">{error}</p>}

						{loading && (
							<div className="flex justify-center items-center mb-4">
								<CustomSpinner />
							</div>
						)}

						{suggestions.length > 0 && !loading && !error && (
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
								{suggestions.map((item, index) => (
									<div
										key={index}
										className="bg-[#1d1d1d] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
									>
										<div className="flex items-center mb-4">
											{getRiskIcon(item.RiskLevel)}
											<h2 className="text-xl font-semibold text-light-green-500">
												{item.PredictedOption || "N/A"}
											</h2>
										</div>
										<p className="mb-2">
											<strong>Risk Level:</strong>{" "}
											<span
												className={`
                                                ${
																									item.RiskLevel?.toLowerCase().includes(
																										"low",
																									)
																										? "text-green-500"
																										: ""
																								}
                                                ${
																									item.RiskLevel?.toLowerCase().includes(
																										"medium",
																									)
																										? "text-yellow-500"
																										: ""
																								}
                                                ${
																									item.RiskLevel?.toLowerCase().includes(
																										"high",
																									)
																										? "text-red-500"
																										: ""
																								}
                                            `}
											>
												{item.RiskLevel || "N/A"}
											</span>
										</p>
										<p className="mb-2">
											<strong>Expected Return:</strong>{" "}
											<span className="text-light-green-500">
												{item.ExpectedReturn ?? "N/A"}%
											</span>
										</p>
										<p className="mb-2">
											<strong>Max Potential Loss:</strong>{" "}
											<span className="text-red-400">
												{item.MaxPotentialLoss ?? "N/A"}%
											</span>
										</p>
										{item.Confidence && (
											<p className="mb-2">
												<strong>Confidence:</strong>{" "}
												<span className="text-blue-400">
													{item.Confidence}%
												</span>
											</p>
										)}
									</div>
								))}
							</div>
						)}

						{suggestions.length === 0 && !loading && !error && (
							<p className="text-gray-400 mt-6">
								No suggestions found for the given input.
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

const InvestmentTopbar = ({ fullName }) => (
	<div className="flex justify-between items-center p-8 h-28 w-full text-white">
		<h1 className="text-4xl font-medium">Investment Suggestions</h1>
		<div className="w-[16rem] bg-[#1d1d1d] px-4 py-2.5 rounded-lg">
			<div className="flex gap-x-6 items-center">
				<Avatar
					src="https://docs.material-tailwind.com/img/face-2.jpg"
					alt="avatar"
					size="lg"
				/>
				{fullName}
			</div>
		</div>
	</div>
);

const CustomSpinner = () => (
	<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-light-green-500"></div>
);
