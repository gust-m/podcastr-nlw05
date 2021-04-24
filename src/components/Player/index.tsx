import Image from 'next/image';
import { useContext, useEffect, useRef, useState } from 'react';
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
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';

const Player: React.FC = () => {
  const {
    currentEpisodeIndex,
    episodeList,
    isPlaying,
    togglePlaying,
    statePlaying,
    playNext,
    playPrevious,
    hasNext,
    isLooping,
    toggleLooping,
    hasPrevious,
    isShuffling,
    toggleShuffling,
    clearPlayerState,
  } = useContext(PlayerContext);

  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);

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

  const setupProgressListener = () => {
    audioRef.current.currentTime = 0;

    audioRef.current.addEventListener('timeupdate', () => {
      setProgress(Math.floor(audioRef.current.currentTime));
    })
  }

  const handleSeek = (amount: number) => {
    audioRef.current.currentTime = amount;
    setProgress(amount);
  }

  const handleEpisodeEnded = () => {
    if (hasNext) {
      playNext();
    } else {
      clearPlayerState();
    }
  }

  return (
    <Container>
      <Content>
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
          <Progress empty={!episode}>
            <span>{convertDurationToTimeString(progress)}</span>
            <SliderBox>
              { episode ? (
                <Slider
                  max={episode.duration}
                  value={progress}
                  onChange={handleSeek}
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
            <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
          </Progress>

          {episode && (
            <audio
              src={episode.url}
              autoPlay
              loop={isLooping}
              ref={audioRef}
              onPlay={() => statePlaying(true)}
              onPause={() => statePlaying(false)}
              onLoadedMetadata={setupProgressListener}
              onEnded={handleEpisodeEnded}
            />
          )}

          <Buttons
            isActiveLooping={isLooping}
            isActiveShuffling={isShuffling}
          >
            <button
              type="button"
              disabled={!episode || episodeList.length === 1}
              onClick={toggleShuffling}
            >
              <img src="/shuffle.svg" alt="Embaralhar" />
            </button>
            <button type="button" disabled={!episode || !hasPrevious} onClick={playPrevious}>
              <img src="/play-previous.svg" alt="/Reproduzir anterior" />
            </button>
            <button
              type="button"
              className="playButton"
              disabled={!episode}
              onClick={togglePlaying}
            >
              <img src={isPlaying ? "/pause.svg" :  "/play.svg"} alt="Reproduzir" />
            </button>
            <button type="button" disabled={!episode || !hasNext} onClick={playNext}>
              <img src="/play-next.svg" alt="Reproduzir próxima"/>
            </button>
            <button type="button" disabled={!episode} onClick={toggleLooping}>
              <img src="/repeat.svg" alt="Repetir" />
            </button>
          </Buttons>
        </footer>
      </Content>
    </Container>
  );
};

export default Player;
