interface WhatsAppMessage {
  from: string;
  id: string;
  timestamp: string;
  text?: { body: string };
  type: string;
  interactive?: {
    type: string;
    button_reply?: { id: string; title: string };
    list_reply?: { id: string; title: string };
  };
}

interface MessageMetadata {
  display_phone_number: string;
  phone_number_id: string;
}

interface SendMessageResponse {
  messaging_product: string;
  contacts: Array<{ input: string; wa_id: string }>;
  messages: Array<{ id: string }>;
}

export class WhatsAppService {
  private readonly baseUrl = 'https://graph.facebook.com/v18.0';
  private readonly phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID!;
  private readonly accessToken = process.env.WHATSAPP_ACCESS_TOKEN!;

  async sendTextMessage(to: string, text: string): Promise<SendMessageResponse> {
    const response = await fetch(
      `${this.baseUrl}/${this.phoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to,
          type: 'text',
          text: { body: text },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`WhatsApp API error: ${JSON.stringify(error)}`);
    }

    return response.json();
  }

  async sendTemplateMessage(
    to: string,
    templateName: string,
    components: any[]
  ): Promise<SendMessageResponse> {
    const response = await fetch(
      `${this.baseUrl}/${this.phoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to,
          type: 'template',
          template: {
            name: templateName,
            language: { code: 'it' },
            components,
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`WhatsApp API error: ${JSON.stringify(error)}`);
    }

    return response.json();
  }

  async sendInteractiveMessage(
    to: string,
    body: string,
    buttons: Array<{ id: string; title: string }>
  ): Promise<SendMessageResponse> {
    const response = await fetch(
      `${this.baseUrl}/${this.phoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to,
          type: 'interactive',
          interactive: {
            type: 'button',
            body: { text: body },
            action: {
              buttons: buttons.map((btn) => ({
                type: 'reply',
                reply: { id: btn.id, title: btn.title },
              })),
            },
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`WhatsApp API error: ${JSON.stringify(error)}`);
    }

    return response.json();
  }

  async processIncomingMessage(
    message: WhatsAppMessage,
    metadata: MessageMetadata
  ): Promise<void> {
    console.log(`Incoming WhatsApp from ${message.from}:`, message);

    if (message.type === 'text' && message.text?.body) {
      const text = message.text.body.toLowerCase().trim();

      // Simple intent detection
      if (text.includes('prenot') || text.includes('sì') || text.includes('si') || text === '1') {
        await this.sendTextMessage(
          message.from,
          '✅ Perfetto! La tua prenotazione è confermata. Ti aspettiamo stasera! 🍽️'
        );
      } else if (text.includes('no') || text.includes('magari') || text.includes('non')) {
        await this.sendTextMessage(
          message.from,
          'Nessun problema! Ti terremo in mente per la prossima volta. A presto! 😊'
        );
      } else {
        // Forward to AI for handling
        console.log('Forwarding to AI agent:', text);
      }
    }

    if (message.type === 'interactive' && message.interactive?.button_reply) {
      const buttonId = message.interactive.button_reply.id;
      if (buttonId.startsWith('book_')) {
        await this.sendTextMessage(
          message.from,
          '✅ Prenotazione confermata! Ti aspettiamo questa sera. 🍽️'
        );
      }
    }
  }
}
