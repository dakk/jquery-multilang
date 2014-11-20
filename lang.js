/*
 * ReWritten by eieste
 *
 * Run the function $.languageSet()
 * to set your default values.
 * the following options are available:
 * {"userSettings":"en","useLocalStorage":true}
 * example:
 * $.languageSet({"userSettings":"en","useLocalStorage":true,'languageList':['en','it']})
 * User settings can be reset by a dropdown menue or whatever you want, useLocalStorage save this setting in the localStorage and
 * languageList are available
 * $.reloadLanguage();
 * This function is loading the new language file, by changing the language. But a reload is necessary and must be done at th first site call.
 * With $.languageFill("example2") you can get language variable content. It is usefull in javascripts.
 * $("div").languageFill(); Replaces all phrases in the div elements.
 * A phrase is a text variable that could read in every language. These vairables looks like:
 *                    {%phrase;test%}
 *                     ^   ^  ^  ^  ^
 * Unique Identifire---┘   │  │  │  └----Unique Identifire
 *         Type Variable---┘  │  └----Variable
 *                Delimiter---┘  
 * The Unique Identifire "{%" Identifie this Variable. The Characters are note used in any popular pogramm language
 * The type variable can be used for multiple functions; for example: {%user;%} this example does not work, but
 * with a real variable there can be printed the username of the logged in user
 * The variable is a variable that used in the type variable. for example: {%user;name%}
 * Example Script:
 *
 * <script type="text/javascript" src="lang.js"></script>
 * <script type="text/javascript">
 *  $(document).ready(function(){
 *   $.languageSet();
 *   $.reloadLanguage();
 *   $("div").languageFill();
 *   alert($.languageFill("example"));
 * });
 * </script>
 *
 * Warning do not search in body for variables! This can be reload your site multiple times!
 * Do NOT USE $("body").languageFill();   or $("html").languageFill();
 * Your site reloads multiple times, because the script reinsert and re execute your <script> tags!
 *
 *
 *
 *
 */

var defaultLanguage;
var userSetting;
var useLocalStorage;
userSetting = "";
var languageJSONtempVar;
languageJSONtempVar = "";
if(localStorage.language != "" &&localStorage.language != "undefined" &&localStorage.language != undefined){
	userSetting = localStorage.language;
}



//$.getJSON('lang/en.json', translate);

$.extend({
	languageSet: 	function(settings){
						var config = {
							'userSetting':'en',
							'useLocalStorage':true,
							'languageList':['en','it']
						};
						if (settings){$.extend(config, settings);}
						if(config.useLocalStorage == true){
							localStorage.language = userSetting;
						}
						if(userSetting == ""){
							userSetting = config.userSetting;
						}
					},
	reloadLanguage:	function(){
						$.ajax({
							type: 			"GET",
							url:			'lang/'+userSetting+'.json',
							contentType: 	'application/json',
							dataType:		'json',
							success: 		function(result) {
												languageJSONtempVar = result;
											},
							error: 		function(result, a, b) {
												console.log(b);
											},
							async:   false
						}); 
					},
	languageFill: 	function(param){
						return languageJSONtempVar[param];
					}
});

$.fn.extend({
	languageFill:	function(){
						this.each(function(){
							var content = $(this).html();
							var res = content.match(/(\{%.*?;.*?\%})/ig);
							$.each(res, function(key, value){
								var result = value.split(";");
								if(result[0].substr(2) == "phrase"){
									langstr = result[1].substr(0,result[1].length-2);
									content = content.replace("{%phrase;"+langstr+"%}", languageJSONtempVar[langstr]);
								}
							});
							$(this).html(content)
							
							$(this).find("[tkey]").each(function(){
								$(this).html (languageJSONtempVar[$(this).attr('tkey')]);
							});
							
							
						})
					}
});

$.languageSet();
$.reloadLanguage();
$("div").languageFill();
