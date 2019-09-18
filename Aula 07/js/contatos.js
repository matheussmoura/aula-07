// Define aplicativo principal
function startApp() {

    // Monitora o formulÃ¡rio '#contatos', aguardando um envio (submit)
    $(document).on('submit', '#contatos', function(){

        // Desabilita botÃ£o de envio para evitar cliques duplos
        $('#contato_enviar').attr("disabled", true);

        // VariÃ¡veis usadas no programa
        var erro = '';
        var out = '';

        // Obtendo dados dos campos do formulÃ¡rio e sanitizando
        var nome = sanitiza($('#contato_nome').val());
        var email = sanitiza($('#contato_email').val());
        var assunto = sanitiza($('#contato_assunto').val());
        var mensagem = sanitiza($('#contato_mensagem').val());

        // Atualizando formulÃ¡rio com valore jÃ¡ sanitizados
        $('#contato_nome').val(nome);
        $('#contato_email').val(email);
        $('#contato_assunto').val(assunto);
        $('#contato_mensagem').val(mensagem);

        // Validando nome que deve ter 3 ou mais letras e espaÃ§os
        if (nome.length < 3) {
            erro += '<li>Seu nome estÃ¡ muito curto.</li>';
        } else if (!soLetras(nome)) {
            erro += '<li>Seu nome tem caracteres invÃ¡lidos.</li>';
        }

        // Validando e-mail que deve seguir o formato padrÃ£o
        if (email.indexOf('@') < 1) {
            erro += '<li>Seu e-mail nÃ£o Ã© vÃ¡lido.</li>';
        } else if (!isMail(email)) {
            erro += '<li>Seu e-mail nÃ£o Ã© vÃ¡lido.</li>';
        }

        // Validando assunto com pelo menos 5 caracteres
        if(assunto.length < 5){
            erro += '<li>O assunto estÃ¡ muito curto.</li>';
        };

        // Validando mensagem com pelo menos 5 caracteres
        if(mensagem.length < 5){
            erro += '<li>A mesagem estÃ¡ muito curta.</li>';
        };

        // Se nÃ£o ocorreram erros no preenchimento...
        if(erro == '') {
            
            // FunÃ§Ã£o de 'callback' do envio do formulÃ¡rio
            function enviadoComSucesso(dataResponse){
                if(dataResponse == 'sucesso') {
                    // Quebra o nome em um array (nomes[0], nomes[1], nomes[2]...)
                    var nomes = nome.split(' ');
                    // nomes[0] contÃ©m o primeiro nome sempre
                    out = `<h3>OlÃ¡ ${nomes[0]}!</h3>
                            <blockquote>Seu contato foi enviado para a equipe do site.</blockquote>
                            <p><i>Obrigado...</i></p>
                            <p class="text-center"><a href="JavaScript:history.go(0)">&larr; Voltar</a></p>
                    `;
                    $('#feedback').html(out); // Escreve a mensagem na DIV
                    $('#contatos').hide('fast'); // Oculta o formulÃ¡rio
                    $('#feedback').show('fast'); // Mostra a DVI
                    $('#spinner').css('visibility','hidden'); // Oculta o modal spinner
                } else {
                    // Se nÃ£o retornou com 'sucesso', exibe erro.
                    out = `<big><strong>Oooops!</strong></big>
                    <p>Ocorreram erros que impedem o envio do contato.</p>
                    <ul><li>Erro interno do servidor.</li></ul>
                    <p>A equipe do site jÃ¡ foi avisada deste erro e estÃ¡ verificando.</p>
                    <p>Por favor, tente novamente mais tarde...</p>
                    `;
                    $('#erromsg').html(out); // Escrevo a mensagem na DIV
                    $('#errocaixa').show('fast'); // Mostro a DVI
                    $('#spinner').css('visibility','hidden'); // Oculta o modal spinner
                }
            }    

            // Enviando formulÃ¡rio com AJAX
            $.post({
                url: 'processa.php',
                data: {
                    nome : nome,
                    email : email,
                    assunto : assunto,
                    mensagem : mensagem
                },
                success: enviadoComSucesso,
                dataType: 'text'
            });

        // Se ocorreram erros no preenchimento...
        } else {
            // Formata mensagem de erro a ser exibida
            out = `
<big><b>Oooops!</b></big>
<p>Ocorreram erros que impedem o envio do seu contato:</p>
<ul>${erro}</ul>
<p>Por favor, verifique o formulÃ¡rio e tente enviar novamente.</p>
            `;
            $('#erromsg').html(out); // Escreve mensagem de erro no documento
            $('#errocaixa').show('fast'); // Exibe a mensagem de erro
        }

        // Reabilita botÃ£o de envio
        $('#contato_enviar').attr("disabled", false);

        // Nunca enviar o form pelo HTML se o JavaScript estÃ¡ ativo
        return false;
    });

    // Fecha caixa de erro ao clicar nela (ou no botÃ£o 'times')
    $(document).on('click', '#errocaixa', function(){
        $(this).hide('fast');
    });

    // Monitora, exibe e coluta a ajuda dos campos
    $(document).on('click', '.ajudaBtn', function(){
        // ObtÃ©m atributo extra de cada botÃ£o, que aponta para o texto da ajuda correspondente
        var emQuem = $(this).attr('data-target');

        // Mostra/oculta ajuda do campo
        $('#'+emQuem).toggle('fast');
    });

}

// Executar aplicativo principal
$(document).ready(startApp);