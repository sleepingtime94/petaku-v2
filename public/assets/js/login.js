$("#btn-login").click(() => {
  const username = $("#form-input-username").val();
  const password = $("#form-input-password").val();
  const turnstileToken = $('input[name="cf-turnstile-response"]').val();

  if (!username || !password) {
    $(".notification").html(
      `<div class="small alert alert-warning alert-dismissible fade show" role="alert"><strong>Gagal!</strong> Silahkan masukkan nama pengguna/kata sandi<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`
    );
  } else {
    $.ajax({
      type: "POST",
      url: "login",
      data: {
        username: username.toLowerCase(),
        password,
        turnstileToken,
      },
      success: function (res) {
        const response = JSON.parse(res);
        if (response.status == "success") {
          Swal.fire({
            icon: "success",
            title: "Login Berhasil!",
            text: response.message,
            timer: 3000,
            showConfirmButton: false,
            allowOutsideClick: false,
          }).then(() => {
            location.replace("/dashboard");
          });
        } else {
          $(".notification").html(
            `<div class="small alert alert-danger alert-dismissible fade show" role="alert"><strong>Gagal!</strong> ${response.message}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`
          );
        }
      },
    });
  }
});
