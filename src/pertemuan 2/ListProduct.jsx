export default function ListProdct() {
  return (
    <div>
      <h2>List Produk</h2>
      <Filter />
      <div className="product-list">
        <Undangan1 />
        <Undangan2 />
        <Undangan3 />
        <Undangan4 />
      </div>
    </div>
  );
}

function Filter() {
  return (
    <div className="filter-bar">
      <button>Populer</button>
      <button>Elegan</button>
      <button>Simple</button>
    </div>
  );
}

function Undangan1() {
  return (
    <div class="card-product">
      <img src="img/undangan 1.webp" width="300px" heigth="100px"/>
      <div>
        <h3>The Premium</h3>
        <p>Rp 7000 /pcs</p>
        <p>4.5 / 5</p>
        <button>Lihat Detail</button>
      </div>
    </div>
  );
}

function Undangan2() {
  return (
      <div class="card-product">
        <img src="img/undangan 2.jpg" width="300px" height="225px" />
        <div>
          <h3>The Glamour</h3>
          <p>Rp 8000 /pcs</p>
          <p>4.8 / 5</p>
          <button>Lihat Detail</button>
        </div>
      </div>
  );
}

function Undangan3() {
  return (
      <div class="card-product">
        <img src="img/undagan 3.jpg" width="300px" height="225px"/>
        <div>
          <h3>The Elegan</h3>
          <p>Rp 6000 /pcs</p>
          <p>4.7 / 5</p>
          <button>Lihat Detail</button>
        </div>
      </div>
  );
}

function Undangan4() {
  return (
      <div class="card-product">
        <img src="img/undangan 4.jpeg" width="300px" height="225px"/>
        <div>
          <h3>The Populer</h3>
          <p>Rp 5000 /pcs</p>
          <p>4.9 / 5</p>
          <button>Lihat Detail</button>
        </div>
      </div>
  );
}
