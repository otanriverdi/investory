import {useMemo} from 'react';
import {GetPositionsQuery, PositionState} from '../graphql/generated/graphql';

export default function useSummary(
  data: GetPositionsQuery,
): {
  balance: any;
  daily: any;
  total: any;
} {
  const balance = useMemo(() => {
    let b = 0;

    if (data) {
      data.getPositions.forEach(position => {
        if (position.state === PositionState.Closed) {
          b += position.closePrice.price;
        } else {
          b +=
            position.amount *
            (position.instrument.price
              ? position.instrument.price.current
              : position.price);
        }
      });
    }

    return +b.toFixed(2);
  }, [data]);

  const daily = useMemo(() => {
    let amount = 0;
    let percentage = 0;

    if (data) {
      const percentages = [];

      data.getPositions.forEach(position => {
        if (
          position.state !== PositionState.Closed &&
          position.instrument.price
        ) {
          const current = position.instrument.price.current;
          const yesterday = position.instrument.price.previous;
          const change = +(current - yesterday);

          amount = +(change * +position.amount).toFixed(2);

          percentages.push(Math.abs(+((change * 100) / current)));
        }
      });

      percentage = +(
        percentages.reduce((total, current) => total + current) /
        percentages.length
      ).toFixed(2);
    }

    return {amount, percentage};
  }, [data]);

  const total = useMemo(() => {
    let amount = 0;
    let percentage = 0;

    if (data) {
      const percentages = [];

      data.getPositions.forEach(position => {
        if (position.state !== PositionState.Closed) {
          const current = position.instrument.price
            ? position.instrument.price.current
            : position.price;
          const change = current - position.price;

          amount = +(change * position.amount).toFixed(2);
          percentages.push(Math.abs(+((change * 100) / current)));
        }
      });

      percentage = +(
        percentages.reduce((total, current) => total + current) /
        percentages.length
      ).toFixed(2);
    }

    return {amount, percentage};
  }, [data]);

  return {balance, daily, total};
}
