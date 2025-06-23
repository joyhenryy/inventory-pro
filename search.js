// Sample data for search functionality
const sampleData = [
  {
    kode: "BRG001",
    nama: "Laptop Dell Inspiron",
    kategori: "Elektronik",
    kondisi: "Baik",
    lokasi: "Ruang IT",
  },
  {
    kode: "BRG002",
    nama: "Meja Kantor",
    kategori: "Furniture",
    kondisi: "Baik",
    lokasi: "Ruang Kerja A",
  },
  {
    kode: "BRG003",
    nama: "Printer Canon",
    kategori: "Elektronik",
    kondisi: "Rusak",
    lokasi: "Ruang Admin",
  },
  {
    kode: "BRG004",
    nama: "Kursi Ergonomis",
    kategori: "Furniture",
    kondisi: "Baik",
    lokasi: "Ruang Kerja B",
  },
  {
    kode: "BRG005",
    nama: "AC Split 1 PK",
    kategori: "Elektronik",
    kondisi: "Perlu Perbaikan",
    lokasi: "Ruang Meeting",
  },
  {
    kode: "BRG006",
    nama: "Whiteboard",
    kategori: "Alat Tulis",
    kondisi: "Baik",
    lokasi: "Ruang Meeting",
  },
  {
    kode: "BRG007",
    nama: "Proyektor Epson",
    kategori: "Elektronik",
    kondisi: "Baik",
    lokasi: "Ruang Presentasi",
  },
  {
    kode: "BRG008",
    nama: "Lemari Arsip",
    kategori: "Furniture",
    kondisi: "Baik",
    lokasi: "Ruang Arsip",
  },
];

// Search functionality
function performSearch(query, containerId) {
  if (!query || query.length < 2) {
    hideSearchResults(containerId);
    return;
  }

  const results = sampleData.filter(
    (item) =>
      item.kode.toLowerCase().includes(query.toLowerCase()) ||
      item.nama.toLowerCase().includes(query.toLowerCase()) ||
      item.kategori.toLowerCase().includes(query.toLowerCase()) ||
      item.lokasi.toLowerCase().includes(query.toLowerCase())
  );

  displaySearchResults(results, containerId);
}

function displaySearchResults(results, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (results.length === 0) {
    container.innerHTML =
      '<div class="search-result-item text-muted">Tidak ada hasil ditemukan</div>';
  } else {
    container.innerHTML = results
      .slice(0, 5)
      .map(
        (item) => `
            <div class="search-result-item" onclick="selectSearchResult('${item.kode}', '${item.nama}')">
                <strong>${item.kode}</strong> - ${item.nama}
                <br><small class="text-muted">${item.kategori} | ${item.lokasi}</small>
            </div>
        `
      )
      .join("");
  }

  container.style.display = "block";
}

function hideSearchResults(containerId) {
  const container = document.getElementById(containerId);
  if (container) {
    container.style.display = "none";
  }
}

function selectSearchResult(kode, nama) {
  // Redirect to data barang page with specific item highlighted
  window.location.href = `data-barang.html?search=${encodeURIComponent(kode)}`;
}

// Initialize search functionality when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Sidebar search
  const sidebarSearch = document.getElementById("sidebarSearch");
  if (sidebarSearch) {
    sidebarSearch.addEventListener("input", function () {
      performSearch(this.value, "sidebarSearchResults");
    });

    sidebarSearch.addEventListener("blur", () => {
      setTimeout(() => hideSearchResults("sidebarSearchResults"), 200);
    });
  }

  // Quick search on dashboard - only on button click or Enter key
  const quickSearch = document.getElementById("quickSearch");
  if (quickSearch) {
    // Enter key to perform search
    quickSearch.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        const query = this.value.trim();
        if (query) {
          window.location.href = `data-barang.html?search=${encodeURIComponent(
            query
          )}`;
        }
      }
    });
  }

  // Hide search results when clicking outside
  document.addEventListener("click", (event) => {
    const searchContainers = ["sidebarSearchResults"]; // Hapus "quickSearchResults"
    searchContainers.forEach((containerId) => {
      const container = document.getElementById(containerId);
      const input = container?.previousElementSibling?.previousElementSibling;

      if (
        container &&
        input &&
        !container.contains(event.target) &&
        !input.contains(event.target)
      ) {
        hideSearchResults(containerId);
      }
    });
  });
});
