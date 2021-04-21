import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

import { HeaderContainer } from './styles';

const Header: React.FC = () => {
  const currentData = format(new Date(), 'EEEEEE, d MMMM', {
    locale: ptBR,
  });
  return (
    <HeaderContainer>
      <img src="/logo.svg" alt="Podcastr" />
      <p>O melhor para você ouvir, sempre</p>
      <span>{currentData}</span>
    </HeaderContainer>
  );
};

export default Header;
