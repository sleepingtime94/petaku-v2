$("#product-verify").click(function () {
  const id = $(this).data("id");
  const formdata = {
    id,
    status: 1,
  };

  $.ajax({
    url: `/product/update`,
    data: formdata,
    method: "POST",
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
          title: "Oops",
          text: data.message,
        });
      }
    },
  });
});

$("#product-done").click(function () {
  const id = $(this).data("id");
  const formdata = {
    id,
    status: 2,
  };

  $.ajax({
    url: `/product/update`,
    data: formdata,
    method: "POST",
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
          title: "Oops",
          text: data.message,
        });
      }
    },
  });
});

$("#product-delete").click(function () {
  const id = $(this).data("id");

  Swal.fire({
    title: "Hapus Permohonan?",
    text: "Menghapus permohonan secara permanen tidak dapat dikembalikan!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ya, Hapus!",
    cancelButtonText: "Batal",
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        url: `/product/${id}`,
        method: "DELETE",
        success: function (result) {
          const data = JSON.parse(result);

          if (data.status === "success") {
            Swal.fire({
              icon: "success",
              title: "Berhasil!",
              text: data.message,
            }).then(() => {
              location.replace("/");
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
});

$("#product-pending").click(function () {
  const id = $(this).data("id");
  const notes = $("#pending-notes").val();
  const formdata = {
    id,
    status: 3,
    notes,
  };

  $.ajax({
    url: `/product/update`,
    data: formdata,
    method: "POST",
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
          title: "Oops",
          text: data.message,
        });
      }
    },
  });
});

$("#file-upload").change(function () {
  const pid = $(this).data("id");
  uploadFile(pid, $(this)[0]);
});

function uploadFile(pid, fileInput) {
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
      $(`#progressBar`).attr("aria-valuenow", 0);
      $(`#progressBar`).css("width", "0%");
    },
    xhr: function () {
      var xhr = new window.XMLHttpRequest();
      xhr.upload.addEventListener("progress", function (evt) {
        if (evt.lengthComputable) {
          var percentComplete = (evt.loaded / evt.total) * 100;
          $(`#progressBar`).attr("aria-valuenow", percentComplete);
          $(`#progressBar`).css("width", percentComplete + "%");
          $(`#progressBar`).text(percentComplete.toFixed(0) + "%");
        }
      });
      return xhr;
    },
    success: function (response) {
      $(`#send-request`).prop("disabled", false);

      const res = JSON.parse(response);
      const tempFile = res.path_name;

      if (res.status === "success") {
        $(`#temp-file`).val(tempFile);

        $.ajax({
          url: `/product/update`,
          data: {
            id: pid,
            file_response: tempFile,
          },
          method: "POST",
          success: function (result) {
            console.log(result);
          },
        });

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

$("#response-document").click(function () {
  window.open("/files/" + $(this).data("file"), "_blank");
});
