$( document ).ready(function() {
    if($("#uid").text()){
        $(".user-in").show();
        $(".user-out").hide();
    }
    else{
        $(".user-in").hide();
        $(".user-out").show();
    }
});