document.addEventListener("DOMContentLoaded", function () {
  const productList = document.getElementById("productList");
  const searchInput = document.getElementById("search");
  const sortSelect = document.getElementById("sort");

  let products = [];

  function fetchProducts() {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", "https://raw.githubusercontent.com/CynthiaEstherMetilda/Xhrdemo/main/products.json", true);
      xhr.onload = function () {
          if (xhr.status === 200) {
              products = JSON.parse(xhr.responseText);
              displayProducts();
          }
      };
      xhr.send();
  }

  function displayProducts() {
      const keyword = searchInput.value.toLowerCase();
      const filteredProducts = products.filter((product) =>
          product.name.toLowerCase().includes(keyword) || product.description.toLowerCase().includes(keyword)
      );

      const sortBy = sortSelect.value;
      if (sortBy === "nameA") {
          filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortBy === "nameD") {
          filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
      } else if (sortBy === "priceA") {
          filteredProducts.sort((a, b) => a.price - b.price);
      } else if (sortBy === "priceD") {
          filteredProducts.sort((a, b) => b.price - a.price);
      }

      const tableBody = document.querySelector("tbody");

      // Clear the existing table rows
      while (tableBody.firstChild) {
          tableBody.removeChild(tableBody.firstChild);
      }

      filteredProducts.forEach(function (product) {
          const row = document.createElement("tr");

          const nameCell = document.createElement("td");
          nameCell.textContent = product.name;

          const priceCell = document.createElement("td");
          priceCell.textContent = `$ ${product.price.toFixed(2)}`;

          const descCell = document.createElement("td");
          descCell.textContent = product.description;

          row.appendChild(nameCell);
          row.appendChild(priceCell);
          row.appendChild(descCell);

          tableBody.appendChild(row);
      });
  }

  searchInput.addEventListener("input", displayProducts);
  sortSelect.addEventListener("change", displayProducts);

  fetchProducts();
});
