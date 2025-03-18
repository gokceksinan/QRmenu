import { buttonsData, menu } from "./db.js";
import { calculatePrice, elements } from "./helpers.js";

//*butonların bulunduğu alana tıklanıldığında searchCategory fonksiyonunu çalıştır.
elements.buttonsArea.addEventListener("click", searchCategory);

//! Olay İzleyicileri
//*sayfa yüklendiği anda renderMenuItems fonksiyonunu çalıştır ve menu parametresini gönder, renderButtons fonksiyonunu 
//* çalıştır ve seçili olarak hepsi kategorisini parametre olarak gönder.
document.addEventListener("DOMContentLoaded", renderMenuItems(menu));
document.addEventListener("DOMContentLoaded", renderButtons("all"))

function searchCategory(e) {
  //*Tıkladığımız butonun data özelliklerine eriştik ve bir değişkene aktardık.
  const category = e.target.dataset.category;
  //*Tüm dizi elemanlarından yalnızca kategori değeri butonun kategori değeri ile eşleşirse bu ürünleri getir.
  const filtredMenu = menu.filter((item) => item.category === category);

  if (category === "all") {
    renderMenuItems(menu);
  } else {
    renderMenuItems(filtredMenu);
  }

  renderButtons(category);
}
//*Ekrana menü elemanlarını aktaracak fonksiyondur.
function renderMenuItems(menuItems) {
  //*Gönderilen verileri dönüp her bir veri için bir a etiketi oluştur.
  let menuHTML = menuItems.map(
    (item) =>
      `
      <a
        id="card"
        href="/productDetail.html?id=${item.id}&category=${item.category}&price=${item.price.toString}"
        class="text-decoration-none text-black d-flex flex-column flex-md-row gap-2"
      >
        <img class="rounded shadow" src="${item.img}" alt="" />
        <div>
          <div class="d-flex justify-content-between align-items-center">
            <h5>${item.title}</h5>
            <p class="text-success">${calculatePrice(item.price)} ₺</p>
          </div>
          <p class="lead">
            ${item.desc}
          </p> 
        </div>
      </a>
        `
  );
  menuHTML = menuHTML.join("");
  //* Oluşturduğuumuz menuHTML değişkenini ekrana aktardık.
  elements.menuArea.innerHTML = menuHTML;
}

function renderButtons(active) {
  elements.buttonsArea.innerHTML = "";
  //* Yeni butonlar oluşturabilmek için buttonsData içerisindeki verileri dönüp her bir veri için butonu oluştururuz.
  buttonsData.forEach((btn) => {
    //* Her bir veri için bir HTML buton etiketi oluşturur.
    const buttonEle = document.createElement("button");
    //* Oluşturduğumuz butonlara class ekledik.
    buttonEle.className = "btn btn-outline-dark filter-btn";
    //* Oluşturduğumuz butonun içeriğini değiştirme.
    buttonEle.textContent = btn.text;
    //* Oluşturğumuz butonun hangi kategoride olduğu bilgisini buton elementine ekledik.
    buttonEle.dataset.category = btn.value;
    //* Eğer ki active kategorisiyle buton eşleşirse ona farklı class ekle.
    if(btn.value === active){
      buttonEle.classList.add("bg-dark","text-light");
    }

    //*HTML'e gönderme.
    elements.buttonsArea.appendChild(buttonEle);
  });
}
