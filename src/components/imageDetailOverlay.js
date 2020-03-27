import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';

import { Header, Icon, Overlay } from 'react-native-elements';
import { withNavigation} from 'react-navigation';
import Slideshow from 'react-native-image-slider-show';

class ImgDetailOverlay extends React.Component {

    state = {
      isFilterVisible: true,
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
            height='auto'
          >
        <Slideshow 
            dataSource={[
                { url:'http://placeimg.com/640/480/any' },
                { url:'http://placeimg.com/640/480/any' },
                { url:'http://placeimg.com/640/480/any' }
            ]}
            onPress={() => console.log('deleteooo')}
            />
            
        </Overlay>
      </View>
      )
    }
  }

// export default withNavigation(NavBar)
export default ImgDetailOverlay 