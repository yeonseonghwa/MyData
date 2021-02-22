var url = location;
var title = document.title;

url = url.toString().replace("http://localhost:8080/proxy/", "");

//alert("url : " + url + "\ntitle : " + title);

var d = new Date();

method = "get";

var form = document.createElement("form")
form.setAttribute("method", method);
form.setAttribute("action", '/req');


var notice = ["account", "t", "user", "searchkeyword", "clickkeyword", "url", "up"];
var values = ["commant", d.toISOString().replace(/-/g, "").replace(/:/g, "").replace("T", "").slice(0,14), "yeon", title, title, url, 1];
var i;
for (i = 0; i < 7; i++){
var hidden = document.createElement("input");
hidden.setAttribute("type", "hidden");
hidden.setAttribute("name", notice[i]);
hidden.setAttribute("value", values[i]);

form.appendChild(hidden);
}
document.body.appendChild(form);
form.submit();
