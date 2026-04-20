import { createRoot } from "react-dom/client";
import './tailwind.css';
import HitungDP from "./HitungDP";
import FormPelanggan from "./FormPelanggan";

createRoot(document.getElementById("root")).render(
  <div>
    <FormPelanggan/>
    <HitungDP/>
  </div>
);
