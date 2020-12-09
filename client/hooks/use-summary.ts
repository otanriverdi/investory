import {useToast} from '@chakra-ui/react';
import {useMemo} from 'react';
import {
  GetPositionsQuery,
  PositionState,
  PositionType,
} from '../graphql/generated/graphql';

const isToday = (someDate: Date) => {
  const today = new Date();

  return (
    someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
  );
};

export default function useSummary(
  data: GetPositionsQuery,
): {
  balance: number;
  daily: {amount: number; percentage: number};
  total: {amount: number; percentage: number};
} {
  const toast = useToast();

  const balance = useMemo(() => {
    let b = 0;

    if (data) {
      data.getPositions.forEach(position => {
        if (position.state === PositionState.Closed) {
          if (position.closePrice) {
            b += position.closePrice.price;
          } else {
            toast({
              title: `Error getting closing price for position ${position.id}.`,
              description: 'It will be ignored on your summary.',
              status: 'error',
              duration: 9000,
              isClosable: true,
              position: 'top',
            });
          }
        } else if (position.type === PositionType.Sell) {
          b += position.amount * position.price;
        } else {
          if (position.instrument.price) {
            b += position.amount * position.instrument.price.current;
          } else {
            toast({
              title: `Error getting current price for ${position.instrument.symbol}.`,
              description: 'It will be ignored on your summary.',
              status: 'error',
              duration: 9000,
              isClosable: true,
              position: 'top',
            });
          }
        }
      });
    }

    const fixed = b.toFixed(2);

    if (fixed.split('.')[1] !== '00') {
      b = Number(fixed);
    } else {
      b = Math.round(b);
    }

    return b;
  }, [data]);

  const daily = useMemo(() => {
    let amount = 0;
    let percentage = 0;

    if (data) {
      data.getPositions.forEach(position => {
        if (position.state === PositionState.Closed) {
          return;
        }

        if (isToday(new Date(position.date))) {
          // this is added today so can't have daily change
          return;
        }

        if (!position.instrument.price) {
          // this error is reported on the balance
          return;
        }

        const current = position.instrument.price.current;
        const yesterday = position.instrument.price.previous;

        let change = (current - yesterday) * position.amount;

        if (position.type === PositionType.Sell) {
          change = -change;
        }

        amount += change;
      });
    }

    const base = balance - amount;

    percentage = (amount * 100) / base;

    const fixedAmount = amount.toFixed(2);
    if (fixedAmount.split('.')[1] !== '00') {
      amount = Number(fixedAmount);
    } else {
      amount = Math.round(amount);
    }

    const fixedPercentage = percentage.toFixed(2);
    if (fixedPercentage.split('.')[1] !== '00') {
      percentage = Number(fixedPercentage);
    } else {
      percentage = Math.round(percentage);
    }

    return {amount, percentage};
  }, [data]);

  const total = useMemo(() => {
    let amount = 0;
    let percentage = 0;

    if (data) {
      data.getPositions.forEach(position => {
        if (position.state === PositionState.Closed) {
          return;
        }

        if (!position.instrument.price) {
          // this error is reported on the balance
          return;
        }

        const current = position.instrument.price.current;
        const open = position.price;

        let change = (current - open) * position.amount;

        if (position.type === PositionType.Sell) {
          change = -change;
        }

        amount += change;
      });
    }

    const base = balance - amount;

    percentage = (amount * 100) / base;

    const fixedAmount = amount.toFixed(2);
    if (fixedAmount.split('.')[1] !== '00') {
      amount = Number(fixedAmount);
    } else {
      amount = Math.round(amount);
    }

    const fixedPercentage = percentage.toFixed(2);
    if (fixedPercentage.split('.')[1] !== '00') {
      percentage = Number(fixedPercentage);
    } else {
      percentage = Math.round(percentage);
    }

    return {amount, percentage};
  }, [data]);

  return {balance, daily, total};
}
