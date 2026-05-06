const sheetURL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRodu8R_89jPN6--bbIpq5RGTax7DaRoP9nK5aAgqryGKJDfEYggK2iM1No6z36cK-yTV5pwxeOTCzl/pub?output=csv";

fetch(sheetURL)
  .then((response) => response.text())
  .then((data) => {
    const rows = data.split("\n").slice(1); 

    const container = document.getElementById("umrahproducts");
    const container2 = document.getElementById("hajjproducts");

    rows.forEach((row) => {
      const cols = row.split(",");
      // console.log(cols)

      const category = cols[1];
      const subtitle = cols[2];
      const moq = cols[3];
      const name = cols[4];
      const rawImage = cols[5];
      const image = convertDriveLink(rawImage);

      const rating = cols[6];
      const sellprice = cols[7];
      const oldprice = cols[8];
      const badge = cols[9];
      const product = `
        <div class="col-6 col-md-4 col-lg-4 ">
          <div class="product-card">
            <div class="product-img-wrap">
              <span class="product-badge bg-black">${badge}</span>
              <div class="product-img-box">
                <img src="${image}" loading="lazy" class="product-img" alt="${name}">
              </div>
            </div>
            <div class="product-body">
              <span class="product-category">${subtitle}</span>
              <h3 class="product-name">${name}</h3>
              <div class="product-rating">
                <span class="stars">★★★★★</span>
                <span class="rating-count">(${rating})</span>
              </div>
              <div class="product-footer">
                <div class="product-price">
                  <span class="price-current">PKR ${sellprice}</span>
                  <span class="price-old">PKR ${oldprice}</span>
                </div>
                <a class="add-cart-btn fs-6 text-decoration-none"
                  href="https://wa.me/+923308254700?text=Hello%20I%20want%20to%20order%20this%20product%0A%0AProduct%20Name:${subtitle}%20${name}%20%0AMOQ:%2050%20Packages%0APrice:%20PKR%20${sellprice}%20%0A%0AKindly%20share%20details."
                  target="_blank">
                  <i class="fa-brands fa-whatsapp fs-4"></i>
                  <span class="d-none d-md-inline">Order</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      `;

      if (category == "umrah") {
        container.innerHTML += product;
      } else if (category == "hajj") {
        container2.innerHTML += product;
      }
    });
  });

function convertDriveLink(url) {
  if (!url) return "";

  url = url.trim().replace(/"/g, "");

  // extract file ID
  const fileId = url.split("/d/")[1]?.split("/")[0];

  // return CDN link
  return `https://lh3.googleusercontent.com/d/${fileId}`;
}
