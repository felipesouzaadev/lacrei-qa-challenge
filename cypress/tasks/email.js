const { ImapFlow } = require("imapflow");
const { simpleParser } = require("mailparser");

const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function procurarLink(client, destinatario) {
  const lock = await client.getMailboxLock("INBOX");

  try {
    const totalMensagens = client.mailbox.exists;

    console.log(
      `[E-MAIL][DEBUG] Total de mensagens na INBOX: ${totalMensagens}`,
    );

    if (!totalMensagens) {
      return null;
    }

    // Busca somente as 50 mensagens mais recentes da INBOX
    // Busca mensagens recentes destinadas especificamente ao e-mail criado no teste
    const desde = new Date(Date.now() - 30 * 60 * 1000);

    const uids = await client.search(
      {
        since: desde,
        from: "suporte.staging@lacreisaude.com.br",
        subject: "Confirme sua conta na Lacrei Saúde",
      },
      {
        uid: true,
      },
    );

    console.log(
      `[E-MAIL][DEBUG] E-mails de confirmação encontrados: ${uids.length}`,
    );

    if (!uids.length) {
      return null;
    }

    const ultimosUids = uids.slice(-30);

    const mensagens = await client.fetchAll(
      ultimosUids.join(","),
      {
        envelope: true,
        source: true,
        internalDate: true,
      },
      {
        uid: true,
      },
    );

    console.log(
      `[E-MAIL][DEBUG] Mensagens encontradas para ${destinatario}: ${uids.length}`,
    );

    if (!uids.length) {
      return null;
    }

    console.log(
      `[E-MAIL][DEBUG] Últimas mensagens carregadas: ${mensagens.length}`,
    );

    const destinatarioEsperado = destinatario.toLowerCase();

    // Começa da mensagem mais recente
    for (let i = mensagens.length - 1; i >= 0; i--) {
      const mail = await simpleParser(mensagens[i].source);

      const destinatarios =
        mail.to?.value
          ?.map((item) => item.address?.toLowerCase())
          .filter(Boolean) || [];

      const deliveredTo =
        mail.headers?.get("delivered-to")?.toString()?.toLowerCase() || "";

      const originalTo =
        mail.headers?.get("x-original-to")?.toString()?.toLowerCase() || "";

      const correspondeAoDestinatario =
        destinatarios.includes(destinatarioEsperado) ||
        deliveredTo.includes(destinatarioEsperado) ||
        originalTo.includes(destinatarioEsperado);

      if (!correspondeAoDestinatario) {
        continue;
      }

      console.log("[E-MAIL][DEBUG] E-mail correspondente encontrado.");

      console.log("[E-MAIL][DEBUG] Assunto:", mail.subject || "sem assunto");

      console.log(
        "[E-MAIL][DEBUG] Remetente:",
        mail.from?.text || "não informado",
      );

      const html = typeof mail.html === "string" ? mail.html : "";

      const texto = mail.text || "";

      const conteudo = `${html}\n${texto}`.replace(/&amp;/g, "&");

      // Extrai especificamente os links <a href="..."> do e-mail
      const anchors = [
        ...html.matchAll(
          /<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi,
        ),
      ];

      console.log(`[E-MAIL][DEBUG] Links <a> encontrados: ${anchors.length}`);

      // Procura especificamente o botão/link "Confirmar e-mail"
      const anchorConfirmacao = anchors.find((anchor) => {
        const textoDoLink = anchor[2]
          .replace(/<[^>]+>/g, " ")
          .replace(/\s+/g, " ")
          .trim()
          .toLowerCase();

        return (
          textoDoLink.includes("confirmar e-mail") ||
          textoDoLink.includes("confirmar email")
        );
      });

      if (anchorConfirmacao) {
        const linkConfirmacao = anchorConfirmacao[1]
          .replace(/&amp;/g, "&")
          .trim();

        console.log("[E-MAIL] Botão 'Confirmar e-mail' encontrado.");

        // Log seguro: mostra somente domínio + caminho, sem token/query string
        try {
          const urlSegura = new URL(linkConfirmacao);

          console.log(
            "[E-MAIL][DEBUG] Destino:",
            `${urlSegura.origin}${urlSegura.pathname}`,
          );
        } catch {
          console.log(
            "[E-MAIL][DEBUG] Link encontrado, mas não foi possível exibir o destino.",
          );
        }

        return linkConfirmacao;
      }

      // Fallback: caso a estrutura HTML do e-mail mude
      const links = conteudo.match(/https?:\/\/[^\s"'<>]+/g) || [];

      console.log(
        `[E-MAIL][DEBUG] Quantidade total de URLs encontradas: ${links.length}`,
      );

      const linkFallback = links
        .map((link) => link.replace(/&amp;/g, "&"))
        .find(
          (link) =>
            link.toLowerCase().includes("verificar-email") ||
            link.toLowerCase().includes("confirmar-email"),
        );

      if (linkFallback) {
        console.log("[E-MAIL] Link de verificação encontrado pelo fallback.");

        return linkFallback;
      }

      console.log(
        "[E-MAIL][DEBUG] E-mail encontrado, mas nenhum link de confirmação foi identificado.",
      );

      console.log(
        "[E-MAIL][DEBUG] E-mail encontrado, mas nenhum link de confirmação foi identificado.",
      );
    }

    return null;
  } finally {
    lock.release();
  }
}

async function obterLinkConfirmacao(destinatario) {
  const emailUsuario = process.env.CYPRESS_EMAIL_TESTE;
  const emailSenha = process.env.CYPRESS_EMAIL_APP_PASSWORD;

  if (!emailUsuario || !emailSenha) {
    throw new Error("Variáveis de e-mail não configuradas.");
  }

  const client = new ImapFlow({
    host: "imap.gmail.com",
    port: 993,
    secure: true,
    auth: {
      user: emailUsuario,
      pass: emailSenha,
    },
    logger: false,
  });

  try {
    await client.connect();

    // tenta durante aproximadamente 60 segundos
    for (let tentativa = 1; tentativa <= 36; tentativa++) {
      console.log(`[E-MAIL] Tentativa ${tentativa}/36 para ${destinatario}`);

      const link = await procurarLink(client, destinatario);

      if (link) {
        console.log("[E-MAIL] Link de verificação encontrado.");
        return link;
      }

      await esperar(5000);
    }

    throw new Error(
      `Não foi encontrado link de verificação para ${destinatario} após 180 segundos.`,
    );
  } catch (erro) {
    console.error("[E-MAIL] Falha ao buscar confirmação:");
    console.error("Mensagem:", erro.message);
    console.error("Código:", erro.code);
    console.error("Response status:", erro.responseStatus);
    console.error("Response code:", erro.responseCode);
    console.error("Response:", erro.response);
    console.error("Command:", erro.command);

    throw erro;
  } finally {
    if (client.usable) {
      await client.logout();
    }
  }
}

module.exports = {
  obterLinkConfirmacao,
};
