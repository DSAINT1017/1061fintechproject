$( document ).ready(function() {
    update();
    $("#update").click(function(){
        update();
    })
});
function update(){
    $.post('update',function(result){
        $('#t-donation').empty();
        $('#t-expense').empty();
        result[0].forEach(element => {
            var t = '<tr>';
            t += '<td><a href="/watch/'+element[0]+'">'+element[0]+'</td>'
            t += '<td>'+element[1]+'</td>'
            t += '<td>'+element[2]+'</td>'
            t += '<td>'+element[3]+'</td>'
            t += '</tr>'
            $('#t-donation').append(t);
        });
        result[1].forEach(element => {
            var t = '<tr>';
            t += '<td><a href="/watch/'+element[0]+'">'+element[0]+'</td>'
            t += '<td>'+element[1]+'</td>'
            t += '<td>'+element[2]+'</td>'
            t += '<td>'+element[3]+'</td>'
            t += '<td>'+element[4]+'</td>'
            t += '<td>'+element[5]+'</td>'
            t += '</tr>'
            $('#t-expense').append(t);
        });
    })
}