import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  AsyncStorage,
  TextInput,
  ActivityIndicator,
  Modal,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as F from './godislove';
import { BarCodeScanner } from 'expo-barcode-scanner';

import List from './listgodislove';
import DropDownPicker from 'react-native-dropdown-picker';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loged: props.root.state.loged,
      loading: true,
      godislove: {},
      indexgodislove: {},
      showgodislove: false,
      showgodislove2:false
    };
  }
  loadgodislove(callgodislove) {
    let list = [];
    let godislove = [];
    F.getData('products', (products) => {
      F.getData('users', (users) => {
        Object.entries(products).map((item, index) => {
          if (item[1].status == 'seller'||item[1].status == 'sold') {
            list.push({
              id: item[0],
              seller: item[1].seller.id,
              date: item[1].seller.date,
              status: item[1].status,
              price:item[1].price
            });
          }
        });

        Object.entries(users).map((item, index) => {
          if(item[1].type=="seller"){

          
          let listgodislove = {};
          list.map((productgodislove, index) => {
            if (productgodislove.seller == item[0]) {
              let date =
                new Date(productgodislove.date).getFullYear() +
                '-' +
                (new Date(productgodislove.date).getMonth() + 1) +
                '-' +
                new Date(productgodislove.date).getDate();
              if (listgodislove[date] == null) {
                listgodislove[date] = [];
              }
              listgodislove[date].push(productgodislove);
            }
          });
          
          godislove.push({ name: item[1].name, list: listgodislove });
          }
        });
        
        this.setState({ godislove: godislove, loading: false });
        callgodislove();
      });
    });
  }
  componentDidMount() {
    this.loadgodislove(()=>{
      
    });
  }
  render() {
    if (this.state.loading) {
      return (
        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'orange',
          }}>
          <ActivityIndicator size="large" color="white" />
        </View>
      );
    } else {
      let list = [];

      if (this.state.indexgodislove.list != null) {
        Object.entries(this.state.indexgodislove.list).map((item, index) => {
          let rgodislove = 0;
          let rgodislove2=0;
          item[1].map((item2) => {
            if (item2.status == 'seller') {
              rgodislove += 1;
            }else{
              rgodislove2 +=item2.price;
            }
          });

          list.push({ id: item[0], data: item[1], recvied: rgodislove ,sold:rgodislove2});
        });
      }
      return (
        <View style={{ width: '100%', height: 'auto', marginTop: 30 }}>
         <View
              style={{
                width: '100%',
                height: 50,
                backgroundColor: 'orange',
             marginTop:10,
             marginBottom:10,
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => {
         this.props.root.setState({showlistgodislove:false});
                }}>
                <Ionicons
                  name="chevron-back-circle-sharp"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
              <Text style={{ fontSize: 20, marginLeft: 10 }}>
               All sellers
              </Text>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ loading: true });
                  this.loadgodislove(() => {
                   
                  });
                }}>
                <Ionicons name="refresh-circle" size={24} color="black" />
              </TouchableOpacity>
            </View>
          <Modal
            animationType="slide"
            visible={this.state.showgodislove}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
             <Modal
            animationType="slide"
            visible={this.state.showgodislove2}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
 <View
              style={{
                width: '100%',
                height: 50,
                backgroundColor: 'orange',
                marginTop: 20,
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
                justifyContent: 'space-between',
              }}>
              </View>
              <View
              style={{
                width: '100%',
                height: "auto",
                backgroundColor: 'orange',
                marginTop: 20,
               
                alignItems: 'center',
                padding: 10,
                justifyContent: 'space-between',
              }}>

<Text style={styles.titleText}>RECVIED BACK</Text>
          <TextInput
            value={this.state.email}
            keyboardType="email-address"
            onChangeText={(email) => this.setState({ email })}
            placeholder="amount"
            placeholderTextColor="white"
            style={styles.input}
          />
          <Text style={styles.titleText}>SOLD</Text>
          <TextInput
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
            placeholder={'amount'}
     
            placeholderTextColor="white"
            style={styles.input}
            autoCapitalize="none"
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              
             
            }}>
            <Text style={styles.buttonText}> CONFIRM PAYMENT</Text>
          </TouchableOpacity>
              </View>

            </Modal>
            <View
              style={{
                width: '100%',
                height: 50,
                backgroundColor: 'orange',
                marginTop: 20,
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ showgodislove: false });
                }}>
                <Ionicons
                  name="chevron-back-circle-sharp"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
              <Text style={{ fontSize: 20, marginLeft: 10 }}>
                {this.state.indexgodislove.name}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ loading: true });
                  this.loadgodislove(() => {
                    this.setState({
                      indexgodislove: this.state.godislove[
                        this.state.indexgodislove.id
                      ],
                    });
                  });
                }}>
                <Ionicons name="refresh-circle" size={24} color="black" />
              </TouchableOpacity>
            </View>
            {list.map((item) => {
              if (true) {
                return (
                  <TouchableOpacity onPress={()=>{

                  }}
                    style={{
                      width: '100%',
                      height: 100,
                      backgroundColor: 'orange',
                      marginBottom: 10,
                      padding: 10,
                    }}>
                    <View
                      style={{
                        width: '100%',
                        height: 50,
                        
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
                        {item.id}
                      </Text>
                      <View
                      style={{
                        width: '100%',
                        height: 50,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                  
                      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
                        RECEVIED :  <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{item.recvied}</Text>
                      </Text>
                      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
                        SOLD :  <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{item.sold} birr</Text>
                      </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }
            })}
          </Modal>
          {this.state.godislove.map((item, index) => {
            item.id = index;
            return (
              <TouchableOpacity
                onPress={() => {
                  this.setState({ showgodislove: true, indexgodislove: item });
                }}
                style={{
                  width: '100%',
                  height: 100,
                  backgroundColor: 'orange',
                  marginBottom: 10,
                  padding: 10,
                }}>
                <View
                  style={{
                    width: '100%',
                    height: 50,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
                    {item.name}
                  </Text>
                  <Text style={{ fontSize: 20 }}>
                    {Object.entries(item.list).length} days
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
 titleText: {
    fontFamily: 'Baskerville',
    fontSize: 50,
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'white',
    color: 'red',
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 25,
    marginBottom: 10,
  },
  buttonText: {
    fontFamily: 'Baskerville',
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    fontFamily: 'Baskerville',
    fontSize: 20,
    height: 44,
    padding: 10,

    backgroundColor: 'rgba(100,100,100,0.2)',
    marginVertical: 10,
  }
});
