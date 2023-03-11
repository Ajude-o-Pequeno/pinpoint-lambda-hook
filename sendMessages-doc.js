var params = {
  ApplicationId: 'STRING_VALUE', /* required */
  MessageRequest: { /* required */
    MessageConfiguration: { /* required */
      DefaultMessage: {
        Body: 'STRING_VALUE',
        Substitutions: {
          '<__string>': [
            'STRING_VALUE',
            /* more items */
          ],
          /* '<__string>': ... */
        }
      },
      DefaultPushNotificationMessage: {
        Action: OPEN_APP | DEEP_LINK | URL,
        Body: 'STRING_VALUE',
        Data: {
          '<__string>': 'STRING_VALUE',
          /* '<__string>': ... */
        },
        SilentPush: true || false,
        Substitutions: {
          '<__string>': [
            'STRING_VALUE',
            /* more items */
          ],
          /* '<__string>': ... */
        },
        Title: 'STRING_VALUE',
        Url: 'STRING_VALUE'
      },
      EmailMessage: {
        Body: 'STRING_VALUE',
        FeedbackForwardingAddress: 'STRING_VALUE',
        FromAddress: 'STRING_VALUE',
        RawEmail: {
          Data: Buffer.from('...') || 'STRING_VALUE' /* Strings will be Base-64 encoded on your behalf */
        },
        ReplyToAddresses: [
          'STRING_VALUE',
          /* more items */
        ],
        SimpleEmail: {
          HtmlPart: {
            Charset: 'STRING_VALUE',
            Data: 'STRING_VALUE'
          },
          Subject: {
            Charset: 'STRING_VALUE',
            Data: 'STRING_VALUE'
          },
          TextPart: {
            Charset: 'STRING_VALUE',
            Data: 'STRING_VALUE'
          }
        },
        Substitutions: {
          '<__string>': [
            'STRING_VALUE',
            /* more items */
          ],
          /* '<__string>': ... */
        }
      },
      SMSMessage: {
        Body: 'STRING_VALUE',
        EntityId: 'STRING_VALUE',
        Keyword: 'STRING_VALUE',
        MediaUrl: 'STRING_VALUE',
        MessageType: TRANSACTIONAL | PROMOTIONAL,
        OriginationNumber: 'STRING_VALUE',
        SenderId: 'STRING_VALUE',
        Substitutions: {
          '<__string>': [
            'STRING_VALUE',
            /* more items */
          ],
          /* '<__string>': ... */
        },
        TemplateId: 'STRING_VALUE'
      }
    },
    Addresses: {
      '<__string>': {
        BodyOverride: 'STRING_VALUE',
        ChannelType: PUSH | GCM | APNS | APNS_SANDBOX | APNS_VOIP | APNS_VOIP_SANDBOX | ADM | SMS | VOICE | EMAIL | BAIDU | CUSTOM | IN_APP,
        Context: {
          '<__string>': 'STRING_VALUE',
          /* '<__string>': ... */
        },
        RawContent: 'STRING_VALUE',
        Substitutions: {
          '<__string>': [
            'STRING_VALUE',
            /* more items */
          ],
          /* '<__string>': ... */
        },
        TitleOverride: 'STRING_VALUE'
      },
      /* '<__string>': ... */
    },
    Context: {
      '<__string>': 'STRING_VALUE',
      /* '<__string>': ... */
    },
    Endpoints: {
      '<__string>': {
        BodyOverride: 'STRING_VALUE',
        Context: {
          '<__string>': 'STRING_VALUE',
          /* '<__string>': ... */
        },
        RawContent: 'STRING_VALUE',
        Substitutions: {
          '<__string>': [
            'STRING_VALUE',
            /* more items */
          ],
          /* '<__string>': ... */
        },
        TitleOverride: 'STRING_VALUE'
      },
      /* '<__string>': ... */
    },
    TemplateConfiguration: {
      EmailTemplate: {
        Name: 'STRING_VALUE',
        Version: 'STRING_VALUE'
      },
      PushTemplate: {
        Name: 'STRING_VALUE',
        Version: 'STRING_VALUE'
      },
      SMSTemplate: {
        Name: 'STRING_VALUE',
        Version: 'STRING_VALUE'
      },
      VoiceTemplate: {
        Name: 'STRING_VALUE',
        Version: 'STRING_VALUE'
      }
    },
    TraceId: 'STRING_VALUE'
  }
};
pinpoint.sendMessages(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});