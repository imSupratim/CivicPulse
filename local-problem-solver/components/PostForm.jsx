"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function PostForm() {
  const { user, isLoaded } = useUser();
  const [form, setForm] = useState({
    title: "",
    description: "",
    address: "",
    mapLink: "",
  });

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "local_problem_app");
    data.append("cloud_name", "dtmp431dj");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dtmp431dj/image/upload",
      {
        method: "POST",
        body: data,
      },
    );

    const uploadImageURL = await response.json();
    setImage(uploadImageURL.secure_url);
    console.log(image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.description) {
      alert("Title and description are required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/problems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          location: {
            address: form.address,
          },
          mapLink: form.mapLink,
          clerkId: user.id,
          userName: user.fullName,
          imageURL: image,
        }),
      });

      const data = await res.json();

      console.log(data);
      alert("✅ Problem posted successfully");

      // reset form
      setForm({
        title: "",
        description: "",
        address: "",
        mapLink: "",
      });
    } catch (error) {
      console.error(error);
      alert("❌ Error posting problem");
    }

    setLoading(false);
  };

  return (
    <form
  onSubmit={handleSubmit}
  className="w-4/5 mx-auto mt-18 bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
>
  {/* Header */}
  <div className="bg-linear-to-r from-blue-600 to-indigo-600 px-6 py-4">
    <h2 className="text-2xl font-bold text-white">
      Report a Local Problem
    </h2>
    <p className="text-blue-100 text-sm mt-1">
      Help improve your community by reporting issues
    </p>
  </div>

  <div className="grid lg:grid-cols-2 gap-6 p-6">

    {/* LEFT SIDE */}
    <div className="space-y-4">

      {/* Title */}
      <div>
        <label className="text-sm font-medium text-gray-600 mb-1 block">
          Problem Title
        </label>

        <input
          type="text"
          name="title"
          placeholder="Ex: Water supply disruption"
          value={form.title}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Description */}
      <div>
        <label className="text-sm font-medium text-gray-600 mb-1 block">
          Description
        </label>

        <textarea
          name="description"
          placeholder="Describe the issue..."
          value={form.description}
          onChange={handleChange}
          rows={5}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
        />
      </div>

      {/* Address */}
      <div>
        <label className="text-sm font-medium text-gray-600 mb-1 block">
          Address
        </label>

        <input
          type="text"
          name="address"
          placeholder="Salt Lake Sector V"
          value={form.address}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Map Link */}
      <div>
        <label className="text-sm font-medium text-gray-600 mb-1 block">
          Google Maps Link
        </label>

        <input
          type="text"
          name="mapLink"
          placeholder="Paste Google Maps URL"
          value={form.mapLink}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>
    </div>

    {/* RIGHT SIDE */}
    <div className="flex flex-col justify-between">

      {/* Upload */}
      <div>
        <label className="text-sm font-medium text-gray-600 mb-2 block">
          Upload Photo
        </label>

        <input
          type="file"
          id="fileUpload"
          className="hidden"
          onChange={handleFileUpload}
          required
        />

        <label
          htmlFor="fileUpload"
          className="flex flex-col items-center justify-center h-36 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition"
        >
          <span className="text-4xl mb-2">📸</span>

          <span className="text-gray-600 text-sm">
            Click to upload image
          </span>

          <span className="text-xs text-gray-400 mt-1">
            JPG, PNG supported
          </span>
        </label>

        {/* Preview */}
        {image && (
          <div className="mt-4">
            <img
              src={image}
              alt="preview"
              className="w-full h-56 object-cover rounded-2xl shadow"
            />
          </div>
        )}
      </div>

      {/* Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition cursor-pointer"
      >
        {loading ? "Posting..." : "Submit Problem"}
      </button>
    </div>
  </div>
</form>
  );




}
