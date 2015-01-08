var $tables = $('table > tbody > tr > td > table');

var jq = document.createElement('script');
jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(jq);
// ... give time for script to load, then type.
jQuery.noConflict();



var allTables = [];

$tables.each(function () {
  var $rows = $(this).find('tr');
  var rows = [];
  $rows.each(function () {
    var $data = $(this).find('td');
    var data = [];
    $data.each(function () {
      data.push($(this).text());
    });
    rows.push(data);
  });
  allTables.push(rows);
});



var allTablesCSV = "";

$tables.each(function () {
  var $rows = $(this).find('tr');
  $rows.each(function () {
    var $data = $(this).find('td');
    $data.each(function () {
      allTablesCSV += $(this).text() + ',';
    });
    allTablesCSV += '\n';
  });
  
  allTablesCSV += '\n';  
});
