import {
  Box,
  Button,
  Skeleton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tooltip,
  useColorMode,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import React, {useMemo, useState} from 'react';
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
  const [currentDuration, setCurrentDuration] = useState(duration);

  const {data, loading} = useGetInstrumentHistoryQuery({
    variables: {
      symbol: symbol as string,
      duration: currentDuration,
    },
  });

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
    theme: {
      mode: colorMode,
      palette: 'palette1',
    },
    title: {
      text: (symbol as string).toUpperCase(),
      align: 'center',
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
      },
    },
    grid: {
      show: true,
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
    colors: ['#00B5D8'],
    theme: {
      mode: colorMode,
      palette: 'palette1',
    },
    chart: {
      id: 'chart2',
      stacked: false,
      type: 'area',
      toolbar: {
        autoSelected: 'pan',
      },
    },
    title: {
      text: `Daily close for 
        ${(symbol as string).toUpperCase()}`,
      align: 'center',
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
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
      strokeDashArray: 2,
      position: 'back',
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: colorMode,
        shadeIntensity: 1,
        opacityFrom: 0.2,
        opacityTo: 0.5,
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
    colors: ['#00B5D8'],
    theme: {
      mode: colorMode,
      palette: 'palette1',
    },
    chart: {
      id: 'chart1',
      type: 'bar',
      brush: {
        target: 'chart2',
        enabled: true,
      },
      selection: {
        enabled: true,
        fill: {
          color: '#00B5D8',
          opacity: 0.2,
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
    grid: {
      show: true,
      strokeDashArray: 2,
      position: 'back',
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

  function getButtonBGColor(duration: string): string {
    if (colorMode === 'dark')
      return currentDuration === duration ? 'cyan.700' : 'gray.700';
    else return currentDuration === duration ? 'cyan.200' : 'gray.100';
  }

  function renderDurationButton(duration: string) {
    return (
      <Tooltip
        label={`Last ${duration} data`}
        aria-label={`Last ${duration} data`}
      >
        <Button
          onClick={() => setCurrentDuration(duration)}
          ml={2}
          bg={getButtonBGColor(duration)}
          color={colorMode === 'dark' && 'white'}
        >
          {duration}
        </Button>
      </Tooltip>
    );
  }

  return (
    <>
      <Tabs variant="soft-rounded" colorScheme="cyan" borderRadius="md" py={4}>
        <TabList>
          <Tab textColor={colorMode === 'dark' && 'white'}>Price & Volume</Tab>
          <Tab textColor={colorMode === 'dark' && 'white'}>Candlestick </Tab>
          {renderDurationButton('1M')}
          {renderDurationButton('3M')}
          {renderDurationButton('6M')}
          {renderDurationButton('1Y')}
          {renderDurationButton('2Y')}
          {renderDurationButton('5Y')}
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
