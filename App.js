import React, { useState, Suspense } from 'react';
import { StyleSheet, Text, AsyncStorage, View, TextInput, Button, Image } from 'react-native';  

export default function App() {
  const [value, setValue] = useState('');
  const [sum, setSum] = useState(0);

  async function ValueSum () {
    try {
      const value = await AsyncStorage.getItem('resultado');
      let result = value - sum;

      var fixedResult = result.toFixed(2);
      var fixedResult2 = parseFloat(fixedResult);

      if (fixedResult2 <= 0) {
        setValue(0); 
        alert("Não é possível gastar mais nada!"); 
      } else if (fixedResult2 > 0) {
        AsyncStorage.setItem('resultado', JSON.stringify(fixedResult2));
        let GetValue =  await AsyncStorage.getItem('resultado');
        setValue(GetValue); 
      }
    } 
    catch (error) {
      alert(error);
    }
  }

  function saveData () {
    try {
      let Value = value;
      AsyncStorage.setItem('value', Value);
      AsyncStorage.setItem('resultado', Value);

      alert(`Valor máximo de: R$${Value}, adicionado!`);
    } 
    catch (error) {
      alert(error);
    }
  }

  async function SeeWallet () {
    let Value = await AsyncStorage.getItem('resultado');
    alert(`Total de: R$${Value}`);
  }

  async function SeeMaxValue () {
    try{
      let Value = await AsyncStorage.getItem('value');
      alert("Valor máximo de: " + "R$" + Value);
    }
    catch (error) {
      alert(error)
    }
 }
  
  return (  
    <>
      <View style={styles.container}> 
        <View style={{top: 150, right: 20}}>
          <Text style={styles.text}>Defina um valor máximo: </Text>
            <TextInput placeholder="R$" style={styles.inputStyle} onChangeText={setValue}/>
            <Text style={{ fontSize: 30, left: 80, top: -30, color: '#fff'}}> R${value} </Text>
        </View>
        <View style={{top: 100}}>
          <View style={styles.button}> 
              <Button color="white" title="Adicionar valor máximo" onPress={saveData}></Button>
          </View>
          <View style={styles.btnSum}> 
              <Button color="white" title="+" onPress={ValueSum}></Button>
          </View>
          <View style={styles.btnVerMaxVal}> 
              <Button color="white" title="Ver valor máximo" onPress={SeeMaxValue}></Button>
          </View>
          <View style={styles.btnVerFundos}> 
              <Button color="white" title="Ver carteira!" onPress={SeeWallet}></Button>
          </View>
          <TextInput placeholder="R$" style={styles.inputAdd} onChangeText={setSum}/> 
        </View>
       
        
      </View>  
     
  </>      
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    backgroundColor: '#8B10AE',
    paddingBottom: 500
  },

  inputStyle: {   
    margin: 15,
    width: 65,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    color: 'blue', 
    textDecorationColor: 'black',
    top: -45,
    left: 240,
    backgroundColor: '#fff',
  },

  text: { 
    fontSize: 20,
    fontStyle: 'italic',
    color: '#fff',
    right: 0
  },
  
  button: {
    top:105,
    backgroundColor: 'blue',
    padding: 5,
    marginLeft: 100, 
    marginRight: 100,
    borderRadius: 20,
    left: 5
  },

  btnSum: {
    top:-26,
    backgroundColor: 'blue',
    padding: 0,
    marginLeft: 100, 
    marginRight: 100,
    borderRadius: 20,
    left: 140,
    width: 50
  },

  image: {
    top: 0,
    left: -10,
  },

  MaxValuePosition: {
    top: 100,
    fontSize: 30,
    left: 40,
  },
  inputAdd: {
    top: -180,
    margin: 15,
    width: 80,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    left: 135,
    color: 'blue', 
    backgroundColor: '#fff'
  },
  
  btnVerMaxVal: {
    top:80,
    backgroundColor: 'blue',
    padding: 5,
    marginLeft: 100, 
    marginRight: 100,
    borderRadius: 20,
    left: 5
  },
  btnVerFundos: {
    top:100,
    backgroundColor: 'blue',
    padding: 5,
    marginLeft: 100, 
    marginRight: 100,
    borderRadius: 20,
    left: 5
  }

})
