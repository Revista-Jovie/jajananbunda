export default function InputField({ label, type, placeholder }) {
  return (
    <div>
      <label className="block text-gray-700 font-medium mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full p-2 border border-ray-300 rounded"
      />
    </div>
  );
}
