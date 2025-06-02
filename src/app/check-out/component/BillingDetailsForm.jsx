"use client";
import React, { useState, useEffect } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import Button from "@/components/Button";
import countriesData from "../../../../src/countries+states+cities.json";
import Link from "next/link";

const InputField = ({
  id,
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  onBlur,
  error,
  required = false,
  className = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="mb-4">
      {/* {label && (
        <label
          htmlFor={id}
          className="block text-md md:text-xl text-gray-700 mb-1"
        >
          {label}
        </label>
      )} */}
      <div className="relative">
        <input
          id={id}
          name={id}
          type={isPassword && showPassword ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-1 ${
            error ? "border-red-500 focus:ring-red-500" : "border-gray-300"
          } ${className}`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            tabIndex={-1}
          >
            {showPassword ? (
              <IoEyeOutline size={20} className="cursor-pointer" />
            ) : (
              <IoEyeOffOutline size={20} className="cursor-pointer" />
            )}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

const BillingDetailsForm = ({ title, contant, overflow }) => {
  const [formData, setFormData] = useState({
    email: "",
    subscribe: true,
    country: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    saveAddress: false,
  });

  const [errors, setErrors] = useState({});
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch countries
    const fetchCountries = async () => {
      try {
        // In a real app, you would fetch this from your API
        setCountries(countriesData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handleReset = () => {
    setFormData({
      email: "",
      subscribe: true,
      country: "",
      firstName: "",
      lastName: "",
      address: "",
      apartment: "",
      city: "",
      state: "",
      zipCode: "",
      saveAddress: false,
    });
  };

  useEffect(() => {
    if (formData.country) {
      const selectedCountry = countries.find(
        (c) => c.name === formData.country
      );
      setStates(selectedCountry?.states || []);
      setFormData((prev) => ({ ...prev, state: "" }));
    } else {
      setStates([]);
    }
  }, [formData.country, countries]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let error = "";

    if (
      !value &&
      name !== "apartment" &&
      name !== "subscribe" &&
      name !== "saveAddress"
    ) {
      error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    } else if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = "Invalid email address";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate all required fields
    Object.keys(formData).forEach((key) => {
      if (key !== "apartment" && key !== "subscribe" && key !== "saveAddress") {
        if (!formData[key]) {
          newErrors[key] = `${
            key.charAt(0).toUpperCase() + key.slice(1)
          } is required`;
        }
      }
    });

    // Special email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", formData);
      // Handle form submission
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading countries...</div>;
  }

  return (
    <div className="billingDetailsForm">
      <div className="container mx-auto">
        <div className="">
          <h1 className="text-2xl font-bold mb-4 cursor-pointer">
            {title}
            {/* Billing Details */}
          </h1>

          <div className={overflow && "overflow-auto h-[70vh]"}>
            {/* Contact Section */}
            <section className="mb-8">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold mb-4">Contact</h2>
                <div className="mb-4">
                  <p className="text-gray-700">
                    Have an account?
                    <Link
                      href="auth/sign-in"
                      className="font-bold text-black border-b"
                    >
                      Log in
                    </Link>
                  </p>
                </div>
              </div>

              <InputField
                id="email"
                label="Your email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email}
                placeholder="Your email"
              />

              <div className="flex items-center mb-6">
                <input
                  id="subscribe"
                  type="checkbox"
                  name="subscribe"
                  checked={formData.subscribe}
                  onChange={handleChange}
                  className="h-4 w-4 rounded custom-checkbox border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="subscribe" className="ml-2 text-gray-700">
                  Email me with news and offers
                </label>
              </div>
            </section>

            {/* Delivery Information Section */}
            <section className="mb-5">
              <h2 className="text-2xl font-semibold mb-4">
                Delivery Information
              </h2>

              <div className="relative mb-6">
                <select
                  id="country"
                  name="country"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={formData.country}
                  className={`block w-full pt-5 pb-1 ps-2 border-1 rounded-md appearance-none focus:outline-none focus:ring-0 peer bg-transparent ${
                    errors.country ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="" disabled></option>
                  {countries.map((country) => (
                    <option key={country.id} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>

                <label
                  htmlFor="country"
                  className={`absolute left-2 top-1/2 text-md -translate-y-1/2 text-gray-500 transform transition-all duration-200 pointer-events-none ${
                    formData.country ||
                    document.activeElement ===
                      document.getElementById("country")
                      ? "-translate-y-6 text-xs "
                      : "peer-focus:-translate-y-6 peer-focus:text-x"
                  }`}
                >
                  Country/Region
                </label>

                {/* Dropdown arrow icon */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                {errors.country && (
                  <p className="mt-1 text-sm text-red-500">{errors.country}</p>
                )}
              </div>

              {/* <div className="mb-4">
                <label htmlFor="country" className="block text-gray-700 mb-1">
                  Country/Region
                </label>
                <select
                  id="country"
                  name="country"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={formData.country}
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-1 ${
                    errors.country
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300"
                  }`}
                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option key={country.id} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
                {errors.country && (
                  <p className="text-red-500 text-sm mt-1">{errors.country}</p>
                )}
              </div> */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <InputField
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.firstName}
                  placeholder="First name"
                />
                <InputField
                  id="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.lastName}
                />
              </div>

              <InputField
                id="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.address}
              />

              <InputField
                id="apartment"
                placeholder="Apartment, suite, unit, etc. (Optional)"
                value={formData.apartment}
                onChange={handleChange}
                className=""
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4">
                <InputField
                  id="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.city}
                />

                <div className="mb-4">
                  <select
                    id="state"
                    name="state"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={formData.state}
                    disabled={!formData.country}
                    className={`w-full px-4 py-3.5 border rounded-md focus:outline-none focus:ring-1 ${
                      errors.state
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="" className="text-red-500" disabled>
                      State
                    </option>
                    {states.map((state) => (
                      <option key={state.id} value={state.name}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                  {errors.state && (
                    <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                  )}
                </div>

                <InputField
                  id="zipCode"
                  placeholder="ZIP Code"
                  value={formData.zipCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.zipCode}
                />
              </div>

              <div className="flex items-center mb-6">
                <input
                  id="saveAddress"
                  type="checkbox"
                  name="saveAddress"
                  checked={formData.saveAddress}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 custom-checkbox text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="saveAddress" className="ml-2 text-lg">
                  Make this as my default address
                </label>
              </div>
            </section>
          </div>
          {/* Form Footer */}
          <div className="sm:pt-3">
            <div className="grid grid-cols-2 gap-4 sm:gap-8 space-x-4">
              <Button
                label="CANCEL"
                variant="outline"
                className="px-6 py-3 w-full border !text-black border-black"
                onClick={handleReset}
              />
              <Button
                label="SAVE"
                variant="solid"
                className="px-6 py-3 !bg-yellow-800"
                onClick={handleSubmit}
              />
            </div>

            {contant && (
              <p className="text-lg pt-4 text-md mb-4 md:mb-0">
                Your info will be saved to a Shop account. By continuing, you
                agree to Shop's Terms of Service and acknowledge the Privacy
                Policy .
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingDetailsForm;