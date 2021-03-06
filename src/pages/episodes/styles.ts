import styled from 'styled-components';

export const Container = styled.div`
  max-width: 45rem;
  padding: 3rem 2rem;
  margin: 0 auto;

  header {
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--gray-100);

    h1 {
      margin-top: 2rem;
      margin-bottom: 1.5rem;
    }

    span {
      display: inline-block;
      font-size: 0.875rem;

      & + span {
        margin-left: 1rem;
        padding-left: 1rem;
        position: relative;


        &::before {
          content: '';
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 2px;
          left: 0;
          top: 50%;
          background: #ddd;
          transform: translate(-50%, -50%);
        }
      }
    }
  }

  > span {
    margin-top: 2rem;
    line-height: 1.675rem;
    color: var(--gray-800);

    p {
      margin: 1.5rem 0;
    }
  }
`;

export const ThumbnailContainer = styled.div`
  position: relative;

  img {
    border-radius: 1rem;
  }

  button {
    position: absolute;
    width: 3rem;
    height: 3rem;
    border-radius: 0.75rem;
    border: 0;
    z-index: 5;
    font-size: 0;
    transition: filter 0.2s;

    &:first-child {
      left: 0;
      top: 50%;
      background: var(--purple-500);
      transform: translate(-50%, -50%);
    }

    &:last-child {
      right: 0;
      top: 50%;
      background: var(--green-500);
      transform: translate(50%, -50%);
    }


    &:hover {
      filter: brightness(0.9)
    }
  }

`;
