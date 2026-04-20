export default function LoadingSpinner({ text = "Loading..." }) {
  return (
    <div className="p-8 text-center text-gray-500">
      <span class="loading loading-spinner text-info"></span>
      {text}
    </div>
  );
}
