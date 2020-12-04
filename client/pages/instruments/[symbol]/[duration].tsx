import {
  Box,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';
import React, {useMemo} from 'react';
import {useGetInstrumentHistoryQuery} from '../../../graphql/generated/graphql';

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const InstrumentHistory: React.FC = () => {
  const router = useRouter();
  const {symbol, duration} = router.query;

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
      minDate: volumeData[Math.abs(volumeData.length - 100)][0],
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
      borderColor: '#bbbbbb',
      strokeDashArray: 2,
      position: 'back',
    },
    // TODO: Color
    plotOptions: {
      // candlestick: {
      //   colors: {
      //     upward: 'cyan',
      //     downward: 'tomato'
      //   }
      // }
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

  function showSpinner() {
    return (
      loading && (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="cyan.500"
          size="xl"
        />
      )
    );
  }

  return (
    <>
      <Tabs
        variant="soft-rounded"
        colorScheme="cyan"
        borderWidth="1px"
        borderRadius="lg"
        padding="6px"
        _selected={{color: 'white', bg: 'cyan.300'}}
      >
        <TabList>
          <Tab>Price & Volume</Tab>
          <Tab>Candlestick </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Box>
              <div>
                {showSpinner()}
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
            {showSpinner()}
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
