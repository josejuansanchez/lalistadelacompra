<?php

set_time_limit(0);

include_once('simplehtmldom/simple_html_dom.php');
include_once('lib/lib_common.php');


function getData($provincia, $IdTrimestre, $fecha)
{
    $url = "http://www.observatorioprecios.es/Buscador/Resultados?";
    $url .= "IdTrimestre=$IdTrimestre&";
    $url .= "Familias=10&Familias=20&Familias=31&Familias=32&Familias=33&Familias=50&Familias=40&Familias=60&";
    $url .= "Agrupacion=Ciudad&";
    $url .= "IdCiudad=" . $provincia["id"] . "&";
    $url .= "Indicador=IndicePrecios&aceptar=Aceptar";

    $html = file_get_html($url);

    foreach($html->find('tr') as $row) 
    {
	echo $provincia["id"] . ";";
	echo $provincia["provincia"] . ";";

    	foreach($row->find('td a') as $td)
	{
		echo html_entity_decode($td->innertext, ENT_QUOTES, 'UTF-8') . ", " . $provincia["provincia"] . ", España;";
		break;
	}

    	foreach($row->find('td') as $td)
	{
		if (strpos($td->innertext,"a href") == false)
		{
			echo trim(EliminarSaltosDeLinea($td->innertext)) . ";";
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

$provincias = array( array("id" => "2", "provincia" => "Albacete"),
		     array("id" => "3", "provincia" => "Alicante/Alacant"),
		     array("id" => "4", "provincia" => "Almería"),
		     array("id" => "5", "provincia" => "Ávila"),
		     array("id" => "6", "provincia" => "Badajoz"),
		     array("id" => "8", "provincia" => "Barcelona"),
	    	     array("id" =>"48", "provincia" => "Bilbao"),
		     array("id" => "9", "provincia" => "Burgos"),
		     array("id" =>"10", "provincia" => "Cáceres"),
		     array("id" =>"11", "provincia" => "Cádiz"),
		     array("id" =>"12", "provincia" => "Castellón de la Plana"),
		     array("id" =>"51", "provincia" => "Ceuta"),
		     array("id" =>"13", "provincia" => "Ciudad Real"),
		     array("id" =>"14", "provincia" => "Córdoba"),
		     array("id" =>"15", "provincia" => "Coruña (A)"),
		     array("id" =>"16", "provincia" => "Cuenca"),
		     array("id" =>"20", "provincia" => "Donostia-San Sebastián"),
		     array("id" =>"53", "provincia" => "Gijón"),
		     array("id" =>"17", "provincia" => "Girona"),
		     array("id" =>"18", "provincia" => "Granada"),
		     array("id" =>"19", "provincia" => "Guadalajara"),
		     array("id" =>"21", "provincia" => "Huelva"),
		     array("id" =>"22", "provincia" => "Huesca"),
		     array("id" =>"23", "provincia" => "Jaén"),
		     array("id" =>"54", "provincia" => "Jerez de la Frontera"),
		     array("id" =>"24", "provincia" => "León"),
		     array("id" =>"25", "provincia" => "Lleida"),
		     array("id" =>"26", "provincia" => "Logroño"),
		     array("id" =>"27", "provincia" => "Lugo"),
		     array("id" =>"28", "provincia" => "Madrid"),
		     array("id" =>"29", "provincia" => "Málaga"),
		     array("id" =>"52", "provincia" => "Melilla"),
		     array("id" =>"30", "provincia" => "Murcia"),
		     array("id" =>"32", "provincia" => "Ourense"),
		     array("id" =>"33", "provincia" => "Oviedo"),
		     array("id" =>"34", "provincia" => "Palencia"),
		     array("id" => "7", "provincia" => "Palma de Mallorca"),
		     array("id" =>"35", "provincia" => "Palmas de Gran Canaria"),
		     array("id" =>"31", "provincia" => "Pamplona/Iruña"),
		     array("id" =>"36", "provincia" => "Pontevedra"),
		     array("id" =>"37", "provincia" => "Salamanca"),
		     array("id" =>"38", "provincia" => "Santa Cruz de Tenerife"),
		     array("id" =>"39", "provincia" => "Santander"),
		     array("id" =>"40", "provincia" => "Segovia"),
		     array("id" =>"41", "provincia" => "Sevilla"),
		     array("id" =>"42", "provincia" => "Soria"),
		     array("id" =>"56", "provincia" => "Talavera de la Reina"),
		     array("id" =>"43", "provincia" => "Tarragona"),
		     array("id" =>"44", "provincia" => "Teruel"),
		     array("id" =>"45", "provincia" => "Toledo"),
		     array("id" =>"46", "provincia" => "Valencia"),
		     array("id" =>"47", "provincia" => "Valladolid"),
		     array("id" =>"55", "provincia" => "Vigo"),
		     array("id" =>"1", "provincia" => "Vitoria-Gasteiz"),
		     array("id" =>"49", "provincia" => "Zamora"),
		     array("id" =>"50", "provincia" => "Zaragoza")
		);

printHeaderCSV();
foreach($provincias as $prov)
{
	for($i=0;$i<9;$i++)
	{
		GetData($prov, $p[$i]["idtrimestre"], $p[$i]["fecha"]);
	}
}

?>

