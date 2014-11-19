var langs = ['en', 'it'];
var langCode = 'automatic';			//Write the default Value from langs into it
var langJS = null;


var translate = function (jsdata)
{	
	$("[tkey]").each (function (index)
	{
		var strTr = jsdata [$(this).attr ('tkey')];
	    $(this).html (strTr);
	});
}

if(langCode == 'automatic'){
	langCode = navigator.language.substr (0, 2);
}

if ($.inArray( langCode, langs ) >= 0){
	$.getJSON('lang/'+langCode+'.json', translate);
}else{
	$.getJSON('lang/en.json', translate);
}


