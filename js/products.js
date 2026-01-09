fetch('data/products.json')
  .then(res => {
    console.log("JSON status:", res.status, res.url);
    return res.json();
  })
  .then(products => {
    console.log("Products loaded:", products);

    const container = document.getElementById('product-list');
    if (!container) {
      console.error("Không thấy #product-list trong shop.html");
      return;
    }

    container.innerHTML = "";

    products.forEach(p => {
      container.innerHTML += `
        <div class="product-card">
          <img src="${p.image}" alt="${p.name}">
          <h3>${p.name}</h3>
          <p>${Number(p.price).toLocaleString()} đ</p>
          <p>Còn lại: ${p.stock}</p>
          <button onclick="location.href='product.html?id=${p.id}'">Xem chi tiết</button>
        </div>
      `;
    });
  })
  .catch(err => console.error("Lỗi load products.json:", err));
