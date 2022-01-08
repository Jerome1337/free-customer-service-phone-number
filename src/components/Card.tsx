import React from 'react';

import { InfoCircleOutlined, PhoneOutlined } from '@ant-design/icons';
import { Card as AntDesignCard, Col, Typography } from 'antd';
import PropTypes from 'prop-types';

type CardProps = {
  name: string;
  phoneNumber: string;
  additionalInformations?: string;
};

const { Link, Paragraph } = Typography;

const Card: React.VFC<CardProps> = ({ name, phoneNumber, additionalInformations = 'N/A' }): React.ReactElement => (
  <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} xl={{ span: 6 }} xxl={{ span: 4 }}>
    <AntDesignCard title={name}>
      <Paragraph type='secondary'>
        <InfoCircleOutlined title='Informations Additonelles' /> {additionalInformations}
      </Paragraph>
      <Link href={`tel:${phoneNumber}`} title={`Appeller le ${phoneNumber}`}>
        <PhoneOutlined /> {phoneNumber}
      </Link>
    </AntDesignCard>
  </Col>
);

Card.propTypes = {
  name: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  additionalInformations: PropTypes.string,
};

Card.defaultProps = {
  additionalInformations: 'N/A',
};

export default Card;
