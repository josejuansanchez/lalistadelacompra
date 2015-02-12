<?php

set_time_limit(0);

include_once('simplehtmldom/simple_html_dom.php');
include_once('lib/lib_common.php');


function getData($IdCiudad, $IdTrimestre, $fecha)
{
    $url = "http://www.observatorioprecios.es/Buscador/Resultados?";
    $url .= "IdTrimestre=$IdTrimestre&";
    $url .= "Familias=10&Familias=20&Familias=31&Familias=32&Familias=33&Familias=50&Familias=40&Familias=60&";
    $url .= "Agrupacion=Ciudad&";
    $url .= "IdCiudad=$IdCiudad&";
    $url .= "Indicador=IndicePrecios&aceptar=Aceptar";

    $html = file_get_html($url);

    foreach($html->find('tr') as $row) 
    {
	echo $IdCiudad . ";";

    	foreach($row->find('td a') as $td)
	{
		echo html_entity_decode($td->innertext, ENT_QUOTES, 'UTF-8') . ";";
		echo html_entity_decode($td->innertext, ENT_QUOTES, 'UTF-8') . ", España;";
	}

    	foreach($row->find('td') as $td)
	{
		if (strpos($td->innertext,"a href") == false)
		{
			echo $td->innertext . ";";
		}
	}

	echo $fecha . ";";	
	echo "\n";
    }

    $html->clear(); 
    unset($html);
}


$p = array( array("idtrimestre" => "20091", "fecha" => "1/1/2009"),
            array("idtrimestre" => "20092", "fecha" => "4/1/2009"),
            array("idtrimestre" => "20093", "fecha" => "7/1/2009"),
            array("idtrimestre" => "20094", "fecha" => "10/1/2009"),
            array("idtrimestre" => "20101", "fecha" => "1/1/2010"),
            array("idtrimestre" => "20102", "fecha" => "4/1/2010"),
            array("idtrimestre" => "20103", "fecha" => "7/1/2010"),
            array("idtrimestre" => "20104", "fecha" => "10/1/2010"),
            array("idtrimestre" => "20111", "fecha" => "1/1/2011")
	  ); 


printHeaderCSV();
for($i=0;$i<9;$i++)
{
	GetData(0, $p[$i]["idtrimestre"], $p[$i]["fecha"]);
}

?>

