import React from 'react';

import { Divider } from 'antd';
import PropTypes from 'prop-types';

type QuestionBlockProps = {
  question: string;
};

const QuestionBlock: React.FC<QuestionBlockProps> = ({ question, children }): React.ReactElement => (
  <section>
    <Divider orientation='left' orientationMargin={0}>
      {question}
    </Divider>
    <div>{children}</div>
  </section>
);

QuestionBlock.propTypes = {
  question: PropTypes.string.isRequired,
};

export default QuestionBlock;
