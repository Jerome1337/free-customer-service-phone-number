import React from 'react';

import { Typography } from 'antd';
import { Link as ReactRouterLink } from 'react-router-dom';

import { Layout, QuestionBlock } from '@components';

type Question = {
  title: string;
  paragraphs: React.ReactElement[];
};

type Questions = Question[];

const { Link, Paragraph } = Typography;

const questions: Questions = [
  {
    title: 'Quel est le but ?',
    paragraphs: [
      <Paragraph>L&apos;objectif est des recenser les numéros non surtaxés des services clients.</Paragraph>,
      <Paragraph>
        Depuis quelques années les entreprises sont obligées de fournir un numéro de téléphone non surtaxé à leurs
        clients.
      </Paragraph>,
      <Paragraph>
        Ce site a donc pour but de recenser les différents numéros de téléphones gratuit afin de constituer une base de
        données claire et compréhensible pour tous.
      </Paragraph>,
    ],
  },
  {
    title: 'Vous ne trouvez pas un numéro ?',
    paragraphs: [
      <Paragraph>
        Si un numéro ou une entreprise n&apos;est pas renseigné, deux solutions s&apos;offrent à vous.
      </Paragraph>,
      <Paragraph>
        Vous connaissez un numéro, contactez moi en m&apos;envoyant les informations nécessaires afin que j&apos;ajoute
        le ou les numéros dans la base de données.
      </Paragraph>,
      <Paragraph>
        Vous ne connaissez pas le numéro, dans ce cas attendez que le numéro soit proposé et ajouté par un autre
        utilisateur. La base de données est régulièrement mise à jour afin de fournir le maximum de numéros possible.
      </Paragraph>,
    ],
  },
  {
    title: 'Vous rencontrez un bug ?',
    paragraphs: [
      <Paragraph>
        En cas de bug veuillez me contacter afin que je résolve au plus vite le problème. Pour se faire rendez vous sur
        la page{' '}
        <ReactRouterLink to='/contact' title='Lien vers la page contact'>
          contact
        </ReactRouterLink>{' '}
        afin de trouver les informations de contacts.
      </Paragraph>,
    ],
  },
  {
    title: 'Comment contribuer ?',
    paragraphs: [
      <Paragraph>
        Si vous souhaîtez faire évoluer le site ou la base de données c&apos;est assez simple, il suffit de créer une
        &quot;pull request&quot; sur le{' '}
        <Link href='https://github.com/Jerome1337/free-customer-service-phone-number' title='Lien vers le dépôt GitHub'>
          dépôt GitHub
        </Link>{' '}
        contenant tout le code du projet.
      </Paragraph>,
      <Paragraph>
        Tout le projet est Open Source et n&apos;importe qui peut y contribuer en proposant sa contribution. Je me
        chargerais ensuite de mettre à jour le site Internet.
      </Paragraph>,
    ],
  },
  {
    title: 'Comment me contacter ?',
    paragraphs: [
      <Paragraph>
        Les informations de contact sont disponibles sur la page{' '}
        <ReactRouterLink to='/contact' title='Lien vers la page contact'>
          contact
        </ReactRouterLink>
      </Paragraph>,
    ],
  },
];

const Faq: React.VFC = (): React.ReactElement => (
  <Layout title='FAQ'>
    {questions.map(
      (question: Question): React.ReactElement => (
        <QuestionBlock key={question.title.replace(' ', '-').toLowerCase()} question={question.title}>
          {question.paragraphs}
        </QuestionBlock>
      )
    )}
  </Layout>
);

export default Faq;
