import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from '@react-navigation/native';

export default function ProfileButton() {
  const navigation = useNavigation();
  return (
    <View style={[styles.buttonContainer]}>
      <Pressable
        style={[styles.button, { backgroundColor: "#fff" }]}
        onPress={() => navigation.navigate('Ongs')}
      >
        <FontAwesome
          name="user"
          size={18}
          color="#fff"
          style={styles.buttonIcon}
        />
      </Pressable>
  </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 40,
    height: 40,
    backgroundColor: '#df7f04',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    padding: 10,
    zIndex: 10,
    borderColor: '#fff',
    borderWidth: 1,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    elevation: 30,
  },
  buttonIcon: {
    color: '#fff',
    backgroundColor: '#df7f04',
  },
});
