import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Alert} from 'react-native';
import {constants} from '@/constants';
import {components} from '@/components';

type Props = {
  completedStamps?: number; // Number of stamps earned (0-20)
};

export const StampCard: React.FC<Props> = ({completedStamps = 0}) => {
  const [showScanner, setShowScanner] = useState(false);
  const screenWidth = Dimensions.get('window').width;
  const cellSize = (screenWidth - 60) / 5; // 5 columns with padding

  const handleScan = (data: string) => {
    Alert.alert(
      'QRコード読み取り成功',
      `読み取ったデータ:\n${data}`,
      [
        {
          text: 'OK',
          onPress: () => setShowScanner(false),
        },
      ]
    );
  };
  
  const renderStampCell = (index: number) => {
    const isCompleted = index < completedStamps;
    
    return (
      <View
        key={index}
        style={[
          styles.stampCell,
          {
            width: cellSize,
            height: cellSize,
            backgroundColor: isCompleted 
              ? constants.colors.redColor 
              : constants.colors.lightGrayColor,
          }
        ]}
      >
        <Text style={[
          styles.stampText,
          {color: isCompleted ? 'white' : constants.colors.textColor}
        ]}>
          {isCompleted ? '✓' : index + 1}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>スタンプカード</Text>
      <Text style={styles.subtitle}>
        {completedStamps}/20 スタンプ獲得
      </Text>
      
      <View style={styles.gridContainer}>
        {Array.from({length: 20}, (_, index) => renderStampCell(index))}
      </View>
      
      <Text style={styles.rewardText}>
        20個集めると特別な商品がもらえます！
      </Text>

      <components.Button
        title="QRコードを読み取る"
        onPress={() => setShowScanner(true)}
        style={styles.scanButton}
      />

      <components.QRCodeScanner
        visible={showScanner}
        onClose={() => setShowScanner(false)}
        onScan={handleScan}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: constants.colors.mainDarkColor,
    ...constants.typography.Roboto_Regular,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: constants.colors.textColor,
    ...constants.typography.Roboto_Regular,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  stampCell: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: constants.colors.lightGrayColor,
  },
  stampText: {
    fontSize: 16,
    fontWeight: 'bold',
    ...constants.typography.Roboto_Regular,
  },
  rewardText: {
    fontSize: 14,
    textAlign: 'center',
    color: constants.colors.redColor,
    fontWeight: 'bold',
    ...constants.typography.Roboto_Regular,
  },
  scanButton: {
    marginTop: 20,
    backgroundColor: constants.colors.redColor,
  },
});