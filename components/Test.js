import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const DogImage = () => {
  const [dogImageUrl, setDogImageUrl] = useState('');

  useEffect(() => {
    const fetchDogImage = async () => {
      try {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        const data = await response.json();

        if (response.ok) {
          setDogImageUrl(data.message);
        } else {
          console.error('Error fetching dog image:', data.message);
        }
      } catch (error) {
        console.error('Error fetching dog image:', error);
      }
    };

    fetchDogImage();
  }, []);

  return (
    <View style={styles.container}>
      {dogImageUrl ? (
        <Image source={{ uri: dogImageUrl }} style={styles.image} />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 8,
    marginBottom: 20,
  },
});

export default DogImage;
