var $_GET = new function() {

  var fullURL = location.href.split('?');
  var URLParams = fullURL[1].split('&');

  var $get = [],
  i,
  len = URLParams.length;

  for(i = 0; i <= len-1; ++i) {

    var param = URLParams[i].split('=');
    var name = param[0];
    var value = param[1];

    $get[name] = value;

  }
  return $get;
}();
