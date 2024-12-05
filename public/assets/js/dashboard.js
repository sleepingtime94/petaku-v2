$("#permintaan-data #file-upload").change(function () {
  uploadFile($(this)[0], "#permintaan-data");
});

$("#permintaan-hak-akses #file-upload").change(function () {
  uploadFile($(this)[0], "#permintaan-hak-akses");
});

$("#download-template").click(function () {
  alert("UNDUH TEMPLATE SURAT");
});

function makeRequest(formData) {
  $.ajax({
    type: "POST",
    url: "/product",
    data: formData,
    processData: false,
    contentType: false,
    success: function (data) {
      if (data.status === "success") {
        Swal.fire({
          title: "Berhasil!",
          text: data.message,
          icon: "success",
          showConfirmButton: false,
          timer: 3000,
        }).then(() => {
          location.reload();
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal!",
          text: data.message,
          showConfirmButton: true,
        });
      }
    },
  });
}

function uploadFile(fileInput, classs) {
  if (fileInput.files.length === 0) {
    Swal.fire({
      icon: "warning",
      title: "File tidak boleh kosong!",
      text: "Pastikan dokumen dalam format pdf.",
      showConfirmButton: true,
    });
    return;
  }
  var formData = new FormData();
  formData.append("file", fileInput.files[0]);

  $.ajax({
    type: "POST",
    url: "/upload",
    data: formData,
    processData: false,
    contentType: false,
    beforeSend: function () {
      $(`${classs} #progressBar`).attr("aria-valuenow", 0);
      $(`${classs} #progressBar`).css("width", "0%");
    },
    xhr: function () {
      var xhr = new window.XMLHttpRequest();
      xhr.upload.addEventListener("progress", function (evt) {
        if (evt.lengthComputable) {
          var percentComplete = (evt.loaded / evt.total) * 100;
          $(`${classs} #progressBar`).attr("aria-valuenow", percentComplete);
          $(`${classs} #progressBar`).css("width", percentComplete + "%");
          $(`${classs} #progressBar`).text(percentComplete.toFixed(0) + "%");
        }
      });
      return xhr;
    },
    success: function (response) {
      $(`${classs} #send-request`).prop("disabled", false);

      const res = JSON.parse(response);
      const tempFile = res.path_name;

      if (res.status === "success") {
        $(`${classs} #temp-file`).val(tempFile);

        Swal.fire({
          toast: true,
          title: res.message,
          icon: "success",
          showConfirmButton: false,
          timer: 3000,
          position: "bottom",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal!",
          text: res.message,
          showConfirmButton: true,
        });
      }
    },
    error: function (xhr, status, error) {
      console.error(error);
    },
  });
}

$("#daftar-akun-pengguna-list tr").click(function () {
  const id = $(this).attr("data-id");
  const status = $(this).attr("data-status");
  const level = $(this).attr("data-level");
  const username = $(this).attr("data-username");
  const gov = $(this).attr("data-gov");
  const doc = $(this).attr("data-doc");

  let statusSelectOption = `
  <option value="1" ${status == 1 ? "selected" : ""}>Aktif</option>
  <option value="0" ${status == 0 ? "selected" : ""}>Tidak Aktif</option>
  `;

  let levelSelectOption = `
  <option value="0" ${level == 0 ? "selected" : ""}>Umum</option>
  <option value="2" ${level == 2 ? "selected" : ""}>Dinas</option>
  <option value="3" ${level == 3 ? "selected" : ""}>Kecamatan</option>
  `;

  Swal.fire({
    title: "Akun Pengguna",
    html: `<div class="text-start mb-4"><div class="mb-2"><span class="d-block small">Nama Pengguna:</span><span class="d-block fw-bold">${username}</span></div><div><span class="d-block small">Instansi:</span><span class="d-block fw-bold">${gov}</span></div></div><input type="hidden" id="username" value="${username}"><select id="status" class="form-select form-select-lg mb-3">${statusSelectOption}</select><select id="level" class="form-select form-select-lg">${levelSelectOption}</select>`,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Ubah",
    cancelButtonText: "Batal",
    showDenyButton: true,
    denyButtonText: "Hapus",
    showCloseButton: true,
    preConfirm: async () => {
      const username = document.getElementById("username").value;
      const status = document.getElementById("status").value;
      const level = document.getElementById("level").value;

      return { username, status, level };
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        type: "POST",
        url: "/user/update",
        data: {
          username: result.value.username,
          status: result.value.status,
          level: result.value.level,
        },
        success: function (result) {
          const data = JSON.parse(result);

          if (data.status == "success") {
            Swal.fire({
              title: "Berhasil!",
              text: data.message,
              icon: "success",
              showConfirmButton: false,
              timer: 3000,
            }).then(() => {
              location.reload();
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Gagal!",
              text: "Terjadi kesalahan!",
              showConfirmButton: true,
            });
          }
        },
      });
    } else if (result.isDenied) {
      Swal.fire({
        title: "Hapus Akun?",
        text: "Menghapus akun secara permanen tidak dapat dikembalikan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Hapus!",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          $.ajax({
            url: `/user/${id}`,
            method: "DELETE",
            success: function (result) {
              const data = JSON.parse(result);

              if (data.status === "success") {
                Swal.fire({
                  icon: "success",
                  title: "Berhasil!",
                  text: data.message,
                }).then(() => {
                  location.reload();
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Gagal!",
                  text: data.message,
                });
              }
            },
          });
        }
      });
    }
  });

  const viewButton = document.createElement("button");
  viewButton.innerText = "Dokumen";
  viewButton.classList.add("swal2-confirm", "swal2-styled");
  viewButton.style.backgroundColor = "#4CAF50";
  viewButton.style.color = "white";
  viewButton.onclick = () => {
    window.open("/files/" + doc, "_blank");
  };
  document.querySelector(".swal2-actions").appendChild(viewButton);
});

$("#daftar-permohonan-list tr").click(function () {
  const pid = $(this).attr("data-pid");
  location.replace(`/detail/${pid}`);
});

$("#form-permintaan-data").on("submit", function (e) {
  e.preventDefault();
  let formData = new FormData(this);
  formData.append("category", 0);

  $.ajax({
    url: "/product",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      const data = JSON.parse(response);

      if (data.status === "success") {
        Swal.fire({
          title: "Berhasil!",
          text: data.message,
          icon: "success",
          showConfirmButton: false,
          timer: 3000,
        }).then(() => {
          location.reload();
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal!",
          text: data.message,
          showConfirmButton: true,
        });
      }
    },
  });
});

$("#form-hak-akses").on("submit", function (e) {
  e.preventDefault();
  let formData = new FormData(this);
  formData.append("category", 1);

  $.ajax({
    url: "/product",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      const data = JSON.parse(response);

      if (data.status === "success") {
        Swal.fire({
          title: "Berhasil!",
          text: data.message,
          icon: "success",
          showConfirmButton: false,
          timer: 3000,
        }).then(() => {
          location.reload();
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal!",
          text: data.message,
          showConfirmButton: true,
        });
      }
    },
  });
});

$("#add-user").click(function () {
  Swal.fire({
    title: "Tambahkan Pengguna",
    html: `<div class=row id=form-add-user><div class=col-md-6>${createInputField(
      "username",
      "Nama Pengguna",
      "text"
    )} ${createInputField(
      "password",
      "Kata Sandi",
      "password"
    )} ${createInputField("email", "Email", "email")} ${createInputField(
      "phone",
      "Nomor Telepon",
      "text"
    )}</div><div class=col-md-6>${createInputField(
      "gov-name",
      "Nama Instansi",
      "text"
    )} ${createInputField(
      "gov-leader",
      "Nama Lengkap",
      "text"
    )} ${createInputField(
      "gov-position",
      "Jabatan",
      "text"
    )} ${createInputField(
      "gov-contact",
      "Kontak Person",
      "text"
    )}</div><div class=col-md-12><div class=mb-3><label for=file-upload class=form-label>Surat Tugas (format .pdf, maks. 2 MB)</label><div class="input-group mb-1"><input id=file-upload type=file accept=application/pdf class="form-control rounded-0"required><input id=document type=hidden name=document></div><div class=progress style=height:10px><div class="bg-primary progress-bar progress-bar-animated progress-bar-striped"id=progressBar aria-valuemax=100 aria-valuemin=0 aria-valuenow=0 role=progressbar></div></div></div><div class="form-floating mb-4"><textarea class=form-control id=gov-address name=gov_address style=height:100px></textarea><label for=gov-address class=form-label>Alamat Kantor</label></div></div></div>`,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Tambahkan",
    cancelButtonText: "Batal",
    showCloseButton: true,
    preConfirm: async () => {
      const formData = {};
      const fields = document.querySelectorAll(
        "#form-add-user input, #form-add-user textarea"
      );
      fields.forEach((field) => {
        if (field.type === "file") return;
        formData[field.id.replace("-", "_")] = field.value.trim();
      });
      formData.document = document.getElementById("document").value;
      return formData;
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        url: "/register",
        type: "POST",
        data: result.value,
        success: function (response) {
          const data = JSON.parse(response);

          if (data.status == "success") {
            Swal.fire({
              icon: "success",
              title: "Berhasil!",
              text: data.message,
              showConfirmButton: false,
              timer: 3000,
              allowOutsideClick: false,
            }).then(() => {
              location.reload();
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Gagal!",
              text: data.message,
              showConfirmButton: true,
              position: "center",
            });
          }
        },
        error: function (xhr, status, error) {
          console.log(error);
        },
      });
    }
  });

  /**
   * Helper function to create an input field.
   * @param {string} id - ID and name of the input.
   * @param {string} label - Label for the input.
   * @param {string} type - Type of the input (e.g., text, email, password).
   * @returns {string} - HTML string for the input field.
   */

  function createInputField(id, label, type) {
    return `<div class="mb-3"><label for="${id}" class="form-label">${label}</label><input type="${type}" id="${id}" name="${id.replace("-", "_")}" class="form-control" autocomplete="off"></div>`;
  }

  $("#form-add-user #file-upload").change(function () {
    uploadFileUser(this);
  });
});

function uploadFileUser(fileInput) {
  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append("file", file);

  $.ajax({
    type: "POST",
    url: "/upload",
    data: formData,
    processData: false,
    contentType: false,
    beforeSend: function () {
      $("#form-add-user #progressBar")
        .attr("aria-valuenow", 0)
        .css("width", "0%");
    },
    xhr: function () {
      const xhr = new window.XMLHttpRequest();
      xhr.upload.addEventListener("progress", function (evt) {
        if (evt.lengthComputable) {
          const percentComplete = (evt.loaded / evt.total) * 100;
          $("#form-add-user #progressBar")
            .attr("aria-valuenow", percentComplete)
            .css("width", percentComplete + "%")
            .text(percentComplete.toFixed(0) + "%");
        }
      });
      return xhr;
    },
    success: function (response) {
      try {
        const res =
          typeof response === "string" ? JSON.parse(response) : response;
        if (res.status === "success") {
          $("#form-add-user #document").val(res.path_name);
          alert(res.message);
        } else {
          alert(res.message);
        }
      } catch (error) {
        console.error("Error parsing response:", error);
      }
    },
    error: function (xhr, status, error) {
      console.error("Upload error:", error);
      alert("Terjadi kesalahan saat mengunggah file");
    },
  });
}
