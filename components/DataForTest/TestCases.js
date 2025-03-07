export const DataForMap = [
  {
    id: 1,
    latitude: 49.2847,
    longitude: -123.1297,
    nome: "Charlie",
    foto: require('../../assets/images/lost-animals/animal-1.jpeg'),
    descricao: "Our beloved Charlie, a golden dog with curious eyes, disappeared during a walk in the park. Help us bring our furry friend back home! #FindCharlie #LostDog"
  },
  {
    id: 2,
    latitude: 49.2827,
    longitude: -123.1187,
    nome: "Luna",
    foto: require('../../assets/images/lost-animals/animal-2.jpeg'),
    descricao: "Our adorable Luna, a black cat with mysterious eyes, went missing from our home. We miss her dearly, and any information is valuable to reunite her with us! #WhereIsLuna #LostCat"
  },
  {
    id: 3,
    latitude: 49.2802,
    longitude: -123.1207,
    nome: "Max",
    foto: require('../../assets/images/lost-animals/animal-3.jpeg'),
    descricao: "Our dear Max, a black and white border collie dog, disappeared while playing in the yard. Help us bring back all the joy he brings to our family! #FindMax #LostDog"
  },
  {
    id: 4,
    latitude: 49.2807,
    longitude: -123.1297,
    nome: "Mia",
    foto: require('../../assets/images/lost-animals/animal-4.jpeg'),
    descricao: "Our darling Mia, a Siamese cat with elegant fur and intense blue eyes, went missing from our home. Share and help us bring back the grace to our days! #WhereIsMia #LostCat"
  },
  {
    id: 5,
    latitude: 49.2732,
    longitude: -123.1252,
    nome: "Rocky",
    foto: require('../../assets/images/lost-animals/animal-3.jpeg'),
    descricao: "Our fearless Rocky, a white toy poodle dog, disappeared after an adventure. His courage inspires us; let's find him together! #FindRocky #LostDog"
  },
  {
    id: 6,
    latitude: 49.2807,
    longitude: -123.1257,
    nome: "Lola",
    foto: require('../../assets/images/lost-animals/animal-2.jpeg'),
    descricao: "Our loyal friend Lola, a Persian cat with lush fur, went missing without a trace. Her presence is invaluable to us; share to help us reunite her! #WhereIsLola #LostCat"
  },
  {
    id: 7,
    latitude: 49.2787,
    longitude: -123.1167,
    nome: "Buddy",
    foto: require('../../assets/images/lost-animals/animal-1.jpeg'),
    descricao: "Our playmate Buddy, a Labrador Retriever dog, went for a walk and didn't return. Share this message to bring back our playful friend! #FindBuddy #LostDog"
  },
  {
    id: 8,
    latitude: 49.2877,
    longitude: -123.1337,
    nome: "Nina",
    foto: require('../../assets/images/lost-animals/animal-4.jpeg'),
    descricao: "Our curious Nina, a Maine Coon cat with long fur, went missing from our home. Her absence leaves us empty; help us bring her unique energy back! #WhereIsNina #LostCat"
  },
  {
    id: 9,
    latitude: 49.2857,
    longitude: -123.1357,
    nome: "Bailey",
    foto: require('../../assets/images/lost-animals/animal-2.jpeg'),
    descricao: "Our friendly Bailey, a Golden Retriever dog, disappeared after a walk. His friendliness is contagious; let's find him and spread joy again! #FindBailey #LostDog"
  },
  {
    id: 10,
    latitude: 49.2837,
    longitude: -123.1257,
    nome: "Sophie",
    foto: require('../../assets/images/lost-animals/animal-1.jpeg'),
    descricao: "Our elegant Sophie, a Siamese cat with a unique posture, went missing from our home. Her grace captivates us; let's bring her back to her home! #WhereIsSophie #LostCat"
  }
];

const fetchDogImages = async () => {
  try {
    const response = await fetch('https://dog.ceo/api/breeds/image/random/10');
    const data = await response.json();

    if (response.ok) {
      const newAnimalsData = data.message.map((imageUrl, index) => ({
        id: index + 1,
        latitude: 49.2827 + index * 0.01,
        longitude: -123.1207 + index * 0.01,
        nome: `Dog ${index + 1}`,
        foto: { uri: imageUrl },
        descricao: `This is Dog ${index + 1}, a very adorable dog. #FindDog${index + 1} #LostDog`,
      }));

      // Replace the fotos in the existing array
      DataForMap.forEach((animal, index) => {
        animal.foto = newAnimalsData[index].foto;
      });
    } else {
      console.error('Error fetching dog images:', data.message);
    }
  } catch (error) {
    console.error('Error fetching dog images:', error);
  }
};

// Call the function to make the request and replace the images in the array
fetchDogImages();
export const DataForOngs = [

];
