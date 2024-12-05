$("#profile-form button").click(function (e) {
  $.ajax({
    type: "POST",
    url: "/profile",
    data: {
      gov_name: $("#gov-name").val(),
      gov_leader: $("#gov-leader").val(),
      gov_position: $("#gov-position").val(),
      gov_contact: $("#gov-contact").val(),
      gov_phone: $("#gov-phone").val(),
      gov_address: $("#gov-address").val(),
    },
    success: function (data) {
      const res = JSON.parse(data);
      if (res.status == "success") {
        Swal.fire({
          icon: "success",
          title: res.message,
          toast: true,
          timer: 3000,
          position: "bottom-end",
          showConfirmButton: false,
          timerProgressBar: true,
        });
      }
    },
  });
});
