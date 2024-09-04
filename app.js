function doSearch(){
    var query = document.getElementById('search-input').value;
    var url = 'https://www.google.com/search?q=' + query;
    if(query.length > 0){
        window.location.href = url;
    }
    return false;
}