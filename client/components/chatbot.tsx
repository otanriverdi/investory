import Head from 'next/head';
import {Box, useColorMode} from '@chakra-ui/react';
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

  const {colorMode} = useColorMode();
  let style: any;
  colorMode === 'light'
    ? (style = {
        '--df-messenger-bot-message': '#48cae4',
        '--df-messenger-button-titlebar-color': 'white',
        '--df-messenger-button-titlebar-font-color': '#48cae4',
        '--df-messenger-chat-background-color': 'white',
        '--df-messenger-font-color': 'white',
        '--df-messenger-send-icon': '#48cae4',
        '--df-messenger-user-message': '#0077b6',
      })
    : (style = {
        '--df-messenger-bot-message': '#7186a2',
        '--df-messenger-button-titlebar-color': 'white',
        '--df-messenger-button-titlebar-font-color': 'black',
        '--df-messenger-chat-background-color': '#2d3748',
        '--df-messenger-font-color': 'black',
        '--df-messenger-send-icon': '#48cae4',
        '--df-messenger-user-message': '#48cae4',
      });

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
          agent-id={process.env.NEXT_PUBLIC_AGENT_ID}
          language-code="en"
          style={style}
        ></df-messenger>
      </Box>
    </>
  );
};

export default IntegrateChatbot;
