import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorMode,
  Skeleton,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import React, {useMemo} from 'react';
import {useGetInstrumentHistoryQuery} from '../../graphql/generated/graphql';

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

type HistoryProp = {
  symbol: string;
  duration: string;
};

const InstrumentHistory: React.FC<HistoryProp> = props => {
  const {symbol, duration} = props;
  const {colorMode} = useColorMode();

  const {data, loading, error} = useGetInstrumentHistoryQuery({
    variables: {
      symbol: symbol as string,
      duration: duration as string,
    },
  });

  if (error) {
    console.warn(`Error fetching history for symbol: ${symbol}: ${error}`);
  }

  const {
    volumeData,
    priceChartData,
    candlestickData,
    zoomRange,
  } = useMemo(() => {
    const volumeData = [];
    const priceChartData = [];
    const candlestickData = [];

    data?.getInstrumentHistory.forEach(d => {
      priceChartData.push([dayjs(d.date).valueOf(), d.close]);
      volumeData.push([dayjs(d.date).valueOf(), d.volume]);
      candlestickData.push({
        x: dayjs(d.date).valueOf(),
        y: [d.open, d.high, d.low, d.close],
      });
    });

    const zoomRange = volumeData.length && {
      minDate:
        volumeData[
          volumeData.length - 100 < 0 ? 0 : volumeData.length - 100
        ][0],
      maxDate: volumeData[volumeData.length - 1][0],
    };

    return {volumeData, priceChartData, candlestickData, zoomRange};
  }, [data]);

  const candleStickOptions = {
    title: {
      text: `Candlestick for 
        ${(symbol as string).toUpperCase()}`,
      align: 'center',
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#263263',
      },
    },
    grid: {
      show: true,
      borderColor: '#263263',
      strokeDashArray: 2,
      position: 'back',
    },
    xaxis: {
      type: 'datetime',
      tickAmount: 20,
    },
    yaxis: {
      tickAmount: 20,
      labels: {
        formatter: function (val) {
          return val.toFixed(2);
        },
      },
    },
  };

  const priceChartOptions = {
    chart: {
      id: 'chart2',
      stacked: false,
      type: 'area',
      foreColor: '#263263',
      toolbar: {
        autoSelected: 'pan',
      },
    },
    title: {
      text: `Historical daily closing price for 
        ${(symbol as string).toUpperCase()}`,
      align: 'center',
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#263263',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 3,
    },
    grid: {
      show: true,
      borderColor: '#bbbbbb',
      strokeDashArray: 2,
      position: 'back',
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.2,
        opacityTo: 0.7,
        stops: [0, 100],
      },
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      tickAmount: 20,
      labels: {
        formatter: function (val) {
          return val.toFixed(2);
        },
      },
    },
  };

  const volumeChartOptions = {
    chart: {
      id: 'chart1',
      type: 'bar',
      foreColor: '#263263',
      brush: {
        target: 'chart2',
        enabled: true,
      },
      selection: {
        enabled: true,
        fill: {
          color: 'teal',
          opacity: 0.4,
        },
        xaxis: {
          min: zoomRange.minDate,
          max: zoomRange.maxDate,
        },
      },
    },
    stroke: {
      width: 2,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      enabled: true,
    },
    xaxis: {
      type: 'datetime',
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      tickAmount: 2,
    },
  };

  return (
    <>
      <Tabs variant="soft-rounded" colorScheme="cyan" borderRadius="md" py={4}>
        <TabList>
          <Tab textColor={colorMode === 'dark' && 'white'}>Price & Volume</Tab>
          <Tab textColor={colorMode === 'dark' && 'white'}>Candlestick </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Box>
              <div>
                {loading && <Skeleton height={575} />}
                {data ? (
                  <>
                    <Chart
                      options={priceChartOptions}
                      series={[{name: 'Closing Price', data: priceChartData}]}
                      type="area"
                      height={500}
                    />
                    <Chart
                      options={volumeChartOptions}
                      series={[{name: 'Volume', data: volumeData}]}
                      type="bar"
                      height={100}
                    />
                  </>
                ) : (
                  !loading && <Box>{`No Data available for ${symbol}`}</Box>
                )}
              </div>
            </Box>
          </TabPanel>
          <TabPanel>
            {loading && <Skeleton height={575} />}
            {data ? (
              <Chart
                options={candleStickOptions}
                series={[{data: candlestickData}]}
                type="candlestick"
                height={600}
              />
            ) : (
              !loading && <Box>{`No Data available for ${symbol}`}</Box>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default InstrumentHistory;
