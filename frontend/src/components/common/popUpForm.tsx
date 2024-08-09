import axios from "axios";
import { useState } from "react";
import env from "react-dotenv";
import { toast } from "react-toastify";

function PopUpForm({ isVisible, onClose, id }: any) {
  const [reason, setReason] = useState<any>({
    reason: "",
    comment: "",
  });

  if (!isVisible) return null;
  const role = localStorage.getItem("role");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    sendMail();
  };

  const sendMail = (): any => {
    const url = `${env.API}order/reject/${id}`;
    const data = { reason: reason.reason, comment: reason.comment, role: role};

    axios
      .patch(url, data)
      .then((res: any) => {
        toast.success("Order rejected successfully", {
          autoClose: 1000,
        });
      })
      .catch((error: any) => {
        toast.error("Failed to reject order", {
          autoClose: 1000,
        });
      });

    onClose();
    toast.success("Mail sent successfully", {
      autoClose: 1000,
    });
  };

  const handlePopupContentClick = (e: any) => {
    e.stopPropagation();
  };

  return (
    <>
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        onClick={onClose}
      >
        <div
          className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full space-y-4"
          onClick={handlePopupContentClick}
        >
          <div className="flex justify-between items-center">
            {role == "Admin" ? (
              <h2 className="text-2xl font-bold text-blue-600">
                Reject Product
              </h2>
            ) : (
              <h2 className="text-2xl font-bold text-blue-600">Cancel Order</h2>
            )}
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              &times;
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="reason"
                className="block text-sm font-medium text-gray-700"
              >
                Reason
              </label>
              <select
                id="reason"
                value={reason.reason}
                onChange={(e) =>
                  setReason({ ...reason, reason: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2"
              >
                <option>Choose a reason</option>
                {role === "admin"
                  ? [
                      "Insufficient Inventory",
                      "Payment Issues",
                      "Invalid Shipping Address",
                      "Fraud Detection",
                      "Order Limit Exceeded",
                      "Restricted Items",
                      "Incomplete Information",
                      "Technical Errors",
                      "Verification Failure",
                      "Customer Request",
                      "Policy Violations",
                      "Duplicate Orders",
                      "Shipping Restrictions",
                      "Excessive Returns",
                      "Customs Issues",
                      "Incorrect Pricing",
                      "Promotion Abuse",
                      "Order Modifications",
                      "System Glitches",
                    ].map((option: any) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))
                  : [
                      "Changed Mind",
                      "Found Cheaper Elsewhere",
                      "Order Mistake",
                      "Long Delivery Time",
                      "Financial Reasons",
                      "Bought Elsewhere",
                      "Product Not Needed",
                      "Shipping Costs",
                      "Unclear Product Description",
                      "Received as a Gift",
                      "Negative Reviews",
                      "Backordered Item",
                      "Technical Issues",
                      "Incorrect Item",
                      "Customer Service Issues",
                    ].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="comment"
                className="block text-sm font-medium text-gray-700"
              >
                Comment
              </label>
              <textarea
                id="comment"
                value={reason.comment}
                onChange={(e) =>
                  setReason({ ...reason, comment: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2"
                placeholder="Write your comment here..."
              ></textarea>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default PopUpForm;
