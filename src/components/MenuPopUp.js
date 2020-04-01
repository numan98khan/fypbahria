import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';

import { Card, ListItem, Button, Icon, Overlay } from 'react-native-elements'

import database from '@react-native-firebase/database';

import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';

export default class MyMenu extends React.Component {

    deleteItemDB(dbRef, itemId){
        console.log();
        database().ref(dbRef+'/'+itemId)
            .remove(() => {
                console.log('Operation Complete');
            });
    }
    
    render() {
        const customIcon = <Icon
        name='create'
        type='material'
        color='#6600ff'/>


    let removeRef;
    if (this.props.attachProduct !== undefined) {
        removeRef = 'products'
    } else if (this.props.attachProduct !== undefined) {
        removeRef = 'categories'
    }


    let firstOpt;// = <MenuOption onSelect={() => this.props.navigation.navigate('editor')} text='Edit' />;
    if (removeRef === 'products') {
        firstOpt = <MenuOption onSelect={() => this.props.navigation.navigate('editor')} text='Edit' />;    
    } else if (removeRef === 'categories') {
        firstOpt = null;
    }

    return (
        // <Menu>
        // <MenuTrigger children={customIcon} />
            // <GetMenuOptions prop={this.props}/>

        <Menu>
        <MenuTrigger children={customIcon} />
        <MenuOptions>
            {firstOpt}
            <MenuOption onSelect={(optionValue) => Alert.alert(
                    'Alert!',
                    'Are you sure you want to delete ' + this.props.item.name + '?',// + optionValue,
                    [
                    {text: 'Cancel', style: 'cancel'},
                    // {text: 'Yes', onPress: () => console.log('OK Pressed')},
                    {text: 'Yes', onPress: () => this.deleteItemDB(removeRef, this.props.item.id)},
                    ],
                    { cancelable: false }
                )} >
            <Text style={{color: 'red'}}>Delete</Text>
            </MenuOption>
        </MenuOptions></Menu>
      );
    }
  }