import {
  Container,
  Content,
  EmptyPlayer,
  Progress,
  EmptySlider,
  Buttons,
} from './styles';

const Player: React.FC = () => {
  return (
    <Container>
      <Content>
        <header>
          <img src="/playing.svg" alt="Tocando agora" />
          <strong>Tocando agora</strong>
        </header>

        <EmptyPlayer>
          <strong>Selecione um podcast para ouvir</strong>
        </EmptyPlayer>

        <footer>
          <Progress>
            <span>00:00</span>
            <EmptySlider />
            <span>00:00</span>
          </Progress>

          <Buttons>
            <button type="button">
              <img src="/shuffle.svg" alt="Embaralhar" />
            </button>
            <button type="button">
              <img src="/play-previous.svg" alt="/Reproduzir anterior" />
            </button>
            <button type="button" className="playButton">
              <img src="/play.svg" alt="Reproduzir" />
            </button>
            <button type="button">
              <img src="play-next.svg" alt="Reproduzir próxima" />
            </button>
            <button type="button">
              <img src="/repeat.svg" alt="Repetir" />
            </button>
          </Buttons>
        </footer>
      </Content>
    </Container>
  );
};

export default Player;
