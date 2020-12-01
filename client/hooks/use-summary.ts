import {useMemo} from 'react';
import {useGetPositionsQuery} from '../graphql/generated/graphql';

export default function useSummary(): {
  balance: any;
  daily: any;
  total: any;
  loading: boolean;
} {
  const {loading, data} = useGetPositionsQuery();

  const balance = useMemo(() => {
    let b = 0;

    if (data) {
      data.getPositions.forEach(position => {
        b += position.amount * position.instrument.price.current;
      });
    }

    return +b.toFixed(2);
  }, [data]);

  const daily = useMemo(() => {
    let amount = 0;
    let percentage = 0;

    if (data) {
      data.getPositions.forEach(position => {
        const history = position.instrument.price.history;
        const current = position.instrument.price.current;

        const yesterday = history[history.length - 1];
        const change = +(current - yesterday).toFixed(2);

        amount = change * +position.amount;
        percentage = Math.abs(+((change * 100) / current).toFixed(2));
      });
    }

    console.log(amount);

    return {amount, percentage};
  }, [data]);

  const total = useMemo(() => {
    let amount = 0;
    let percentage = 0;

    if (data) {
      data.getPositions.forEach(position => {
        const current = position.instrument.price.current;
        const change = current - position.price;

        amount = +(change * position.amount).toFixed(2);
        percentage = Math.abs(+((change * 100) / current).toFixed(2));
      });
    }

    return {amount, percentage};
  }, [data]);

  return {balance, daily, total, loading};
}
