$("#list-category a").click(function () {
  const category = $(this).attr("id");
  const area = $("#list-area .active").attr("data-pid");
  getAgregat(category, area);
  $("#list-category a").removeClass("active");
  $(this).addClass("active");
});

let areaList = [
  {
    kode: "6305",
    wilayah: "TAPIN",
  },
  {
    kode: "630501",
    wilayah: "BINUANG",
  },
  {
    kode: "6305011001",
    wilayah: "BINUANG",
  },
  {
    kode: "6305011017",
    wilayah: "KARANGAN PUTIH",
  },
  {
    kode: "6305011018",
    wilayah: "RAYA BELANTI",
  },
  {
    kode: "6305012003",
    wilayah: "TUNGKAP",
  },
  {
    kode: "6305012006",
    wilayah: "A YANI PURA",
  },
  {
    kode: "6305012007",
    wilayah: "PULAU PINANG",
  },
  {
    kode: "6305012008",
    wilayah: "PUALAM SARI",
  },
  {
    kode: "6305012009",
    wilayah: "GUNUNG BATU",
  },
  {
    kode: "6305012012",
    wilayah: "PULAU PINANG UTARA",
  },
  {
    kode: "6305012016",
    wilayah: "PADANG SARI",
  },
  {
    kode: "6305012019",
    wilayah: "MEKAR SARI",
  },
  {
    kode: "630502",
    wilayah: "TAPIN SELATAN",
  },
  {
    kode: "6305021004",
    wilayah: "TAMBARANGAN",
  },
  {
    kode: "6305022001",
    wilayah: "TATAKAN",
  },
  {
    kode: "6305022002",
    wilayah: "SUATO TATAKAN",
  },
  {
    kode: "6305022005",
    wilayah: "SAWANG",
  },
  {
    kode: "6305022006",
    wilayah: "LAWAHAN",
  },
  {
    kode: "6305022007",
    wilayah: "TIMBAAN",
  },
  {
    kode: "6305022009",
    wilayah: "RUMINTIN",
  },
  {
    kode: "6305022011",
    wilayah: "CEMPAKA",
  },
  {
    kode: "6305022012",
    wilayah: "HARAPAN MASA",
  },
  {
    kode: "6305022016",
    wilayah: "TANDUI",
  },
  {
    kode: "6305022017",
    wilayah: "HATIWIN",
  },
  {
    kode: "630503",
    wilayah: "TAPIN TENGAH",
  },
  {
    kode: "6305032001",
    wilayah: "PANDULANGAN",
  },
  {
    kode: "6305032002",
    wilayah: "LABUNG",
  },
  {
    kode: "6305032003",
    wilayah: "MANDURIAN",
  },
  {
    kode: "6305032004",
    wilayah: "SERAWI",
  },
  {
    kode: "6305032005",
    wilayah: "PEMATANG KARANGAN HULU",
  },
  {
    kode: "6305032006",
    wilayah: "PEMATANG KARANGAN",
  },
  {
    kode: "6305032007",
    wilayah: "PANDAHAN",
  },
  {
    kode: "6305032008",
    wilayah: "PEMATANG KARANGAN HILIR",
  },
  {
    kode: "6305032009",
    wilayah: "HIYUNG",
  },
  {
    kode: "6305032010",
    wilayah: "ANDHIKA",
  },
  {
    kode: "6305032011",
    wilayah: "SUKARAMAI",
  },
  {
    kode: "6305032012",
    wilayah: "TIRIK",
  },
  {
    kode: "6305032013",
    wilayah: "KEPAYANG",
  },
  {
    kode: "6305032014",
    wilayah: "BATANG LANTIK",
  },
  {
    kode: "6305032015",
    wilayah: "MANDURIAN HILIR",
  },
  {
    kode: "6305032016",
    wilayah: "SUNGAI BAHALANG",
  },
  {
    kode: "6305032017",
    wilayah: "PAPAGAN MAKMUR",
  },
  {
    kode: "630504",
    wilayah: "TAPIN UTARA",
  },
  {
    kode: "6305041001",
    wilayah: "RANGDA MALINGKUNG",
  },
  {
    kode: "6305041002",
    wilayah: "KUPANG",
  },
  {
    kode: "6305041003",
    wilayah: "RANTAU KANAN",
  },
  {
    kode: "6305041004",
    wilayah: "RANTAU KIWA",
  },
  {
    kode: "6305042005",
    wilayah: "KERAMAT",
  },
  {
    kode: "6305042006",
    wilayah: "ANTASARI",
  },
  {
    kode: "6305042007",
    wilayah: "JINGAH BABARIS",
  },
  {
    kode: "6305042008",
    wilayah: "BANUA HANYAR",
  },
  {
    kode: "6305042009",
    wilayah: "BANUA HALAT KIRI",
  },
  {
    kode: "6305042010",
    wilayah: "BANUA HALAT KANAN",
  },
  {
    kode: "6305042011",
    wilayah: "PERINTIS RAYA",
  },
  {
    kode: "6305042012",
    wilayah: "KAKARAN",
  },
  {
    kode: "6305042013",
    wilayah: "ANTASARI HILIR",
  },
  {
    kode: "6305042014",
    wilayah: "LUMBU RAYA",
  },
  {
    kode: "6305042015",
    wilayah: "BANUA HANYAR HULU",
  },
  {
    kode: "6305042016",
    wilayah: "BADAUN",
  },
  {
    kode: "630505",
    wilayah: "CANDI LARAS SELATAN",
  },
  {
    kode: "6305052001",
    wilayah: "MARGASARI HULU",
  },
  {
    kode: "6305052002",
    wilayah: "CANDI LARAS",
  },
  {
    kode: "6305052003",
    wilayah: "BARINGIN A",
  },
  {
    kode: "6305052004",
    wilayah: "MARAMPIAU",
  },
  {
    kode: "6305052005",
    wilayah: "PABAUNGAN HILIR",
  },
  {
    kode: "6305052006",
    wilayah: "PABAUNGAN HULU",
  },
  {
    kode: "6305052007",
    wilayah: "SUNGAI RUTAS",
  },
  {
    kode: "6305052008",
    wilayah: "BARINGIN B",
  },
  {
    kode: "6305052009",
    wilayah: "MARAMPIAU HILIR",
  },
  {
    kode: "6305052010",
    wilayah: "SUNGAI RUTAS HULU",
  },
  {
    kode: "6305052011",
    wilayah: "BAULIN",
  },
  {
    kode: "6305052012",
    wilayah: "PABAUNGAN PANTAI",
  },
  {
    kode: "630506",
    wilayah: "CANDI LARAS UTARA",
  },
  {
    kode: "6305062001",
    wilayah: "KELADAN",
  },
  {
    kode: "6305062002",
    wilayah: "SUNGAI SALAI",
  },
  {
    kode: "6305062003",
    wilayah: "PARIOK",
  },
  {
    kode: "6305062004",
    wilayah: "MARGASARI HILIR",
  },
  {
    kode: "6305062005",
    wilayah: "BATALAS",
  },
  {
    kode: "6305062006",
    wilayah: "RAWANA",
  },
  {
    kode: "6305062007",
    wilayah: "BUAS-BUAS",
  },
  {
    kode: "6305062008",
    wilayah: "TELUK HAUR",
  },
  {
    kode: "6305062009",
    wilayah: "SUNGAI PUTING",
  },
  {
    kode: "6305062010",
    wilayah: "SAWAJA",
  },
  {
    kode: "6305062011",
    wilayah: "SUNGAI SALAI HILIR",
  },
  {
    kode: "6305062012",
    wilayah: "BUAS-BUAS HILIR",
  },
  {
    kode: "6305062013",
    wilayah: "RAWANA HULU",
  },
  {
    kode: "630507",
    wilayah: "BAKARANGAN",
  },
  {
    kode: "6305072001",
    wilayah: "PARIGI KECIL",
  },
  {
    kode: "6305072002",
    wilayah: "BAKARANGAN",
  },
  {
    kode: "6305072003",
    wilayah: "PARIGI",
  },
  {
    kode: "6305072004",
    wilayah: "PAUL",
  },
  {
    kode: "6305072005",
    wilayah: "GADUNG",
  },
  {
    kode: "6305072006",
    wilayah: "BUNDUNG",
  },
  {
    kode: "6305072007",
    wilayah: "TANGKAWANG",
  },
  {
    kode: "6305072008",
    wilayah: "WARINGIN",
  },
  {
    kode: "6305072009",
    wilayah: "GADUNG KERAMAT",
  },
  {
    kode: "6305072010",
    wilayah: "MASTA",
  },
  {
    kode: "6305072011",
    wilayah: "KETAPANG",
  },
  {
    kode: "6305072012",
    wilayah: "TANGKAWANG BARU",
  },
  {
    kode: "630508",
    wilayah: "PIANI",
  },
  {
    kode: "6305082001",
    wilayah: "PIPITAK JAYA",
  },
  {
    kode: "6305082002",
    wilayah: "MIAWA",
  },
  {
    kode: "6305082003",
    wilayah: "BATU AMPAR",
  },
  {
    kode: "6305082004",
    wilayah: "HARAKIT",
  },
  {
    kode: "6305082005",
    wilayah: "BATUNG",
  },
  {
    kode: "6305082006",
    wilayah: "BALAWAIAN",
  },
  {
    kode: "6305082007",
    wilayah: "BARAMBAN",
  },
  {
    kode: "6305082008",
    wilayah: "BUNIIN JAYA",
  },
  {
    kode: "630509",
    wilayah: "BUNGUR",
  },
  {
    kode: "6305092001",
    wilayah: "KALUMPANG",
  },
  {
    kode: "6305092002",
    wilayah: "BANUA PADANG",
  },
  {
    kode: "6305092003",
    wilayah: "BUNGUR",
  },
  {
    kode: "6305092004",
    wilayah: "BANUA PADANG HILIR",
  },
  {
    kode: "6305092005",
    wilayah: "SHABAH",
  },
  {
    kode: "6305092006",
    wilayah: "HANGUI",
  },
  {
    kode: "6305092007",
    wilayah: "RANTAU BUJUR",
  },
  {
    kode: "6305092008",
    wilayah: "PURUT",
  },
  {
    kode: "6305092009",
    wilayah: "BUNGUR BARU",
  },
  {
    kode: "6305092010",
    wilayah: "TIMBUNG",
  },
  {
    kode: "6305092011",
    wilayah: "PARING GULING",
  },
  {
    kode: "6305092012",
    wilayah: "LINUH",
  },
  {
    kode: "630510",
    wilayah: "LOKPAIKAT",
  },
  {
    kode: "6305101007",
    wilayah: "BITAHAN",
  },
  {
    kode: "6305102001",
    wilayah: "BINDERANG",
  },
  {
    kode: "6305102002",
    wilayah: "PARANDAKAN",
  },
  {
    kode: "6305102003",
    wilayah: "LOKPAIKAT",
  },
  {
    kode: "6305102004",
    wilayah: "BATARATAT",
  },
  {
    kode: "6305102005",
    wilayah: "BITAHAN BARU",
  },
  {
    kode: "6305102006",
    wilayah: "PUNCAK HARAPAN",
  },
  {
    kode: "6305102008",
    wilayah: "BUDI MULYA",
  },
  {
    kode: "6305102009",
    wilayah: "AYUNAN PAPAN",
  },
  {
    kode: "630511",
    wilayah: "SALAM BABARIS",
  },
  {
    kode: "6305112001",
    wilayah: "SALAM BABARIS",
  },
  {
    kode: "6305112002",
    wilayah: "SUATO LAMA",
  },
  {
    kode: "6305112003",
    wilayah: "KAMBANG HABANG LAMA",
  },
  {
    kode: "6305112004",
    wilayah: "PANTAI CABE",
  },
  {
    kode: "6305112005",
    wilayah: "SUATO BARU",
  },
  {
    kode: "6305112006",
    wilayah: "KAMBANG HABANG BARU",
  },
  {
    kode: "630512",
    wilayah: "HATUNGUN",
  },
  {
    kode: "6305122001",
    wilayah: "TARUNGIN",
  },
  {
    kode: "6305122002",
    wilayah: "MATANG BATAS",
  },
  {
    kode: "6305122003",
    wilayah: "HATUNGUN",
  },
  {
    kode: "6305122004",
    wilayah: "BURAKAI",
  },
  {
    kode: "6305122005",
    wilayah: "BATU HAPU",
  },
  {
    kode: "6305122006",
    wilayah: "KAMBANG KUNING",
  },
  {
    kode: "6305122007",
    wilayah: "ASAM RANDAH",
  },
  {
    kode: "6305122008",
    wilayah: "BAGAK",
  },
];

getArea(areaList);
getAgregat("jumlah-penduduk", 6305);

function getArea(data) {
  const kodePilihan = $("#list-area").data("area");
  const listKec = areaList.filter((item) => item.kode.length == 6);
  const listByKec = areaList.filter((item) =>
    item.kode.startsWith(kodePilihan)
  );

  var dataArea;

  if (listByKec.length > 0) {
    dataArea = listByKec;
  } else if (kodePilihan == 0) {
    dataArea = listKec;
  } else {
    dataArea = data;
  }

  $.each(dataArea, function (i, item) {
    const areaCode = item.kode;
    const areaName = item.wilayah;
    let area;

    if (areaCode.length == 4) {
      area = `<span>KABUPATEN</span> ${areaName}`;
    } else if (areaCode.length == 6) {
      area = `<span>KECAMATAN</span> ${areaName}`;
    } else {
      area = areaName;
    }

    if (areaName == "TAPIN") {
      $("#list-area").append(
        `<a class="list-group-item list-group-item-action active" data-bs-toggle="list" href="#" data-pid="${areaCode}">${area}</a>`
      );
    } else {
      $("#list-area").append(
        `<a class="list-group-item list-group-item-action" data-bs-toggle="list" href="#" data-pid="${areaCode}">${area}</a>`
      );
    }
  });

  $("#list-area a").click(function () {
    const category = $("#list-category .active").attr("id");
    const area = $(this).attr("data-pid");
    getAgregat(category, area);
  });
}

function getAgregat(category, pid) {
  var cats = category.replace("-", "_");
  var req = `${cats}_by_id`;
  var catName = $("#list-category .active").text()
    ? $("#list-category .active").text()
    : "JUMLAH PENDUDUK";
  var areaName = $("#list-area .active").text()
    ? $("#list-area .active").text()
    : "KABUPATEN TAPIN";

  $.ajax({
    url: "/agregat",
    method: "POST",
    data: {
      req,
      pid,
    },
    beforeSend: function () {
      $("#progressBar").attr("aria-valuenow", 0);
      $("#progressBar").css("width", "0%");

      $("#list-data-category").text(catName);
      $("#list-data-area").text(areaName);
      $("#list-data-agregat").empty();
      $(".data-agregat").hide();
    },
    xhr: function () {
      var xhr = new window.XMLHttpRequest();
      xhr.upload.addEventListener("progress", function (evt) {
        if (evt.lengthComputable) {
          var percentComplete = (evt.loaded / evt.total) * 100;
          $("#progressBar").attr("aria-valuenow", percentComplete);
          $("#progressBar").css("width", percentComplete + "%");
        }
      });
      return xhr;
    },
    success: function (data) {
      $(".data-agregat").show();

      const datas = JSON.parse(data)[0];

      $.each(datas, function (key, item) {
        formatResult(key, item, category);
      });
    },
    error: function (err) {
      console.log(err);
    },
  });
}

function formatNumber(number) {
  const parts = number.toString().split(".");
  const integerPart = parts[0];
  const decimalPart = parts[1] || "";
  const formattedNumber =
    integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + decimalPart;
  return formattedNumber;
}

function formatColumn(str, category) {
  var str;

  switch (category) {
    case "jumlah-penduduk":
      str = str.replace("LK", "LAKI-LAKI").replace("PR", "PEREMPUAN");
      break;
    case "kepala-keluarga":
      str = str.replace("LK", "LAKI-LAKI").replace("PR", "PEREMPUAN");
      break;
    case "ktp":
      str = str
        .replace("KTP_LK", "MEMILIKI (LAKI-LAKI)")
        .replace("KTP_PR", "MEMILIKI (PEREMPUAN)")
        .replace("KTP_BLM_REKAM_LK", "BELUM MEMILIKI (LAKI-LAKI)")
        .replace("KTP_BLM_REKAM_PR", "BELUM MEMILIKI (PEREMPUAN)")
        .replace("KTP_BLM_REKAM", "TOTAL BELUM MEMILIKI")
        .replace("KTP", "TOTAL MEMILIKI");
      break;
    case "kia":
      str = str
        .replace("BLM_MMLK_DINAMIS_LK", "BELUM MEMILIKI (LAKI-LAKI)")
        .replace("BLM_MMLK_DINAMIS_PR", "BELUM MEMILIKI (PEREMPUAN)")
        .replace("MMLK_DINAMIS_LK", "MEMILIKI (LAKI-LAKI)")
        .replace("MMLK_DINAMIS_PR", "MEMILIKI (PEREMPUAN)")
        .replace("BLM_MMLK_DINAMIS", "TOTAL BELUM MEMILIKI")
        .replace("MMLK_DINAMIS", "TOTAL MEMILIKI");
      break;
    case "akta-kelahiran":
      str = str
        .replace("BLM_MMLK_DINAMIS_LK", "BELUM MEMILIKI (LAKI-LAKI)")
        .replace("BLM_MMLK_DINAMIS_PR", "BELUM MEMILIKI (PEREMPUAN)")
        .replace("MMLK_DINAMIS_LK", "MEMILIKI (LAKI-LAKI)")
        .replace("MMLK_DINAMIS_PR", "MEMILIKI (PEREMPUAN)")
        .replace("BLM_MMLK_DINAMIS_JUMLAH", "TOTAL BELUM MEMILIKI")
        .replace("MMLK_DINAMIS_JUMLAH", "TOTAL MEMILIKI");
      break;
    case "pendidikan":
      str = str
        .replace("_LK", " (LAKI-LAKI)")
        .replace("_PR", " (PEREMPUAN)")
        .replace(/_/g, " ");
      break;
    case "pekerjaan":
      str = str
        .replace("_LK", " (LAKI-LAKI)")
        .replace("_PR", " (PEREMPUAN)")
        .replace(/_/g, " ");
      break;
    case "golongan-darah":
      str = str
        .replace("_LK", " (LAKI-LAKI)")
        .replace("_PR", " (PEREMPUAN)")
        .replace(/_/g, " ");
      break;
    case "status-kawin":
      str = str
        .replace("_LK", " (LAKI-LAKI)")
        .replace("_PR", " (PEREMPUAN)")
        .replace(/_/g, " ");
      break;
    case "shbkel":
      str = str
        .replace("_LK", " (LAKI-LAKI)")
        .replace("_PR", " (PEREMPUAN)")
        .replace(/_/g, " ");
      break;
    case "agama":
      str = str
        .replace("_LK", " (LAKI-LAKI)")
        .replace("_PR", " (PEREMPUAN)")
        .replace(/_/g, " ");
      break;
    case "kelompok-umur":
      str = str
        .replace("_LK", " TAHUN (LAKI-LAKI)")
        .replace("_PR", " TAHUN (PEREMPUAN)")
        .replace(/_/g, "-")
        .replace("-75", "75+");
      break;
    case "disabilitas":
      str = str
        .replace("_LK", " (LAKI-LAKI)")
        .replace("_PR", " (PEREMPUAN)")
        .replace(/_/g, " ");
      break;
    default:
      break;
  }

  return str;
}

function formatResult(key, item, category) {
  if (
    key !== "KODE" &&
    key !== "WILAYAH" &&
    key !== "JML_PDDK_LK" &&
    key !== "JML_PDDK_PR" &&
    key !== "JML_PDDK" &&
    key !== "KTP_REKAM_LK" &&
    key !== "KTP_REKAM_PR" &&
    key !== "KTP_REKAM" &&
    key !== "CETAK_LK" &&
    key !== "CETAK_PR" &&
    key !== "CETAK" &&
    key !== "JML_DINAMIS_LK" &&
    key !== "JML_DINAMIS_PR" &&
    key !== "JML_DINAMIS" &&
    key !== "PERSEN_DINAMIS" &&
    key !== "DINAMIS_LK" &&
    key !== "DINAMIS_PR" &&
    key !== "DINAMIS_JUMLAH" &&
    key !== "PERSEN_JUMLAH"
  ) {
    $("#list-data-agregat").append(
      `<li class="list-group-item d-flex justify-content-between align-items-center border border-bottom">
      ${formatColumn(key, category)}
      <span class="badge text-default fs-3 font-monospace">
      ${formatNumber(item)}
      </span></li>`
    );
  }
}

$("#search-area").on("input", function () {
  var query = $(this).val().toLowerCase();
  var output = "";

  if (query.length > 4) {
    var filteredData = areaList.filter(function (item) {
      return item.wilayah.toLowerCase().includes(query);
    });

    if (filteredData.length > 0) {
      filteredData.forEach(function (item) {
        const areaCode = item.kode;
        const areaName = item.wilayah;
        let area;

        if (areaCode.length == 4) {
          area = `KABUPATEN ${areaName}`;
        } else if (areaCode.length == 6) {
          area = `KECAMATAN ${areaName}`;
        } else {
          area = areaName;
        }

        output += `<li><a class="dropdown-item" href="#" data-pid="${areaCode}">${area}</a></li>`;
      });
    } else {
      output = `<li><a class="dropdown-item" href="#">Tidak Ada Hasil</a></li>`;
    }

    $("#search-area-result").html(output).show();

    $("#search-area-result a").click(function () {
      const area = $(this).text();
      const areaCode = $(this).attr("data-pid");

      $("#list-area")
        .empty()
        .append(
          `<a class="list-group-item list-group-item-action active" data-bs-toggle="list" href="#" data-pid="${areaCode}">${area}</a>`
        );
      $("#search-area-result").hide();

      const category = $("#list-category .active").attr("id");
      getAgregat(category, areaCode);
    });
  } else {
    if (query.length == 0) {
      $("#list-area").empty();
      getArea(areaList);
    } else {
      $("#search-area-result").hide();
    }
  }
});

$("#download-data").click(function () {
  const category = $("#list-category .active").attr("id");
  const data = category.replace("-", "_");
  const code = $("#list-area .active").attr("data-pid");
  const area = $("#list-area .active").text();

  $.ajax({
    url: "/export",
    method: "POST",
    data: { data, code, area },
    success: function (response, status, xhr) {
      var blob = new Blob([response], {
        type: xhr.getResponseHeader("Content-Type"),
      });
      var url = URL.createObjectURL(blob);

      // var a = document.createElement("a");
      // a.href = url;
      // a.download = "exported_file.pdf";
      // document.body.appendChild(a);
      // a.click();
      // document.body.removeChild(a);

      window.open(url, "_blank");
    },
    error: function (xhr, status, error) {
      console.error("Terjadi kesalahan:", error);
    },
    xhrFields: {
      responseType: "arraybuffer",
    },
  });
});
