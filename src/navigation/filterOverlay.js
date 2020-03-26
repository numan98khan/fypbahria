import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';

import { Header, Icon, Overlay } from 'react-native-elements';
import { withNavigation} from 'react-navigation';

class FilterOverlay extends React.Component {

    state = {
      isFilterVisible: false,
    };

    render(){
        const menuIcon = <Icon
                name='menu'
                color='#fff'
                onPress={() => this.props.navigation.toggleDrawer()} />

        return(
      <View>
          <Overlay 
            isVisible={this.state.isFilterVisible}
            onBackdropPress={() => this.setState({ isFilterVisible: false })}
          >
            <Header leftComponent={{ text: 'Filters', style: { color: '#fff' } }}
                    rightComponent={{ icon: 'tune', color: '#fff' }}
                    containerStyle={{
                      backgroundColor: '#3D6DCC',
                      justifyContent: 'space-around',
                      // flex:3,
                    }}>
              {/* <MyCustomLeftComponent />
              <MyCustomCenterComponent />
              <MyCustomRightComponent /> */}
              </Header>
            
        </Overlay>
      </View>
      )
    }
  }

// export default withNavigation(NavBar)
export default FilterOverlay 