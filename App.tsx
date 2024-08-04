import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, KeyboardAvoidingView } from 'react-native'
import React, { useState, PropsWithChildren } from 'react'
import { currencyData } from './public/currencyData.ts';


export default function App() {

  const [amount, setAmount] = useState('0');
  const[isAmountConverted, setIsAmountConverted] = useState(false);
  const[convertedAmount, setConvertedAmount] = useState('0');
 
  type currencyBtnProps = PropsWithChildren<{
    currencyName: string,
    countryFlag: string,
    conversionRateToINR: number,
    symbol: string
  }>

  const handleSubmit = (conversionRate: number, symbol: string) => {
    if (amount === '' || isNaN(Number(amount))) {
      setConvertedAmount('0');
      setIsAmountConverted(true);
      return;
    }

    const tempAmount = (+amount / conversionRate).toFixed(2);
    setConvertedAmount(`${symbol} ${tempAmount}`);
    setIsAmountConverted(true);

  }

  const CurrencyButton = ({ currencyName, countryFlag, conversionRateToINR, symbol}: currencyBtnProps): JSX.Element => {
    return (
      <TouchableOpacity style={styles.currencyBtn} onPress={() => handleSubmit(conversionRateToINR, symbol)}>
        <Text style={styles.countryFlag}>{countryFlag}</Text>
        <Text style={styles.currencyName}>{currencyName}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <ScrollView  contentContainerStyle={styles.container}>
    {
      isAmountConverted ? (
        <View>
          <Text style={styles.convertedAmount}>{convertedAmount} 🤑</Text>
        </View>
      ): 
      null
    }

      <View style={styles.inputForm}>
        <Text style={styles.rupeeSign}>₹</Text>
        <TextInput onChangeText={setAmount} style={styles.amountInput} keyboardType='numeric' />
      </View>
      <View style={styles.currencyBtnContainer}>
        {
          currencyData.map((currency: any, index: number): JSX.Element => (
            <CurrencyButton key={index} {...currency}/>
          ))
        }
      </View>
  
    </ScrollView>

  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: 50

  },
  
  convertedAmount: {
    fontSize: 30,
    color: "white"
  },

  inputForm: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: "row",
    gap: 10,

  },

  rupeeSign: {
    fontSize: 30,
    color: "white"
  },

  amountInput: {
    backgroundColor: "white",
    color: "black",
    width: 200,
    fontSize: 20,
    borderRadius: 10
  },

  currencyBtnContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: 'center',
    alignItems: "center",
    gap: 20,
  },

  currencyBtn: {
    backgroundColor: "white",
    width: 110,
    height: 80,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",


  },


  countryFlag: {
    fontSize: 32
  },

  currencyName: {
    color: "black",
    textTransform: 'uppercase',
    textAlign: "center",
    fontSize: 12

  }
})