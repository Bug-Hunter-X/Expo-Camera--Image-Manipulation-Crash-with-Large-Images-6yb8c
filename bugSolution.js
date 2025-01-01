// bugSolution.js
import * as ImageManipulator from 'expo-image-manipulator';
import { Camera } from 'expo-camera';
import React, { useState, useRef } from 'react';

const App = () => {
  const [image, setImage] = useState(null);
  const cameraRef = useRef(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        // Resize the image before manipulation
        const resizedPhoto = await ImageManipulator.manipulateAsync(
          photo.uri,
          [{ resize: { width: 600 } }],
          { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
        );
        setImage(resizedPhoto.uri);
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };

  return (
    <View>
      <Camera style={{ flex: 1 }} ref={cameraRef}>
        <Button title="Take Picture" onPress={takePicture} />
      </Camera>
      {image && <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />}
    </View>
  );
};

export default App;