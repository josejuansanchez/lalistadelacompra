google.load('visualization', '1', {'packages':['corechart']});
google.load('visualization', '1', {'packages':['motionchart']});	

var tableid;
var layer;
var geocoder;
var map;

function initialize() 
{
  tableid = 808991;
  layer = new google.maps.FusionTablesLayer(tableid, {query: "SELECT col2 from " + tableid + " WHERE col0 = 0 and col13 = '1/1/2011'"});
  geocoder = new google.maps.Geocoder();
  loadMap(39.707187, -3.867187);
  changeDataMotionChart(3, 0, "1/1/2011"); 
}

function loadMap(myLatitude, myLongitude)
{
  map = new google.maps.Map(document.getElementById('map_canvas'), {
    center: new google.maps.LatLng(myLatitude, myLongitude),
    zoom: 6,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  });

  layer.setMap(map);

  google.maps.event.addListener(layer, 'click', function(e) {
  
    if (e.row['Total alimentación'].value=="[Sin Datos]")
	bar1 = 0;
    else
	bar1 = e.row['Total alimentación'].value;

    if (e.row['Alimentación envasada (cesta estándar)'].value=="[Sin Datos]")
	bar2 = 0;
    else
	bar2 = e.row['Alimentación envasada (cesta estándar)'].value;

    if (e.row['Alimentación envasada (cesta económica)'].value=="[Sin Datos]")
	bar3 = 0;
    else
	bar3 = e.row['Alimentación envasada (cesta económica)'].value;

    if (e.row['Frutas y verduras'].value=="[Sin Datos]")
	bar4 = 0;
    else
	bar4 = e.row['Frutas y verduras'].value;

    if (e.row['Carnes'].value=="[Sin Datos]")
	bar5 = 0;
    else
	bar5 = e.row['Carnes'].value;

    if (e.row['Pescados'].value=="[Sin Datos]")
	bar6 = 0;
    else
	bar6 = e.row['Pescados'].value;

    if (e.row['Droguería (cesta estándar)'].value=="[Sin Datos]")
	bar7 = 0;
    else
	bar7 = e.row['Droguería (cesta estándar)'].value;


    if (e.row['Droguería (cesta económica)'].value=="[Sin Datos]")
	bar8 = 0;
    else
	bar8 = e.row['Droguería (cesta económica)'].value;

    e.infoWindowHtml = "<img src=\"http://chart.apis.google.com/chart?";
    e.infoWindowHtml += "chxr=0,0,260&chxs=0,676767,11.5,0,lt,676767&chxt=x&chbh=a,5,20&chs=380x200&cht=bhg&";
    //e.infoWindowHtml += "chco=FFCC33,80C65A,76A4FB,C2BDDD,DDF8CC,FFEAC0,FFFF88,E8E8E8&";

    e.infoWindowHtml += "chco="+ GetColor(bar1) +","+ GetColor(bar2) +","+ GetColor(bar3) +","+ GetColor(bar4) +","+ GetColor(bar5) +","+ GetColor(bar6) +","+ GetColor(bar7) +","+ GetColor(bar8) +"&";


    e.infoWindowHtml += "chds=0,260,0,260,0,260,0,260,0,260,0,260,0,260,0,260&";
    e.infoWindowHtml += "chd=t:" + bar1 +"|" + bar2 +"|" + bar3 + "|" + bar4 + "|" + bar5 +"|" + bar6 + "|" + bar7 + "|" + bar8;
    e.infoWindowHtml += "&chdl=Total+alimentaci%C3%B3n|Alim.+envasada+(est%C3%A1ndar)|Alim.+envasada+(econ%C3%B3mica)|Frutas+y+verduras|";
    e.infoWindowHtml += "Carnes|Pescados|Droguer%C3%ADa+(est%C3%A1ndar)|Droguer%C3%ADa+(econ%C3%B3mica)&chma=25|160,10&";
    e.infoWindowHtml += "chtt=" + e.row['Localización'].value + "\" width=\"380\" height=\"200\" alt=\"Título\" />";

    var info = document.getElementById('detalle');
    
    info.innerHTML = "<h2><span>" + e.row['Localización'].value + "</span></h2>"; 
    info.innerHTML += "<dl>";
    info.innerHTML += "<dt>Total alimentación<br /></dt>";
    info.innerHTML += GetDDClass(e.row['Total alimentación'].value);  
    info.innerHTML += "<dt>Alimentación envasada<br /><span>(cesta estándar)<span></dt>";
    info.innerHTML += GetDDClass(e.row['Alimentación envasada (cesta estándar)'].value);  
    info.innerHTML += "<dt>Alimentación envasada<br /><span>(cesta económica)<span></dt>";
    info.innerHTML += GetDDClass(e.row['Alimentación envasada (cesta económica)'].value);  
    info.innerHTML += "<dt>Frutas y verduras:<br /></dt>";
    info.innerHTML += GetDDClass(e.row['Frutas y verduras'].value);  
    info.innerHTML += "<dt>Carnes:<br /></dt>";
    info.innerHTML += GetDDClass(e.row['Carnes'].value);  
    info.innerHTML += "<dt>Pescados:<br /></dt>";
    info.innerHTML += GetDDClass(e.row['Pescados'].value);
    info.innerHTML += "<dt>Droguería <br /><span>(cesta estándar)<span></dt>";
    info.innerHTML += GetDDClass(e.row['Droguería (cesta estándar)'].value);
    info.innerHTML += "<dt>Droguería <br /><span>(cesta económica)<span></dt>";
    info.innerHTML += GetDDClass(e.row['Droguería (cesta económica)'].value);
    info.innerHTML += "</dl>";
  });
}

function changeQuery(fecha) 
{
  var idCiudad = document.getElementById('IdCiudad').value;
  layer.setQuery("SELECT col2 FROM " + tableid + " WHERE col0 = '" + idCiudad + "' and col13 = '" + fecha + "'");
  detalle.innerHTML = "";
}

function changeMap(id, address) 
{
  if (id==0)
  {
	initialize();
  }
  else
  {
  	geocoder.geocode( { 'address': address + ", España"}, function(results, status) {
        	map.setCenter(results[0].geometry.location);
		map.setZoom(13);
    	});
  }
  changeQuery(document.getElementById('IdTrimestre').value);
  changeDataMotionChart(document.getElementById('IdIndicador').value, id, document.getElementById('IdTrimestre').value);
}

function changeDataMotionChart(indicador, idCiudad, fecha) 
{
  //var queryText = encodeURIComponent("SELECT col2, col13, col" + indicador + " FROM " + tableid + " WHERE col0 = " + idCiudad);
  var queryText = encodeURIComponent("SELECT col2, col13, col" + indicador + " FROM " + tableid + " WHERE col0 = " + idCiudad + " and col13 = '" + fecha +"'");
  var query = new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq='  + queryText);
  query.send(getDataMotionChart);
}

function getDataMotionChart(response) 
{
  var chart = new google.visualization.MotionChart(document.getElementById('visualization_motion'));
  var time = ToMotionChartFormat(document.getElementById('IdTrimestre').value);
  var options = {width: 800, height:400};
  options['state'] = '{"time":"'+ time + '","yAxisOption":"2","sizeOption":"_UNISIZE","showTrails":false,"orderedByX":true,"xAxisOption":"2","yZoomedDataMax":120,"iconKeySettings":[],"iconType":"VBAR","xLambda":1,"yZoomedDataMin":0,"xZoomedDataMin":0,"yLambda":1,"nonSelectedAlpha":0.4,"xZoomedIn":false,"uniColorForNonSelected":false,"playDuration":15000,"yZoomedIn":false,"orderedByY":false,"xZoomedDataMax":16,"dimensions":{"iconDimensions":["dim0"]},"colorOption":"2","duration":{"multiplier":1,"timeUnit":"D"}}';

  chart.draw(response.getDataTable(), options);
}

function ToMotionChartFormat(fecha)
{
	switch(fecha)
	{
		case "1/1/2011":   return "2011-01-01";
		case "10/1/2010" : return "2010-10-01";
		case "7/1/2010":   return "2010-07-01";
		case "4/1/2010":   return "2010-04-01";
		case "1/1/2010":   return "2010-01-01";
		case "10/1/2009":  return "2009-10-01";
		case "7/1/2009":   return "2009-07-01";
		case "4/1/2009":   return "2009-04-01";
		case "1/1/2009":   return "2009-01-01";
	}
}

function GetDDClass(value)
{
    var ddclass;
    var num = parseInt(value)-100;
    if(num==0)
    {
    	ddclass = "<dd class=\"verde\">" + num + " %</dd>";
	ddclass += "<div id=\"bar\" class=\"barra barato\"><img src=\"imagenes/ico_barato_izq.png\" width=\"3\" height=\"7\" alt=\"adorno\" /></div>";
    }    
    else
    {
	if (num>0)
	{
		ddclass = "<dd class=\"rojo\">" + num + " %</dd>";
		ddclass += "<div id=\"bar2\" class=\"barra caro\"><img src=\"imagenes/ico_caro_izq.png\" width=\"3\" height=\"7\" alt=\"adorno\" /></div>";
	}
	else
	{
		ddclass = "<dd class=\"negro\">-</dd>";
		ddclass += "<div id=\"bar\" class=\"barra media\"><img src=\"imagenes/ico_media_izq.png\" width=\"3\" height=\"7\" alt=\"adorno\" /></div>";
	}
    }
    return ddclass;
}

function GetColor(value)
{
	var color;
	var num = parseInt(value)-100;
	if (num==0)
	{
		color = "3da110";
	}
	else
	{
		color = "ad1026";
	}
	return color;
}

