"use client";

import { useRouter } from "next/navigation";
import axios from "axios";

export default function DeleteButton({ problemId }) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/delete/${problemId}`);

      alert("✅ Problem deleted successfully.");

      router.push("/mypost"); // or wherever you want
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete problem.");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 cursor-pointer hover:bg-red-700 text-white font-semibold px-4 py-3 rounded-lg hover:scale-105 hover:shadow-2xl transition ease-in-out"
    >
      🗑 Delete
    </button>
  );
}