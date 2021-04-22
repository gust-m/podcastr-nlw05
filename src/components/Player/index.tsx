import Image from 'next/image';
import { useContext, useEffect, useRef } from 'react';
import Slider from 'rc-slider';

import { PlayerContext } from '../../contexts/PlayerContext';

import 'rc-slider/assets/index.css';
import {
  Container,
  Content,
  CurrentEpisode,
  EmptyPlayer,
  Progress,
  SliderBox,
  EmptySlider,
  Buttons,
} from './styles';

const Player: React.FC = () => {
  const {
    currentEpisodeIndex,
    episodeList,
    isPlaying,
    toggle,
    statePlaying
  } = useContext(PlayerContext);

  const audioRef = useRef<HTMLAudioElement>(null);

  const episode = episodeList[currentEpisodeIndex];

  useEffect(() => {
    if(!audioRef.current) {
      return;
    }

    if (!isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  }, [isPlaying]);

  return (
    <Container>
      <Content empty={!episode}>
        <header>
          <img src="/playing.svg" alt="Tocando agora" />
          <strong>Tocando agora</strong>
        </header>

        { episode ? (
          <CurrentEpisode>
            <Image
              width={592}
              height={592}
              src={episode.thumbnail}
              objectFit="cover"
            />

            <strong>{episode.title}</strong>
            <span>{episode.members}</span>
          </CurrentEpisode>
        ) : (
          <EmptyPlayer>
            <strong>Selecione um podcast para ouvir</strong>
          </EmptyPlayer>
        )}

        <footer>
          <Progress>
            <span>00:00</span>
            <SliderBox>
              { episode ? (
                <Slider
                  trackStyle={{ background: '#04d361' }}
                  railStyle={{ background: '#9f75ff' }}
                  handleStyle={
                    { borderColor: '#04d361', borderWidth: 4 }
                  }
                />
              ) : (
                <EmptySlider />
              )}
            </SliderBox>
            <span>00:00</span>
          </Progress>

          {episode && (
            <audio
              src={episode.url}
              autoPlay
              ref={audioRef}
              onPlay={() => statePlaying(true)}
              onPause={() => statePlaying(false)}
            />
          )}

          <Buttons>
            <button type="button" disabled={!episode}>
              <img src="/shuffle.svg" alt="Embaralhar" />
            </button>
            <button type="button" disabled={!episode}>
              <img src="/play-previous.svg" alt="/Reproduzir anterior" />
            </button>
            <button
              type="button"
              className="playButton"
              disabled={!episode}
              onClick={toggle}
            >
              <img src={isPlaying ? "pause.svg" :  "/play.svg"} alt="Reproduzir" />
            </button>
            <button type="button" disabled={!episode}>
              <img src="play-next.svg" alt="Reproduzir próxima"/>
            </button>
            <button type="button" disabled={!episode}>
              <img src="/repeat.svg" alt="Repetir" />
            </button>
          </Buttons>
        </footer>
      </Content>
    </Container>
  );
};

export default Player;
