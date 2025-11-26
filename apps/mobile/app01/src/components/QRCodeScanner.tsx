import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import {Camera, CameraType} from 'react-native-camera-kit';
import {constants} from '@/constants';

type Props = {
  visible: boolean;
  onClose: () => void;
  onScan: (data: string) => void;
};

export const QRCodeScanner: React.FC<Props> = ({visible, onClose, onScan}) => {
  const [scanned, setScanned] = useState(false);

  const handleBarcodeScan = (event: any) => {
    if (scanned) return;
    
    setScanned(true);
    const data = event.nativeEvent.codeStringValue;
    
    if (data) {
      onScan(data);
      // Reset scanned state after a delay
      setTimeout(() => {
        setScanned(false);
        onClose();
      }, 500);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>QRコードをスキャン</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cameraContainer}>
          <Camera
            cameraType={CameraType.Back}
            scanBarcode={true}
            onReadCode={handleBarcodeScan}
            style={styles.camera}
            showFrame={true}
            laserColor={constants.colors.redColor}
            frameColor={constants.colors.redColor}
          />
        </View>

        <View style={styles.instructions}>
          <Text style={styles.instructionText}>
            QRコードをカメラの中央に合わせてください
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    paddingBottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    ...constants.typography.Roboto_Regular,
  },
  closeButton: {
    padding: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  instructions: {
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  instructionText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    ...constants.typography.Roboto_Regular,
  },
});
