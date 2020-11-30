import {
  Text,
  Box,
  Input,
  List,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react';
import React, {useState, useEffect} from 'react';

const Search: React.FC = () => {
  const [data, setData] = useState([
    {ticker: 'AAPL'},
    {ticker: 'PZZA'},
    {ticker: 'TSLA'},
  ]);
  const [query, setQuery] = useState('');
  const [heroes, setHeroes] = useState([]);

  const updateQuery = (input: string) => {
    setQuery(input);
    console.log('input', input);
  };

  return (
    <Box>
      <Input
        placeholder="Search a ticker"
        onChange={e => updateQuery(e.target.value)}
        value={query}
      />
    </Box>
  );
};

export default Search;
