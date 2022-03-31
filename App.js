
import { StyleSheet, Text, View, SafeAreaView, Image, FlatList } from 'react-native';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

const queryClient = new QueryClient();

const Item = ({item}) =>(
  <View style={styles.containerItem}>
    <View style={styles.containerImgItem}>
      <Image style={styles.imgItem} source={{uri:item.thumbnail.path+'.'+item.thumbnail.extension}}/>
    </View>
    <View style={styles.containerInformacao}>
      <Text style={[styles.textInformacao, styles.nameInformcao]}>{item.name}</Text>
      <Text style={styles.textInformacao}>{item.description}</Text>
    </View>
  </View>
)

function List(){
  const renderItem = ({item}) =>(
    <Item item={item}/>
  )

  const timestamp = 1648686385;
  const publicKey = 'e6bfab6af1f8bca939ff7a896a034479';
  const privateKey = 'deaa6e5b84e89678c333de9e0329e05a7171e14d';
  const hash = '26f1c8206ba930dbc65331f13e1f9084';

  const { isLoading, error, data } = useQuery('repoData', () =>
    fetch(`https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hash}&limit=6`)
      .then(res =>
        res.json()
      )
    );

  if (isLoading) return (<Text style={{color: '#fff'}}>{'loading'}</Text>);
 
  if (error) return (<Text>{error}</Text>);

  return (
    <View>
      <FlatList
        data={data.data.results}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <QueryClientProvider client={queryClient}>
        <List/>
      </QueryClientProvider>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15072C',
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerItem:{
    width: '90%',
    backgroundColor: '#2A1154',
    padding: 10,
    margin: 'auto',
    marginBottom: 15,
    borderRadius: 5,
    flexDirection: 'row'
  },
  containerImgItem:{
    width: 100,
    height: 100
  },
  imgItem:{
    width: '100%',
    height: '100%',
    borderRadius: 5 ,
    borderColor: '#fff',
    borderWidth: 2,
    resizeMode: 'stretch'
  },
  containerInformacao:{
    paddingHorizontal: 10,
    flexGrow: 1,
    flex: 1,
  },
  textInformacao:{
    color: '#fff',
  },
  nameInformcao:{
    fontWeight: '800'
  }
});
