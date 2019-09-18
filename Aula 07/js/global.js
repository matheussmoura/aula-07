
// FunÃ§Ã£o padrÃ£o para 'sanitizar' os valores dos campos de formulÃ¡rio
function sanitiza(texto) { 
	// Limpa espaÃ§os antes e depois da string
	texto = texto.trim();

	// Limpa espaÃ§os duplicados dentro da string
	while(texto.indexOf('  ') != -1) // 'TRUE' enquanto ocorrerem espaÃ§os duplos
		texto = texto.replace('  ', ' '); // Troca espaÃ§os duplos por simples

	// Altera caracteres indesejados (usando expressÃ£o regular) pelo 'HTML entitie' equivalente
	texto = texto.replace(/&/g, '&amp;'); /* Caractere '&' */
	texto = texto.replace(/</g, '&lt;'); /* Caractere '<' */
	texto = texto.replace(/>/g, '&gt;'); /* Caractere '>' */
	texto = texto.replace(/"/g, '&quot;'); /* Caractere '"' */

	// Retorna string 'limpa'
	return texto;
}

// FunÃ§Ã£o para validar somente letras em campos de formulÃ¡rios (usando expressÃ£o regular e match())
function soLetras(texto) { 
    if(texto.match(/[^a-zÃ -Ãº ]/gi))
        return false;
    return true;
}

// FunÃ§Ã£o para validar um endereÃ§o de e-mail(usando expressÃ£o regular e match())
function isMail(texto) { 
    if(texto.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]{2,}$/))
        return true;
	return false;
}