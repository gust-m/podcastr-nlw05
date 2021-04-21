import Header from '../components/Header';
import Player from '../components/Player';

import GlobalStyle from '../styles/global';
import { Container } from '../styles/styles';

const MyApp = ({ Component, pageProps }) => {
  return (
    <Container>
      <main>
        <Header />
        <Component {...pageProps} />
      </main>

      <Player />
      <GlobalStyle />
    </Container>
  );
};

export default MyApp;
