sucesso

<?php
/* PROCESSADOR DO FORMULÃRIO NO BACKEND - SÃ“ UM EXEMPLO TOSCO */
// ServiÃ§o que recebe os dados do formulÃ¡rio de contatos

// Seta fuso horÃ¡rio para UTC (Brasilia = UTC -3)
date_default_timezone_set('Etc/UTC');

// O trecho abaixo recebe os dados do formulÃ¡rio e os sanitiza
$fields['nome'] = filter_input(INPUT_POST, 'nome', FILTER_SANITIZE_SPECIAL_CHARS);
$fields['email'] = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$fields['assunto'] = filter_input(INPUT_POST, 'assunto', FILTER_SANITIZE_SPECIAL_CHARS);
$fields['mensagem'] = filter_input(INPUT_POST, 'mensagem', FILTER_SANITIZE_SPECIAL_CHARS);

// O trecho abaixo armazena os dados do contato em um banco de dados sequÃªncial

// Formata os dados para o banco de dados
$formData = "~~~~~~~~~~ Contato enviado em " . date('d/m/Y H:i') . " UTC ~~~~~~~~~~\n";
foreach($fields as $campo => $valor)
    $formData .= "\t{$campo}: {$valor}\n"; 

// Tenta gravar no banco de dados sequencial
if(file_put_contents('contatos.txt', $formData."\n", FILE_APPEND | FILE_TEXT)) // Sucesso
    $out = 'sucesso';
else // Falha
    $out = 'falhou';

// Retorna uma resposta simples para a pÃ¡gina ('sucesso' ou 'falha')
echo $out;
?>