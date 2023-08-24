import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';
import { useRoute, useNavigation } from '@react-navigation/native';

const Map = () => {
  const [markers, setMarkers] = useState([
    {
      id: 1,
      latitude: -29.150123,
      longitude: -51.167890,
      nome: "Charlie",
      foto: require('../assets/images/lost-animals/animal-1.jpeg'),
      descricao: "Nosso amado Charlie, um cachorro dourado de olhos curiosos, desapareceu durante um passeio no parque. Ajude-nos a trazer nosso amigo peludo de volta para casa! #EncontreCharlie #CachorroDesaparecido"
    },
    {
      id: 2,
      latitude: -29.155678,
      longitude: -51.163456,
      nome: "Luna",
      foto: require('../assets/images/lost-animals/animal-2.jpeg'),
      descricao: "Nossa adorável Luna, uma gata preta de olhos misteriosos, sumiu da nossa casa. Sua falta nos entristece, e qualquer informação é valiosa para reuni-la conosco! #OndeEstáLuna #GataDesaparecida"
    },
    {
      id: 3,
      latitude: -29.162345,
      longitude: -51.169876,
      nome: "Max",
      foto: require('../assets/images/lost-animals/animal-3.jpeg'),
      descricao: "Nosso querido Max, um cachorro border collie preto e branco, desapareceu enquanto brincava no quintal. Ajude-nos a trazer de volta toda a alegria que ele traz à nossa família! #EncontreMax #CachorroDesaparecido"
    },
    {
      id: 4,
      latitude: -29.159876,
      longitude: -51.162345,
      nome: "Mia",
      foto: require('../assets/images/lost-animals/animal-4.jpeg'),
      descricao: "Nossa gracinha Mia, uma gata siamesa de pelos elegantes e olhos azuis intensos, sumiu do nosso lar. Compartilhe e nos ajude a trazer de volta a graça aos nossos dias! #OndeEstáMia #GataDesaparecida"
    },
    {
      id: 5,
      latitude: -29.157890,
      longitude: -51.175432,
      nome: "Rocky",
      foto: require('../assets/images/lost-animals/animal-3.jpeg'),
      descricao: "Nosso destemido Rocky, um cachorro poodle toy branco, desapareceu após uma aventura. Sua coragem nos inspira; vamos encontrá-lo juntos! #EncontreRocky #CachorroDesaparecido"
    },
    {
      id: 6,
      latitude: -29.1687337,
      longitude: -51.1336682,
      nome: "Lola",
      foto: require('../assets/images/lost-animals/animal-2.jpeg'),
      descricao: "Nossa leal amiga Lola, uma gata persa com pelagem exuberante, sumiu sem deixar rastro. Sua presença é inestimável para nós; compartilhe para nos ajudar a reuni-la! #OndeEstáLola #GataDesaparecida"
    },
    {
      id: 7,
      latitude: -29.166543,
      longitude: -51.177890,
      nome: "Buddy",
      foto: require('../assets/images/lost-animals/animal-1.jpeg'),
      descricao: "Nosso parceiro de brincadeiras, Buddy, um cachorro labrador retriever, saiu para um passeio e não voltou. Compartilhe esta mensagem para trazer de volta nosso brincalhão! #EncontreBuddy #CachorroDesaparecido"
    },
    {
      id: 8,
      latitude: -29.153456,
      longitude: -51.164567,
      nome: "Nina",
      foto: require('../assets/images/lost-animals/animal-4.jpeg'),
      descricao: "Nossa curiosa Nina, uma gata maine coon de pelagem longa, desapareceu da nossa casa. Sua ausência nos deixa vazios; ajude-nos a trazer sua energia única de volta! #OndeEstáNina #GataDesaparecida"
    },
    {
      id: 9,
      latitude: -29.170987,
      longitude: -51.179876,
      nome: "Bailey",
      foto: require('../assets/images/lost-animals/animal-2.jpeg'),
      descricao: "Nosso amigo amigável Bailey, um cachorro golden retriever, desapareceu após um passeio. Sua simpatia é contagiante; vamos encontrá-lo e espalhar alegria novamente! #EncontreBailey #CachorroDesaparecido"
    },
    {
      id: 10,
      latitude: -29.156789,
      longitude: -51.168765,
      nome: "Sophie",
      foto: require('../assets/images/lost-animals/animal-1.jpeg'),
      descricao: "Nossa elegante Sophie, uma gata siamesa com uma postura única, sumiu de nossa casa. Sua graça nos cativa; vamos trazê-la de volta para seu lar! #OndeEstáSophie #GataDesaparecida"
    }
  ]
  );
  const route = useRoute();
  const markerRefs = useRef(markers?.map(() => React.createRef()) || []);
  const [isActive, setIsActive] = useState(1);
  const navigation = useNavigation();
  const handleDetailsButton = item => {
    // Navegar para a tela de detalhes com as informações do item
    navigation.navigate('ItemDetalhes', { item });
  };

  useEffect(() => {
    if (route.params?.teste && route.params.teste) {
      route.params.teste.id = markers.length + 1;
      setMarkers(prevMarkers => [...prevMarkers, route.params.teste]);
      markerRefs.current =  [...markerRefs.current, React.createRef()];
      navigation.setParams({teste: null});
    }
  }, [route.params?.teste]);
  
  const carouselRef = useRef(null); // Ref for the Carousel

  const handleMarkerDrag = (e, markerIndex) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMarkers(prevMarkers =>
      prevMarkers.map((m, index) =>
        index === markerIndex ? { ...m, latitude, longitude } : m
      )
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.carouselItem}>
      {item.foto ? 
        (typeof item.foto === 'string' && item.foto.startsWith('file://') ? 
        <Image source={{ uri: item.foto }} style={styles.image} /> 
        : <Image source={item.foto} style={styles.image} />) 
      : ''}
{/*       <Text>{`Id: ${item.id}`}</Text> */}
      <Text style={styles.highlightedName}>{`${item.nome}`}</Text>
      <Text>{`${item.descricao.length > 50 ? item.descricao.slice(0, 50) + '...' : item.descricao}`}</Text>
      <TouchableOpacity
        style={styles.detailsButton}
        onPress={() => handleDetailsButton(item)}>
        <Text style={styles.detailsButtonText}>Detalhes</Text>
      </TouchableOpacity>
    </View>
  );

  const handleSnapToItem = index => {
    const marker = markers[index];
    setIsActive(marker.id);
    markerRefs.current[index].current.showCallout()
    mapRef.current.animateToRegion(
      {
        latitude: marker.latitude,
        longitude: marker.longitude,
        latitudeDelta: 0.025,
        longitudeDelta: 0.025,
      },
      500
    );
  };


  const mapRef = useRef(null); // Ref for the MapView

  return (
    <View style={{ width: '100%', height: '90%', flex: 1 }}>
      <MapView
        style={{ width: '100%', height: '100%', flex: 1 }}
        ref={mapRef}
        pinColor={'green'}
        initialRegion={{
          latitude: markers[0].latitude,
          longitude: markers[0].longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {markers.map((marker, index) => (
          <Marker
            key={`${marker.id}-${isActive === marker.id ? 'active' : 'inactive'}`}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={marker.nome}
            ref={markerRefs.current[index]}
            pinColor={isActive === marker.id ? 'blue' : 'red'}
            draggable
            onDragEnd={(e) => handleMarkerDrag(e, index)}
            onPress={() => {
              setIsActive(marker.id);
              carouselRef.current.snapToItem(index); // Snap to the selected marker's index
            }}
          />
        ))}
      </MapView>
      <View style={styles.carouselContainer}>
        <Carousel
          ref={carouselRef}
          data={markers}
          renderItem={renderItem}
          sliderWidth={400}
          itemWidth={225}
          onSnapToItem={handleSnapToItem}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    position: 'absolute',
    bottom: 100,
    backgroundColor: 'transparent',
    alignItems: 'center',
    alignSelf: 'center',
  },
  carouselItem: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    borderColor: 'lightgray',
    borderWidth: 1,
    elevation: 3,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  detailsButton: {
    marginTop: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 5,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: 'white',
    fontSize: 14,
  },
  
  highlightedName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 3,
    textAlign: 'center',
  },
  
  selectedMarker: {
    backgroundColor: 'blue',
  },
});

export default Map;
