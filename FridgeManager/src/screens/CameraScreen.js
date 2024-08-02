import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log(data);
    const keyId = '83f4fb11863a4176af34';
    const serviceId = 'I2570';
    const dataType = 'json';
    const startIdx = 1;
    const endIdx = 5;
    const BAR_CD = String(data);
    const url = `http://openapi.foodsafetykorea.go.kr/api/${keyId}/${serviceId}/${dataType}/${startIdx}/${endIdx}/BAR_CD=${BAR_CD}`;

    axios.get(url)
    .then(response => {
      setName(response.data.C005.row[0].PRDLST_NM)
      console.log(name);
      setConDate(response.data.C005.row[0].PRDLST_DCNM);
      console.log("소비기한: " + conDate);

      navigator.navigate("Info", {name:name, conDate:conDate})
    })
    .catch(error => {
      console.error('Error making the API request:', error);
    });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default CameraScreen;