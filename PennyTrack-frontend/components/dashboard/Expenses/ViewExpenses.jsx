import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import axios from "axios";

const TABLE_HEAD = ["Description", "Category", "Amount", "Date"];

export function ViewExpenses() {
  const [expense, setExpense] = useState([]);
  const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/expense/getExpense`;

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          console.error("Access token not found");
          return;
        }

        const response = await axios.post(
          apiUrl,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.data.success) {
          setExpense(response.data.data);
        } else {
          console.error("Failed to fetch Expense:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching Expense:", error);
      }
    };

    fetchExpense();
  }, []);

  // Function to format date to DD-MM-YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <Card className="h-screen w-[96%] bg-[#1d1d1d] p-5">
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none bg-[#1d1d1d] text-light-green-500"
      >
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center ">
          <Typography variant="h4" color="light-green">
            Recent Expenses
          </Typography>
          <Typography color="light-green" className="mt-1 font-normal">
            These are details about the last transactions
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="overflow-hidden px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-slate-600 p-4"
                >
                  <Typography
                    variant="h6"
                    color="white"
                    className="font-normal leading-none opacity-80"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {expense.map(
              ({
                _id,
                expense_description,
                expense_category,
                expense_amount,
                createdAt,
              }) => (
                <tr key={_id}>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex items-center gap-3">
                      <Typography
                        variant="small"
                        color="white"
                        className="font-bold"
                      >
                        {expense_description}
                      </Typography>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="white"
                      className="font-normal"
                    >
                      {expense_category}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="white"
                      className="font-normal"
                    >
                      {expense_amount || "-"}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="white"
                      className="font-normal"
                    >
                      {formatDate(createdAt)}
                    </Typography>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}
