import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { List } from 'react-native-paper';

const AlertComponent = ({closeAlert}) => {
  const handlePressClose = () => {
    // Chama a função closeAlert ao pressionar o ícone de fechar
    closeAlert();
  };

  return (
    <TouchableOpacity
      style={{ position: 'absolute', top: 80, width: '100%', padding: 10 }}
      onPress={handlePressClose}
    >
      <List.Item
        title="Hirmes"
        titleStyle={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}
        description="Novo cachorro perdido na sua região!"
        descriptionStyle={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}
        style={styles.listItem}
        left={(props) => (
          <List.Icon
            {...props}
            icon="alert"
            color="#ffb81f"
            style={{
              backgroundColor: 'white',
              marginLeft: 10,
              marginTop: 2,
              borderRadius: 50,
              padding: 5,
              height: 37,
            }}
          />
        )}
        right={() => (
          <List.Icon
            icon="close"
            color="white"
            onPress={handlePressClose}
          />
        )}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'left',
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: 'white',
    fontweight: 'bold',
  },
  listItem: {
    backgroundColor: '#ffb81f',
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    color: 'green',
    borderRadius: 10,
  },
});

export default AlertComponent;

