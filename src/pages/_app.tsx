import Header from '../components/Header';
import Player from '../components/Player';

import GlobalStyle from '../styles/global';
import { Container } from '../styles/appStyles';
import { PlayerContext } from '../contexts/PlayerContext';
import { useState } from 'react';
import Episode from './episodes/[slug]';

const MyApp = ({ Component, pageProps }) => {
  const [episodeList, setEpisodeList] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);

  const play = (episode) => {
    console.log(episode);
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  const toggle = () => {
    setIsPlaying(!isPlaying);
  }

  const statePlaying = (state: boolean) => {
    setIsPlaying(state);
  }

  return (
    <Container>
      <PlayerContext.Provider
        value={
          {
            episodeList,
            currentEpisodeIndex,
            isPlaying,
            play,
            toggle,
            statePlaying,
          }
        }>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>

        <Player />
        <GlobalStyle />
      </PlayerContext.Provider>
    </Container>
  );
};

export default MyApp;
