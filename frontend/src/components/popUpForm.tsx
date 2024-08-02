import axios from "axios";
import { toast } from "react-toastify";


function PopUpForm({ isVisible, onClose, id }: any) {

  if (!isVisible) return null;

  const sendMail = (): any => {
      const url = `http://localhost:5000/order/reject/${id}`;
      axios.patch(url).then((res:any) => {
        toast.success("Order rejected successfully", {
          autoClose: 1000,
        });
        
      });
  };
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-blue-600">Reject Product</h2>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              &times;
            </button>
          </div>
          <div>
            <label
              htmlFor="reason"
              className="block text-sm font-medium text-gray-700"
            >
              Reason
            </label>
            <select
              id="reason"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2"
            >
              <option>Choose a reason</option>
              <option>Reason 1</option>
              <option>Reason 1</option>
              <option>Reason 1</option>
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2"
              placeholder="Write your comment here..."
            ></textarea>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={sendMail}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PopUpForm;
