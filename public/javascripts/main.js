$(document).on("click","#sum",function(){
	var params = {num1 : $("#num1").val(),num2 : $("#num2").val()};
	$.get( '/calculate',params, function(data) {
       	$("#sum_val").html(data);
     });

});