import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalBody, Image, Text } from '@chakra-ui/react';

interface LoadingModalProps {
  isOpen: boolean;
  onClose: () => void;
  thumbnailUrl: string;
  title: string;
  country: string;
}

const loadingTitles = [
  'Shipping you off to {country} 🚀',
  '{country}, here we come! 🛬',
  'Next stop, {country}!',
];

const LoadingModal: React.FC<LoadingModalProps> = ({ isOpen, onClose, thumbnailUrl, title, country }) => {
  const randomTitle = React.useMemo(() => {
    const randomIndex = Math.floor(Math.random() * loadingTitles.length);
    return loadingTitles[randomIndex].replace('{country}', country);
  }, [country]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg="transparent" boxShadow="none">
        <ModalBody display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <Image
            src={thumbnailUrl || 'default-thumbnail.jpg'}
            alt={title}
            boxSize="200px"
            objectFit="cover"
            borderRadius="lg"
            mb={4}
            opacity={1}
          />
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="teal.700"
            textAlign="center"
            bg="teal.50"
            px={3}
            py={2}
            borderRadius="md"
            boxShadow="md"
          >
            {randomTitle}
          </Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoadingModal;