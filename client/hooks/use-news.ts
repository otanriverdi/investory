import {useToast} from '@chakra-ui/react';
import {useGetNewsForSymbolQuery} from '../graphql/generated/graphql';

export default function useNews(
  symbols: string[],
  last: number,
): {
  data: any;
  loading: boolean;
} | null {
  const toast = useToast();

  const {data, loading, error} = useGetNewsForSymbolQuery({
    variables: {
      symbols,
      last,
    },
  });
  if (error) {
    toast({
      title: `Error fetching news.`,
      description: 'They will not be displayed.',
      status: 'error',
      duration: 9000,
      isClosable: true,
      position: 'top',
    });
  }

  return {data: data?.getNewsForSymbol, loading};
}
