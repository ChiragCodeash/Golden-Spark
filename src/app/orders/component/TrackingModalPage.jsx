"use client";
import Modal from "@/components/Model";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";

const TrackingModalPage = ({ isModalOpen, setIsModalOpen }) => {
  // State to manage tracking data
  const [trackingData, setTrackingData] = useState({
    orderId: "FILL (368 x 23 Hug)",
    arrivingBy: "by April, 19 Apr",
    shipped: "Tomorrow",
    date: "Tuesday, 15 Apr",
    events: [
      {
        status: "Arriving: by April, 19 Apr",
        completed: false,
      },
      {
        status: "Shipped: Tomorrow",
        date: "Tuesday, 15 Apr",
        completed: false,
      },
      {
        status: "Item packed in dispatch warehouse",
        time: "12:23PM",
        completed: true,
      },
      {
        status: "Order Placed",
        date: "on Tue, 15 Apr",
        completed: true,
      },
    ],
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Find the index of the first non-completed event (in progress)
  const inProgressIndex = trackingData.events.findLastIndex(
    (event) => !event.completed
  );

  return (
    <div className="flex items-center justify-center p-4">
      {/* Button to open the aérea */}

      {/* Modal for tracking */}
      <Modal isOpen={isModalOpen} onClose={closeModal} maxWidth="max-w-lg">
        <div className="px-10 py-6 text-lg">
          {/* Header */}
          <h2 className="text-2xl font-semibold mb-4">Track Item</h2>
          {/* Tracking Status */}
          <div className="space-y-4">
            {/* Timeline Events */}
            {trackingData.events.map((event, index) => {
              // Determine if this event is "in progress"
              const isInProgress = index === inProgressIndex;

              return (
                <div key={index} className="relative flex items-start pb-6">
                  {/* Timeline Line */}
                  {index !== trackingData.events.length - 1 && (
                    <div className="absolute left-[0.55rem] top-6 h-[calc(100%-1rem)] w-0.5 bg-gray-300"></div>
                  )}
                  {/* Event Marker */}
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 cursor-pointer ${
                      event.completed
                        ? "bg-green-600"
                        : isInProgress
                        ? "bg-gray-200"
                        : "bg-gray-200"
                    }`}
                    title={
                      event.completed
                        ? "Mark as incomplete"
                        : isInProgress
                        ? "Mark as complete"
                        : "Mark as complete"
                    }
                  >
                    {isInProgress ? (
                      // In-progress dot
                      <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                    ) : (
                      // Checkmark for completed or not completed
                      <FaCheck
                        size={13}
                        className={
                          event.completed ? "text-white" : "text-gray-500"
                        }
                      />
                    )}
                  </div>
                  <div>
                    {event.status === "Arriving: by April, 19 Apr" ? (
                      <div className=" rounded-md">
                        <p className="font-medium">{event.status}</p>
                        <p className="text-sm text-gray-600">{event.details}</p>
                      </div>
                    ) : (
                      <div className="">
                        <p className="font-medium">
                          {event.time && event.time + ": "} {event.status}:{" "}
                          <span className="text-gray-500">{event.date}</span>
                        </p>
                        {event.status === "Shipped: Tomorrow" && (
                          <p className="text-2xl text-gray-500 mt-8">
                            {trackingData.date}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TrackingModalPage;