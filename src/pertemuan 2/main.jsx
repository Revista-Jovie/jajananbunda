import { createRoot } from "react-dom/client";
import './custom.css' ;
import ArtikelDetail from "./ArtikelDetail";
import Utama from "./Utama";
import QnASection from "./QnASection";
import ListProdct from "./ListProduct";

createRoot(document.getElementById("root")).render(
  <div>
    <Utama>
      <ArtikelDetail/>
      <ListProdct/>
      <QnASection/>
    </Utama>
  </div>
);
