import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import React, {useState} from 'react';
import {Line} from 'react-chartjs-2';

type DataSet = {
  fill?: boolean;
  label: string;
  backgroundColor?: string;
  borderColor?: string;
  pointBorderColor?: string;
  pointBackgroundColor?: string;
  data: number[];
};

type ChartProp = {
  title: string;
  labels: string[];
  dataSets: DataSet[];
  width?: number;
  height: number;
};

const LineChart: React.FC<ChartProp> = (props: ChartProp) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const {title, labels, dataSets, width, height} = props;

  const dataSetDefaults = {
    fill: false,
    lineTension: 0.1,
    backgroundColor: 'rgba(0,181,216,1)',
    borderColor: 'rgba(0,181,216,1)',
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    pointBorderColor: 'rgba(0,181,216,1)',
    pointBackgroundColor: '#fff',
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: 'rgba(0,181,216,1)',
    pointHoverBorderColor: 'rgba(220,220,220,1)',
    pointHoverBorderWidth: 2,
    pointRadius: 0,
    pointHitRadius: 10,
  };

  const preparedDatasets = [];

  for (const dataSet of dataSets) {
    const preparedSet = Object.assign({}, dataSetDefaults, dataSet);
    preparedDatasets.push(preparedSet);
  }

  const chartData = {
    title: title,
    labels: labels,
    datasets: preparedDatasets,
  };

  const optionsDefault = {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    tooltips: {
      enabled: false,
    },
    hover: {mode: null},
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            display: false,
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
            drawOnChartArea: false,
          },
          ticks: {
            display: false,
          },
        },
      ],
    },
  };

  const optionsDefaultModal = {
    legend: {
      display: true,
    },
    title: {
      display: true,
    },
  };

  return (
    <>
      <Box
        w={width}
        h={height}
        onClick={() =>
          dataSets.length && dataSets[0].data.length && setIsOpen(true)
        }
        cursor="pointer"
        _hover={{transform: 'translateY(-3px)', borderColor: 'cyan.500'}}
      >
        <Line data={chartData} options={optionsDefault} />
      </Box>

      <Modal onClose={onClose} isOpen={isOpen} size={'xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Line data={chartData} options={optionsDefaultModal} />
          </ModalBody>
          <ModalFooter>{''}</ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LineChart;
