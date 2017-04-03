$(".btn-submit").on("click",function() {

  var name = $("#name").val();
  var age = $("#age").val();
  var role = $("#role").val();
  console.log("Data at UI End");
  console.log(`Name: ${name}
    Age: ${age}
    Role: ${role}`);
  console.log("******");


  $.post( "/contactus", { "name": $("#name").val(), "age": $("#age").val(), "role": $("#role").val() },
  function( data ) {
    console.log(data)
    $( "#result" ).text( JSON.stringify(data.message) );
    if(data.status == 200){
        $( "#result" ).parent().removeClass("alert-warning");
        $( "#result" ).parent().addClass("alert-success");

    }else if(data.status == 201){
        $( "#result" ).parent().addClass("alert-warning");
          $( "#result" ).parent().removeClass("alert-success");

    }else if(data.status == 400){
          $( "#result" ).parent().removeClass("alert-warning");
          $( "#result" ).parent().removeClass("alert-success");
        $( "#result" ).parent().addClass("alert-danger");
    }
    setTimeout(function () {
      location.reload();
    },3000);
  });

});


deleteUser = function(userId) {
  console.log(userId);
  $.ajax({
    url: '/contactus',
    type: 'DELETE',
    data: {"id": userId},
    success: function(result) {
        // Do something with the result
        alert("Deleted user Successfully!");
        setTimeout(function () {
          location.reload();
        },3000);
    }
  });
};
