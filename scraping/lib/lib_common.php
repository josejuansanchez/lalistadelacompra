<?php

function EliminarSaltosDeLinea($cadena)
{
	$lista = array("\r\n", "\n\r", "\n", "\r");
	$nuevacadena = str_replace($lista, "", $cadena);  
	return $nuevacadena;
}


function printHeaderCSV()
{
    echo "IdCiudad; Ciudades; Localización; Total alimentación; Alimentación envasada (cesta estándar); Estándar vs Económica;";
    echo "Alimentación envasada (cesta económica); Frutas y verduras; Carnes; Pescados;Droguería (cesta estándar);";
    echo "Estándar vs Económica; Droguería (cesta económica); Fecha;\n";
}

?>
