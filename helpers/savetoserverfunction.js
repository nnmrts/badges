i = 0;

while (i < 5000) {
logininput = ids2[0].username;
id = ids2[0].id;

phpid = new FormData();
phpid.append("phpid", id);
phpid.append("phplogin", logininput.toUpperCase().replace(/\s+/g, "-"));
xhr = (window.XMLHttpRequest) ? new XMLHttpRequest() : new activeXObject("Microsoft.XMLHTTP");
xhr.open( 'post', 'saveid.php', true );
xhr.send(phpid);
console.log("saved id on server");

ids2.shift();
i = i+1;
}