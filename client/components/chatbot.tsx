import Head from 'next/head';
import {Box} from '@chakra-ui/react';
import React from 'react';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'df-messenger': any;
    }
  }
}

type Props = {
  balance?: number;
};

const IntegrateChatbot: React.FC<Props> = ({balance}) => {
  let intent: string;
  if (balance < 0) intent = 'Welcome-Low';
  else if (balance > 0) intent = 'Welcome-High';
  else if (balance === 0) intent = 'Welcome-0';

  return (
    <>
      <Head>
        <script src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"></script>
        <meta
          name="viewport"
          content="width-device-width, initial-scale=1"
        ></meta>
      </Head>
      <Box>
        <df-messenger
          intent={intent}
          chat-title="AJÖN"
          chat-icon="https://thumbs.dreamstime.com/b/ai-robot-head-chat-bot-icon-isolated-white-background-ai-robot-head-chat-bot-icon-109860127.jpg"
          // agent-id={process.env.AGENT_ID} --->> This needs to come from the .env file
          agent-id="8fb3ca3f-7ef3-41fc-bb8f-0b984512a855"
          language-code="en"
          style={{
            '--df-messenger-bot-message': '#48cae4',
            '--df-messenger-button-titlebar-color': 'white',
            '--df-messenger-button-titlebar-font-color': '#48cae4',
            '--df-messenger-chat-background-color': 'white',
            '--df-messenger-font-color': 'white',
            '--df-messenger-send-icon': '#48cae4',
            '--df-messenger-user-message': '#0077b6',
          }}
        ></df-messenger>
      </Box>
    </>
  );
};

export default IntegrateChatbot;
