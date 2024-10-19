import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Biblioteca de ícones
import Navbar from './Navbar';
import { FontAwesome5 } from '@expo/vector-icons';

const ItemDetalhes = ({ route, navigation }) => {
  const { item } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      {/* Botão para voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.flex}>
        <View style={styles.infoContainer}>
        {item.foto ? (
          typeof item.foto === 'string' && item.foto.startsWith('file://') ? (
            <Image source={{ uri: item.foto }} style={styles.image} />
          ) : (
            <Image source={item.foto} style={styles.image} />
          )
        ) : null}

        <Text style={styles.title}>{item.nome}</Text>
        <Text style={styles.description}>{item.descricao || 'Sem descrição disponível.'}</Text>
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>Latitude: {item.latitude}</Text>
          <Text style={styles.locationText}>Longitude: {item.longitude}</Text>
        </View>
        </View>
        <View style={styles.actionsBox}>
          <Text style={styles.title}>Ações</Text>
          <View style={styles.buttonsBox}>
            <TouchableOpacity style={styles.detailsButton}>
              <Text style={styles.detailsButtonText}>Adotar</Text>
              <FontAwesome5 style={styles.iconText} name="paw" size={15} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.detailsButton}>
              <Text style={styles.detailsButtonText}>Favoritar</Text>
              <FontAwesome5 style={styles.iconText} name="heart" size={15} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.detailsButton}>
              <Text style={styles.detailsButtonText}>Encontrado</Text>
              <FontAwesome5 style={styles.iconText} name="check" size={15} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Navbar */}
      <Navbar style={{ zIndex: 2 }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8', // Cor de fundo suave
    padding: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 10,
  },
  imageContainer: {
    backgroundColor: '#ffffff', // Fundo separado para a imagem
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 15, // Aproximando a imagem do texto
  },
  image: {
    width: 250,
    height: 200,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    alignSelf: 'center',
    marginBottom: 30, // Espaçamento entre a imagem e o título
  },
  flex: {
/*     flex: 1,
    justifyContent: 'center',
    marginBottom: 200, */ // Espaçamento entre o conteúdo e a Navbar
  },
  infoContainer: {
    backgroundColor: '#ffffff', // Cor de fundo dos detalhes
    borderRadius: 15,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20, // Espaçamento entre o conteúdo e a Navbar
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15, // Ajuste de margem inferior para melhorar o espaçamento
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  locationText: {
    fontSize: 14,
    color: '#444',
  },
  actionsBox: {
    backgroundColor: '#ffffff', // Cor de fundo dos detalhes
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20, // Espaçamento entre o conteúdo e a Navbar
  },
  buttonsBox: {
/*     flexDirection: 'row',
    justifyContent: 'space-around',
    justifyContent: 'center',
    alignItems: 'center', */
  },
  detailsButton: {
    marginTop: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  detailsButtonText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  iconText: {
    marginLeft: 8,
    marginTop: 2,
  },
});

export default ItemDetalhes;
