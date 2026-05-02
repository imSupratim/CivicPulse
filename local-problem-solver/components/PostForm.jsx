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
      className="max-w-xl mt-15 text-black mx-auto bg-white p-6 rounded-2xl shadow-md space-y-4"
    >
      <h2 className="text-xl font-bold">Report a Problem</h2>

      <label className="text-gray-500 text-sm ">Title</label>
      <input
        type="text"
        name="title"
        placeholder="Problem Title"
        value={form.title}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <label className="text-gray-500 text-sm ">Description</label>
      <textarea
        name="description"
        placeholder="Describe the issue..."
        value={form.description}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        rows={4}
      />

      <label className="text-gray-500 text-sm ">Address</label>
      <input
        type="text"
        name="address"
        placeholder="Address (optional)"
        value={form.address}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <label className="text-gray-500 text-sm ">Location</label>
      <input
        type="text"
        name="mapLink"
        placeholder="Paste Google Maps link"
        value={form.mapLink}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      {/* <label className="text-gray-500 text-sm ">Upload Photo</label>
      <input
      type="file"
      id="fileUpload"
      className="bg-gray-400 p-2 w-full rounded"
      required={true}
      onChange={handleFileUpload}
      /> */}

      <label className="block text-sm font-medium text-gray-600 mb-1">
        Upload Photo
      </label>

      {/* <input
        type="file"
        id="fileUpload"
        className="hidden"
        onChange={handleFileUpload}
        required
      />


      <label
        htmlFor="fileUpload"
        className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition"
      >
        <span className="text-3xl mb-2">📸</span>
        <span className="text-gray-600 text-sm">Click to upload an image</span>
      </label> */}

      <input
        type="file"
        id="cameraUpload"
        className="hidden"
        accept="image/*"
        capture="environment"
        onChange={handleFileUpload}
      />

      <input
        type="file"
        id="galleryUpload"
        className="hidden"
        accept="image/*"
        onChange={handleFileUpload}
      />

      <div className="flex gap-3">
        <label
          htmlFor="cameraUpload"
          className="flex-1 text-center bg-blue-500 text-white py-2 rounded-xl cursor-pointer"
        >
          📸 Camera
        </label>

        <label
          htmlFor="galleryUpload"
          className="flex-1 text-center bg-gray-500 text-white py-2 rounded-xl cursor-pointer"
        >
          🖼️ Gallery
        </label>
      </div>

      {/* Preview */}
      {image && (
        <div className="mt-3">
          <img
            src={image}
            alt="preview"
            className="w-full h-40 object-cover rounded-xl shadow"
          />
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 cursor-pointer text-white py-2 rounded-xl hover:bg-blue-600 transition"
      >
        {loading ? "Posting..." : "Submit Problem"}
      </button>
    </form>
  );
}
