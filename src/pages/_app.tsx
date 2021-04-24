import Header from '../components/Header';
import Player from '../components/Player';

import GlobalStyle from '../styles/global';
import { Container } from '../styles/appStyles';
import { PlayerContextProvider } from '../contexts/PlayerContext';

const MyApp = ({ Component, pageProps }) => {
  return (
    <PlayerContextProvider>
      <Container>
          <main>
            <Header />
            <Component {...pageProps} />
          </main>

          <Player />
          <GlobalStyle />
      </Container>
    </PlayerContextProvider>
  );
};

export default MyApp;
