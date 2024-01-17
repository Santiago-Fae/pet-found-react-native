export const DataForMap = [
    {
      id: 1,
      latitude: -29.150123,
      longitude: -51.167890,
      nome: "Charlie",
      foto: require('../../assets/images/lost-animals/animal-1.jpeg'),
      descricao: "Nosso amado Charlie, um cachorro dourado de olhos curiosos, desapareceu durante um passeio no parque. Ajude-nos a trazer nosso amigo peludo de volta para casa! #EncontreCharlie #CachorroDesaparecido"
    },
    {
      id: 2,
      latitude: -29.155678,
      longitude: -51.163456,
      nome: "Luna",
      foto: require('../../assets/images/lost-animals/animal-2.jpeg'),
      descricao: "Nossa adorável Luna, uma gata preta de olhos misteriosos, sumiu da nossa casa. Sua falta nos entristece, e qualquer informação é valiosa para reuni-la conosco! #OndeEstáLuna #GataDesaparecida"
    },
    {
      id: 3,
      latitude: -29.162345,
      longitude: -51.169876,
      nome: "Max",
      foto: require('../../assets/images/lost-animals/animal-3.jpeg'),
      descricao: "Nosso querido Max, um cachorro border collie preto e branco, desapareceu enquanto brincava no quintal. Ajude-nos a trazer de volta toda a alegria que ele traz à nossa família! #EncontreMax #CachorroDesaparecido"
    },
    {
      id: 4,
      latitude: -29.159876,
      longitude: -51.162345,
      nome: "Mia",
      foto: require('../../assets/images/lost-animals/animal-4.jpeg'),
      descricao: "Nossa gracinha Mia, uma gata siamesa de pelos elegantes e olhos azuis intensos, sumiu do nosso lar. Compartilhe e nos ajude a trazer de volta a graça aos nossos dias! #OndeEstáMia #GataDesaparecida"
    },
    {
      id: 5,
      latitude: -29.157890,
      longitude: -51.175432,
      nome: "Rocky",
      foto: require('../../assets/images/lost-animals/animal-3.jpeg'),
      descricao: "Nosso destemido Rocky, um cachorro poodle toy branco, desapareceu após uma aventura. Sua coragem nos inspira; vamos encontrá-lo juntos! #EncontreRocky #CachorroDesaparecido"
    },
    {
      id: 6,
      latitude: -29.1687337,
      longitude: -51.1336682,
      nome: "Lola",
      foto: require('../../assets/images/lost-animals/animal-2.jpeg'),
      descricao: "Nossa leal amiga Lola, uma gata persa com pelagem exuberante, sumiu sem deixar rastro. Sua presença é inestimável para nós; compartilhe para nos ajudar a reuni-la! #OndeEstáLola #GataDesaparecida"
    },
    {
      id: 7,
      latitude: -29.166543,
      longitude: -51.177890,
      nome: "Buddy",
      foto: require('../../assets/images/lost-animals/animal-1.jpeg'),
      descricao: "Nosso parceiro de brincadeiras, Buddy, um cachorro labrador retriever, saiu para um passeio e não voltou. Compartilhe esta mensagem para trazer de volta nosso brincalhão! #EncontreBuddy #CachorroDesaparecido"
    },
    {
      id: 8,
      latitude: -29.153456,
      longitude: -51.164567,
      nome: "Nina",
      foto: require('../../assets/images/lost-animals/animal-4.jpeg'),
      descricao: "Nossa curiosa Nina, uma gata maine coon de pelagem longa, desapareceu da nossa casa. Sua ausência nos deixa vazios; ajude-nos a trazer sua energia única de volta! #OndeEstáNina #GataDesaparecida"
    },
    {
      id: 9,
      latitude: -29.170987,
      longitude: -51.179876,
      nome: "Bailey",
      foto: require('../../assets/images/lost-animals/animal-2.jpeg'),
      descricao: "Nosso amigo amigável Bailey, um cachorro golden retriever, desapareceu após um passeio. Sua simpatia é contagiante; vamos encontrá-lo e espalhar alegria novamente! #EncontreBailey #CachorroDesaparecido"
    },
    {
      id: 10,
      latitude: -29.156789,
      longitude: -51.168765,
      nome: "Sophie",
      foto: require('../../assets/images/lost-animals/animal-1.jpeg'),
      descricao: "Nossa elegante Sophie, uma gata siamesa com uma postura única, sumiu de nossa casa. Sua graça nos cativa; vamos trazê-la de volta para seu lar! #OndeEstáSophie #GataDesaparecida"
    }
  ];

  const fetchDogImages = async () => {
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random/10');
      const data = await response.json();
  
      if (response.ok) {
        const newAnimalsData = data.message.map((imageUrl, index) => ({
          id: index + 1,
          latitude: -29.150123 + index * 0.01,
          longitude: -51.167890 + index * 0.01,
          nome: `Dog ${index + 1}`,
          foto: { uri: imageUrl },
          descricao: `Este é o Dog ${index + 1}, um cão muito adorável. #EncontreDog${index + 1} #CachorroDesaparecido`,
        }));
  
        // Substituir as fotos no array existente
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
  
  // Chame a função para fazer a requisição e substituir as imagens no array
  fetchDogImages();
  export const DataForOngs = [
    
]
