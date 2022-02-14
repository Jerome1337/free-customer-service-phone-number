import React, { useEffect, useState } from 'react';

import { SearchOutlined } from '@ant-design/icons';
import { Input, Row, Tooltip, Typography } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { RootState } from '@store';
import { Number, Numbers, updateNumbers } from '@store/numbersSlice';

import Card from './Card';

const { Text } = Typography;

const StyledInput = styled(Input)`
  margin-bottom: 50px;
`;

const SearchEngine: React.VFC = (): React.ReactElement => {
  const numbers = useSelector((state: RootState) => state.numbers);
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [matchedValues, setMatchedValues] = useState<Numbers[]>([]);

  useEffect(() => {
    if (numbers.length === 0) {
      axios(process.env.REACT_APP_CLOUD_FUNCTION_CONVERTER_URL).then((results: AxiosResponse) =>
        dispatch(updateNumbers(results.data))
      );
    }
  }, [numbers]);

  useEffect(() => {
    if (searchValue !== null && searchValue !== '') {
      const match: Numbers[] = numbers.filter((entry) =>
        entry.name.toLowerCase().match(new RegExp(`^${searchValue.toLowerCase()}|${searchValue.toLowerCase()}.+`))
      );

      if (match.length > 0) {
        setMatchedValues(match);
      }
    }
  }, [searchValue]);

  return (
    <section>
      <StyledInput
        placeholder='Bouygues Telecom'
        size='large'
        suffix={
          <Tooltip title='Loupe de recherche'>
            <SearchOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
          </Tooltip>
        }
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchValue(event.target.value)}
      />

      {matchedValues.length > 0 && (
        <>
          <Text>
            {matchedValues.length} {matchedValues.length > 1 ? 'Entreprises trouvées' : 'Entreprise trouvée'}
          </Text>
          <div className='site-card-wrapper'>
            <Row gutter={[16, 16]}>
              {matchedValues.map((value: Numbers) =>
                value.free_numbers?.map((number: Number) => (
                  <Card
                    key={`${value.name.replace(' ', '-')}_${number.number}`}
                    name={value.name}
                    phoneNumber={number.number}
                    additionalInformations={number.additional_informations}
                  />
                ))
              )}
            </Row>
          </div>
        </>
      )}
    </section>
  );
};

export default SearchEngine;
