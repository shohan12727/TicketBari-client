import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { imageUpload } from "../../../Utilities/imagebb";
import useAuth from "../../../Hooks/useAuth";
import { useEffect } from "react";

const bangladeshiDivisions = [
  "Dhaka",
  "Chittagong",
  "Rajshahi",
  "Khulna",
  "Barisal",
  "Sylhet",
  "Rangpur",
  "Mymensingh",
];
const transportTypes = ["Bus", "Plane", "Train", "Ship"];
const availablePerks = ["AC", "Breakfast", "WiFi", "Lunch", "Dinner", "Snacks"];

export default function TicketForm() {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      vendorName: "",
      vendorEmail: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        vendorName: user?.displayName,
        vendorEmail: user?.email,
      });
    }
  }, [user, reset]);

  const fromLocation = watch("fromLocation");
  const toLocation = watch("toLocation");

  const onSubmit = async (data) => {
    const {
      vendorName,
      vendorEmail,
      transportType,
      toLocation,
      ticketTitle,
      quantity,
      price,
      perks,
      imagefromLocation,
      departureDateTime,
      image,
    } = data;
    const imageFile = image[0];
    try {
      const imageURL = await imageUpload(imageFile);
      console.log(imageURL, departureDateTime);

      toast.success("Ticket added Successfully");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }

    console.log("clicked");
    reset();
  };

  return (
    <div className="min-h-screen  py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Add New Ticket
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Ticket Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ticket Title <span className="text-[#e30b13]">*</span>
                </label>
                <input
                  type="text"
                  {...register("ticketTitle", {
                    required: "Ticket title is required",
                    minLength: {
                      value: 3,
                      message: "Title must be at least 3 characters",
                    },
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e30b13] focus:border-transparent outline-none transition"
                  placeholder="e.g., Dhaka to Chittagong Express"
                />
                {errors.ticketTitle && (
                  <p className="text-[#e30b13] text-sm mt-1">
                    {errors.ticketTitle.message}
                  </p>
                )}
              </div>

              {/* From Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From <span className="text-[#e30b13]">*</span>
                </label>
                <select
                  {...register("fromLocation", {
                    required: "Please select departure location",
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e30b13] focus:border-transparent outline-none transition"
                >
                  <option value="">Select Division</option>
                  {bangladeshiDivisions.map((division) => (
                    <option
                      key={division}
                      value={division}
                      disabled={division === toLocation}
                    >
                      {division}
                    </option>
                  ))}
                </select>
                {errors.fromLocation && (
                  <p className="text-[#e30b13] text-sm mt-1">
                    {errors.fromLocation.message}
                  </p>
                )}
              </div>

              {/* To Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To <span className="text-[#e30b13]">*</span>
                </label>
                <select
                  {...register("toLocation", {
                    required: "Please select destination location",
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e30b13] focus:border-transparent outline-none transition"
                >
                  <option value="">Select Division</option>
                  {bangladeshiDivisions.map((division) => (
                    <option
                      key={division}
                      value={division}
                      disabled={division === fromLocation}
                    >
                      {division}
                    </option>
                  ))}
                </select>
                {errors.toLocation && (
                  <p className="text-[#e30b13] text-sm mt-1">
                    {errors.toLocation.message}
                  </p>
                )}
              </div>

              {/* Transport Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transport Type <span className="text-[#e30b13]">*</span>
                </label>
                <select
                  {...register("transportType", {
                    required: "Please select transport type",
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e30b13] focus:border-transparent outline-none transition"
                >
                  <option value="">Select Type</option>
                  {transportTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.transportType && (
                  <p className="text-[#e30b13] text-sm mt-1">
                    {errors.transportType.message}
                  </p>
                )}
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (per unit) <span className="text-[#e30b13]">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("price", {
                    required: "Price is required",
                    min: { value: 1, message: "Price must be at least 1" },
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e30b13] focus:border-transparent outline-none transition"
                  placeholder="0.00"
                />
                {errors.price && (
                  <p className="text-[#e30b13] text-sm mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>

              {/* Ticket Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ticket Quantity <span className="text-[#e30b13]">*</span>
                </label>
                <input
                  type="number"
                  {...register("quantity", {
                    required: "Quantity is required",
                    min: { value: 1, message: "Quantity must be at least 1" },
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e30b13] focus:border-transparent outline-none transition"
                  placeholder="Put Your Quantity"
                />
                {errors.quantity && (
                  <p className="text-[#e30b13] text-sm mt-1">
                    {errors.quantity.message}
                  </p>
                )}
              </div>

              {/* Departure Date & Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Departure Date & Time{" "}
                  <span className="text-[#e30b13]">*</span>
                </label>
                <input
                  type="datetime-local"
                  {...register("departureDateTime", {
                    required: "Departure date and time is required",
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e30b13] focus:border-transparent outline-none transition"
                />
                {errors.departureDateTime && (
                  <p className="text-[#e30b13] text-sm mt-1">
                    {errors.departureDateTime.message}
                  </p>
                )}
              </div>

              {/* Perks */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Perks
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {availablePerks.map((perk) => (
                    <label
                      key={perk}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        value={perk}
                        {...register("perks")}
                        className="w-4 h-4 text-[#e30b13] border-gray-300 rounded focus:ring-[#e30b13]"
                      />
                      <span className="text-sm text-gray-700">{perk}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Image Upload */}

              <label htmlFor="image" className="label mb-2">
                Add Image
              </label>
              <input
                type="file"
                className="block w-full text-sm text-gray-500 input
         file:text-white file:py-1 file:px-2 file:font-bold file:bg-primary file:rounded-md
         rounded-md cursor-pointer
         focus:outline-none focus:ring-2 py-2"
                {...register("image", { required: "Image is required." })}
              />
              {errors.image && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.image.message}
                </p>
              )}

              {/* Vendor Name (readonly) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vendor Name
                </label>
                <input
                  type="text"
                  {...register("vendorName")}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                />
              </div>

              {/* Vendor Email (readonly) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vendor Email
                </label>
                <input
                  type="email"
                  {...register("vendorEmail")}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="px-8 py-3 bg-[#e30b13] hover:bg-[#A3070C] text-white font-semibold rounded-lg transition duration-200 shadow-md hover:shadow-lg"
              >
                Add Ticket
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
