/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  TextInput
} from 'react-native';

class myapp extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      zip: "08805",
      forecast: {
        city: "Bound Brook",
        main: "Sunny",
        description: "mostly sunny",
        temp: "70"
      }
    };
    this._handleTextChange = this._handleTextChange.bind(this);  
  }

_handleTextChange (event) {
    var zip = event.nativeEvent.text;
    this.setState({zip: zip});
    fetch('http://api.openweathermap.org/data/2.5/weather?q='
      + zip + '&units=imperial&APPID=24548d2d065c8722e43d6d756a7c066a')
      .then((response) => response.json())
      .then((responseJSON) => {
        this.setState({
          zip: zip,
          forecast: {
            city: responseJSON.name,
            main: responseJSON.weather[0].main,
            description: responseJSON.weather[0].description,
            temp: responseJSON.main.temp
          }
        });
        console.log("handle this")
      })
      .catch((error) => {
        console.warn(error);
      });
  }

  render() {
    return (
      <Image source ={require('./images/city.jpg')} style={styles.container}>
        <View style={styles.overlay}>
        <View style={styles.row}>
              <View>
                <Text style={styles.mainText}>
                         Current weather for 
                </Text>
              </View>
              <View style={styles.zipContainer}>
                  <TextInput style={[styles.zipCode, styles.mainText]}
                  onSubmitEditing={this._handleTextChange} 
                  />
              </View>
          </View>
           <View style={styles.rowContainer}>
              <View>
                <Text style={styles.cityText}>
                         {this.state.forecast.city.toUpperCase()}
                </Text>
                
                <Text style={styles.mainText }>
                         {this.state.forecast.main}
                </Text>
              
                <Text style={styles.mainText}>
                         current conditions: {this.state.forecast.description}
                </Text>
              
                <Text style={styles.mainText}>
                         {this.state.forecast.temp}°F
                </Text>
              </View>
          

          </View>
        </View>
      </Image>
    );
  }
}

var baseFontSize = 16;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    width: null,
    height: null,
    marginTop: 25
  },
   zipContainer: {
    flex: 1,
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    marginLeft: 5,
    marginTop: 3
  },
   overlay: {
    paddingTop: 5,
    backgroundColor: '#000000',
    opacity: 0.5,
    flexDirection: 'column',
    width: 500,
    alignItems: 'center'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'flex-start',
    padding: 30
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'flex-start',
    padding: 30,
    backgroundColor: '#808080',
    opacity: 1,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    marginBottom: 20,
  },
  zipCode: {
    width: 65,
    height: baseFontSize,
  },
  mainText: {
    fontSize: baseFontSize,
    color: '#FFFFFF',
    marginBottom: 5,
    textAlign: "center",
    textShadowColor: '#000000',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 2, 
    flex: 1
  },
  cityText: {
    fontSize: 28,
    color: '#FFFFFF',
    marginBottom: 10,
    fontWeight: "700",
    textAlign: "center",
    textShadowColor: '#000000',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 2, 
    flex: 1
  }
});

AppRegistry.registerComponent('myapp', () => myapp);
