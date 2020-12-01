import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import React, {useRef, useState} from 'react';
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
  const boundingBox = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const {title, labels, dataSets, width, height} = props;

  const dataSetDefaults = {
    fill: true,
    lineTension: 0.1,
    backgroundColor: 'rgba(75,192,192,0.4)',
    borderColor: 'rgba(75,192,192,1)',
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    pointBorderColor: 'rgba(75,192,192,1)',
    pointBackgroundColor: '#fff',
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
    pointHoverBorderColor: 'rgba(220,220,220,1)',
    pointHoverBorderWidth: 2,
    pointRadius: 1,
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
    onClick: () => {
      setIsOpen(true);
    },
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
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
            display: true,
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
        ref={boundingBox}
        _hover={{transform: 'translateY(-3px)', borderColor: 'cyan.300'}}
        borderWidth="1px"
        borderRadius="md"
        px={4}
        py={2}
        h={105}
      >
        <Line
          data={chartData}
          width={width}
          height={height}
          options={optionsDefault}
        />
      </Box>

      <Modal onClose={onClose} isOpen={isOpen} size={'xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Line data={chartData} options={optionsDefaultModal} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LineChart;
