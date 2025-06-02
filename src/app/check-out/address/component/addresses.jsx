import { useState } from "react";
import BillingDetailsForm from "../../component/BillingDetailsForm";

export default function AddressManagement() {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "HOME",
      address: "50 Washington Square S, NewYork, NY 10012, USA",
      payOnDelivery: true,
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [formData, setFormData] = useState({
    type: "",
    address: "",
    payOnDelivery: false,
  });

  const openModal = (address = null) => {
    setCurrentAddress(address);
    if (address) {
      setFormData({
        type: address.type,
        address: address.address,
        payOnDelivery: address.payOnDelivery,
      });
    } else {
      setFormData({ type: "", address: "", payOnDelivery: false });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentAddress(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentAddress) {
      // Update existing address
      setAddresses((prev) =>
        prev.map((addr) =>
          addr.id === currentAddress.id ? { ...addr, ...formData } : addr
        )
      );
    } else {
      // Add new address
      setAddresses((prev) => [...prev, { id: prev.length + 1, ...formData }]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
  };

  return (
    <div className="p-4 max-w-md mx-auto min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Selected Address Details</h2>

      {/* Address List */}
      {addresses.map((address) => (
        <div
          key={address.id}
          className="border border-gray-300 rounded-lg p-4 mb-4 bg-white shadow-sm"
        >
          <div className="flex items-center mb-2">
            <div className="w-4 h-4 bg-brown-600 rounded-full mr-2"></div>
            <span className="font-semibold">{address.type}</span>
          </div>
          <p className="text-gray-700 mb-2">{address.address}</p>
          {address.payOnDelivery && (
            <p className="text-gray-700 mb-2">• Pay on delivery available</p>
          )}
          <div className="flex space-x-2">
            <button
              onClick={() => handleDelete(address.id)}
              className="border border-gray-300 rounded px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              REMOVE
            </button>
            <button
              onClick={() => openModal(address)}
              className="bg-orange-500 text-white rounded px-4 py-2 hover:bg-orange-600"
            >
              EDIT
            </button>
          </div>
        </div>
      ))}

      {/* Add New Address Button */}
      <button
        onClick={() => openModal()}
        className="border border-dashed border-gray-400 rounded-lg w-full py-3 text-gray-700 hover:bg-gray-100"
      >
        + Add New Address
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="container mx-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full md:w-1/2">
              <div className="">
                <BillingDetailsForm
                  title={currentAddress ? "Edit Address" : "Add New Address"}
                  overflow={true}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
