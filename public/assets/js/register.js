$("#register").submit(function (e) {
  e.preventDefault();

  const formData = $(this).serialize();

  $.ajax({
    url: "/register",
    type: "POST",
    data: formData,
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
          location.replace("/");
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
});

$("#phone").keyup(function () {
  phoneNumber("#phone", $(this).val());
});

$("#username").keyup(function () {
  userName("#username", $(this).val());
});

var generalInput = [
  "#gov-name",
  "#gov-leader",
  "#gov-position",
  "#gov-contact",
  "#gov-address",
];

$.each(generalInput, function (i, data) {
  $(data).keyup(function () {
    generalFilter(data, $(this).val());
  });
});

function phoneNumber(className, inputValue) {
  var regex = /^[0-9]*$/;
  if (!regex.test(inputValue)) {
    inputValue = inputValue.replace(/[^0-9]/g, "");
  }
  return $(className).val(inputValue);
}

function userName(className, inputValue) {
  var regex = /^[0-9]*$/;
  if (!regex.test(inputValue)) {
    inputValue = inputValue.replace(/[^a-z0-9]/g, "");
  }
  return $(className).val(inputValue);
}

function generalFilter(className, inputValue) {
  var regex = /^[0-9]*$/;
  if (!regex.test(inputValue)) {
    inputValue = inputValue.replace(/[^a-zA-Z0-9 .@]/g, "");
  }
  return $(className).val(inputValue);
}

$("#file-upload").change(function () {
  uploadFile($(this)[0]);
  $(`#register button[type="submit"]`).prop("disabled", false);
});

function uploadFile(fileInput) {
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
