$("#subscribeForm").on("submit", function (e) {
  e.preventDefault();
  submitForm();
});

function submitForm() {
  let btn = $("#subscribeBtn");
  btn.html("Please wait...");
  let formData = $("#subscribeForm").serialize();

  // AJAX submit
  $.ajax({
    type: "POST",
    url: "mailscript.php",
    data: formData,
    dataType: "json",
    async: true,
    encode: true,
  }).done(function (data) {
    if (data["msgType"] == true) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: data.msg,
      }).then(() => {
        btn.html("Subscribe");
        $("#subscribeForm")[0].reset();
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: data.msg,
      }).then(() => {
        btn.html("Subscribe");
      });
    }

    console.log(data);
  });
}
