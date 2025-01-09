import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";

export function ViewReminders() {
  const [reminders, setReminders] = useState([]);
  const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/reminder/getReminder`;

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          console.error("Access token not found");
          return;
        }

        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.data.success) {
          setReminders(response.data.data);
        } else {
          console.error("Failed to fetch reminders:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching reminders:", error);
      }
    };

    fetchReminders();
  }, []);

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const day = dateObject.getDate().toString().padStart(2, "0");
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = dateObject.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleCheckboxChange = async (reminderId, isChecked) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("Access token not found");
        return;
      }

      const response = await axios.patch(
        `${apiUrl}/${reminderId}`,
        { isCompleted: isChecked },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.success) {
        // Update the status locally
        setReminders((prevReminders) =>
          prevReminders.map((reminder) =>
            reminder._id === reminderId
              ? { ...reminder, isCompleted: isChecked }
              : reminder
          )
        );
      } else {
        console.error(
          "Failed to update reminder status:",
          response.data.message
        );
      }
    } catch (error) {
      console.error("Error updating reminder status:", error);
    }
  };

  return (
    <Card className="w-[96%] bg-[#1d1d1d] p-5">
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none bg-[#1d1d1d] text-light-green-500"
      >
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center ">
          <Typography variant="h4" color="light-green">
            Recent Reminders
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="overflow-hidden px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {["Title", "Amount", "Date", "Status"].map((head) => (
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
            {reminders.map(({ _id, title, amount, date, isCompleted }) => (
              <tr key={_id}>
                <td className="p-4 border-b border-blue-gray-50">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={isCompleted}
                      onChange={(e) =>
                        handleCheckboxChange(_id, e.target.checked)
                      }
                    />
                    <Typography
                      variant="small"
                      color="white"
                      className="font-bold"
                    >
                      {title}
                    </Typography>
                  </div>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <Typography
                    variant="small"
                    color="white"
                    className="font-normal"
                  >
                    {amount || "-"}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <Typography
                    variant="small"
                    color="white"
                    className="font-normal"
                  >
                    {formatDate(date)}
                  </Typography>
                </td>
                <td className="border-b border-blue-gray-50">
                  <Chip
                    size="sm"
                    variant="ghost"
                    value={isCompleted ? "Completed" : "Pending"}
                    color={isCompleted ? "light-green" : "amber"}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}
