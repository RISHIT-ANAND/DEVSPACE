var xhr = new XMLHttpRequest();
xhr.open("GET", "https://url", true);
xhr.onload = function(){
    console.log(xhr.responseText);
};
xhr.send();
