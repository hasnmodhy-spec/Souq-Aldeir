const products = [
  { name: "غلاية كهربائية", price: 120 },
  { name: "خلاط كهربائي", price: 210 },
  { name: "طقم أواني", price: 320 }
];

const container = document.getElementById("products");

products.forEach(p => {
  const div = document.createElement("div");
  div.className = "product";
  div.innerHTML = `
    <h3>${p.name}</h3>
    <p>${p.price} ر.س</p>
    <button>إضافة للسلة</button>
  `;
  container.appendChild(div);
});