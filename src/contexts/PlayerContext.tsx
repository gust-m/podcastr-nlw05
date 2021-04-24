import { createContext, ReactNode, useState } from 'react';

interface Episode {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

interface PlayerContextData {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  isLooping: boolean;
  isShuffling: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
  play: (episode: Episode) => void;
  playList: (list: Episode[], index: number) => void;
  playNext: () => void;
  playPrevious: () => void;
  statePlaying: (state: boolean) => void;
  togglePlaying: () => void;
  toggleLooping: () => void;
  toggleShuffling: () => void;
  clearPlayerState: () => void;
};

interface PlayerContextProviderProps {
  children: ReactNode;
}

export const PlayerContext = createContext({} as PlayerContextData);

export const PlayerContextProvider = ({ children }: PlayerContextProviderProps) => {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  const play = (episode: Episode) => {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  const playList = (list: Episode[], index: number) => {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  const togglePlaying = () => {
    setIsPlaying(!isPlaying);
  }

  const toggleLooping = () => {
    setIsLooping(!isLooping);
  }

  const toggleShuffling = () => {
    setIsShuffling(!isShuffling);
  }

  const statePlaying = (state: boolean) => {
    setIsPlaying(state);
  }

  const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length;
  const hasPrevious = currentEpisodeIndex > 0;

  const playNext = () => {
    if (isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length);
      setCurrentEpisodeIndex(nextRandomEpisodeIndex);
    } else if (hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    }
  }

  const playPrevious = () => {
    if (hasPrevious) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }
  }

  const clearPlayerState = () => {
    setEpisodeList([]);
    setCurrentEpisodeIndex(0);
  }

  return (
    <PlayerContext.Provider
      value={
        {
          episodeList,
          currentEpisodeIndex,
          isPlaying,
          play,
          playList,
          playNext,
          playPrevious,
          togglePlaying,
          statePlaying,
          hasNext,
          hasPrevious,
          isLooping,
          toggleLooping,
          isShuffling,
          toggleShuffling,
          clearPlayerState,
        }
      }>
        {children}
    </PlayerContext.Provider>
  )
}
