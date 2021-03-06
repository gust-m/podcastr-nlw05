import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';

import api from '../../services/api';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';

import { Container, ThumbnailContainer } from './styles';
import { useContext } from 'react';
import { PlayerContext } from '../../contexts/PlayerContext';

interface Episode {
  id: string,
  title: string,
  members: string,
  published_at: string,
  thumbnail: string,
  description:string,
  publishedAt: string;
  durationAsString: string,
  duration: number,
  url: string,
}

interface EpisodeProps {
  episode: Episode;
}


const Episode = ({ episode }: EpisodeProps)  => {
  const { play } = useContext(PlayerContext);
  return (
    <Container>
      <Head>
        <title>{episode.title} | Podcastr</title>
      </Head>
      <ThumbnailContainer>
        <Link href="/">
          <button type="button">
            <img src="/arrow-left.svg" alt="Voltar"/>
          </button>
        </Link>
        <Image
          width={700}
          height={160}
          src={episode.thumbnail}
          objectFit="cover"
        />

        <button type="button" onClick={() => play(episode)}>
          <img src="/play.svg" alt="Tocar episódio"/>
        </button>
      </ThumbnailContainer>

      <header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.publishedAt}</span>
        <span>{episode.durationAsString}</span>
      </header>

      <span dangerouslySetInnerHTML={{ __html: episode.description }} />

    </Container>
  );
}

export default Episode;

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc',
    }
  });

  const paths = data.map(episode => {
    return {
      params: {
        slug: episode.id
      }
    }
  })

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params;

  const { data } = await api.get(`/episodes/${slug}`);

  const episode = {
    ...data,
      publishedAt: format(parseISO(data.published_at), 'd MMM yy', {
        locale: ptBR,
      }),
      durationAsString: convertDurationToTimeString(Number(data.file.duration)),
      duration: Number(data.file.duration),
      url: data.file.url,
  }

  return {
    props: {
      episode,
    },
    revalidate: 60 * 60 * 24,
  }
}
