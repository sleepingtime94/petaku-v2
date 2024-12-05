var map = L.map("maps", {
  fullscreenControl: true,
}).setView([-2.903405942730085, 115.12710571289064], 10);

var osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  minZoom: 10,
  maxZoom: 20,
  ext: "png",
}).addTo(map);

function styleFeature(feature) {
  return {
    color: WarnaKecamatan(feature.properties.KECAMATAN),
    weight: 1,
  };
}

function WarnaKecamatan(d) {
  switch (d) {
    case "Binuang":
      return "#d81159";
      break;
    case "Hatungun":
      return "#52b788";
      break;
    case "Lokpaikat":
      return "#0496ff";
      break;
    case "Bakarangan":
      return "#c16e70";
      break;
    case "Tapin Utara":
      return "#ff595e";
      break;
    case "Tapin Tengah":
      return "#679436";
      break;
    case "Tapin Selatan":
      return "#ffd000";
      break;
    case "Piani":
      return "#b892ff";
      break;
    case "Candi Laras Utara":
      return "#ff8c00";
      break;
    case "Candi Laras Selatan":
      return "#6b9ac4";
      break;
    case "Bungur":
      return "#7f055f";
      break;
    default:
      return "#ffffff";
      break;
  }
}

L.geoJSON(wilayah, {
  style: styleFeature,
  onEachFeature: function (feature, layer) {
    map.on("zoomend", function () {
      const zoomLevel = map.getZoom();
      if (zoomLevel > 10) {
        layer.bindTooltip(feature.properties.DESA, {
          permanent: true,
          direction: "center",
          className: "map-label",
        });
      } else {
        layer.closeTooltip();
      }
    });

    layer.on({
      click: function (e) {
        const desaValue = feature.properties.DESA;

        layer
          .bindPopup(
            `<table class="table table-borderless small text-default text-uppercase"><tr><td>KEL/DESA</td><td>:</td><td class="fw-bold">${desaValue}</td></tr><tr><td>KECAMATAN</td><td>:</td><td class="fw-bold">${feature.properties.KECAMATAN}</td></tr><tr><td>JUMLAH PENDUDUK</td><td>:</td><td class="jumlah-penduduk-total" class="fw-bold"></td></tr></table>`
          )
          .openPopup();

        map.flyTo([e.latlng.lat, e.latlng.lng], 12);
        getJumlahPenduduk(desaValue.toUpperCase());
      },
    });
  },
}).addTo(map);

function getJumlahPenduduk(location) {
  $.ajax({
    type: "POST",
    url: "/maps",
    data: {
      location: location,
    },
    success: function (data) {
      if (JSON.parse(data).length > 0) {
        $(".jumlah-penduduk-total").text(`${JSON.parse(data)[0].JUMLAH} Jiwa`);
      } else {
        $(".jumlah-penduduk-total").text(`-`);
      }
    },
    error: function (err) {
      console.log(err);
    },
  });
}
