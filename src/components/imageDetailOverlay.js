import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {  toggleImageFilter } from '../state/actions';
import { Header, Icon, Overlay } from 'react-native-elements';
import { withNavigation} from 'react-navigation';
import Slideshow from 'react-native-image-slider-show';


class ImgDetailOverlay extends React.Component {

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
            isVisible={this.props.products.isFilterVisible}
            onBackdropPress={() => this.props.toggleImageFilter()}
            height='auto'
          >
        <Slideshow
            dataSource={[
                { url:'http://placeimg.com/640/480/any' },
                { url:'http://placeimg.com/640/480/any' },
                { url:'http://placeimg.com/640/480/any' }
            ]}
            />
            
        </Overlay>
      </View>
      )
    }
  }

// export default withNavigation(NavBar)
const mapStateToProps = (state) => {
  const { products } = state
  return { products }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    toggleImageFilter
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ImgDetailOverlay);