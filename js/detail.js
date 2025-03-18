import { menu } from "./db.js";
import { calculatePrice, elements } from "./helpers.js";

//* URL'deki parametreleri yönetebilmek için URLSearchParams classından örnek oluşturduk.
//* örneği oluştururken kendi url'mizde ki parametreleri gönderdik.
const search = window.location.search;
const searchParams = new URLSearchParams(search);
//* Get methoduna gönderdiğimiz değişkene göre değere ulaştık.
const paramid = searchParams.get("id");
//* URL' den aldığımız paramid değişkenini numbera çevirdik ve sonrasında bu idli elemanı dizi içersinden bulduk.
const product = menu.find((item) => item.id === Number(paramid));

console.log(elements.outlet)

elements.outlet.innerHTML = 
`
    <div class="d-flex justify-content-between align-items-center">
        <a href="/index.html">
          <i class="bi bi-house fs-1"></i>
        </a>
        <div> anasayfa / ${product.category} / ${product.title.toLowerCase()}  </div>
      </div>
      <h1 class="text-center my-3 shadow p-2 rounded">${product.title}</h1>
      <div class="d-flex justify-content-center align-items-center">
        <img
          style="max-width: 480px"
          class="img-fluid shadow rounded"
          src="${product.img}"
          alt=""
        />
      </div>
      <div>
        <h3 class="my-5">
          Ürünün kategorisi: <span class="text-success">${product.title}</span>
        </h3>
        <h3>Ürünün fiyatı: <span class="text-success">${calculatePrice(product.price)} ₺</span></h3>
      </div>
      <p class="lead fs-3">
        ${product.desc}
      </p>

`