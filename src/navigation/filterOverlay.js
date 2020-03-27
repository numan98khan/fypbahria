import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView, Picker } from 'react-native';

import { Header, Icon, Overlay } from 'react-native-elements';
import { withNavigation} from 'react-navigation';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateProducts, initiateProducts, toggleFilter } from '../state/actions';

class FilterOverlay extends React.Component {

    // state = {
    //   // isFilterVisible: false,
    // };

    constructor(props) {
      super(props);
      this.state = {
        title: '',
        titleError:null,
        category: 'NONE',
        additionalInfo: '',
        categories: ['NONE', 'Mobile', 'Laptops', 'Desktops', 'Others'],
        price:''
      }
    }

    renderCategories = () => {
      return this.props.products.dataSourceFilter.map(c => <Picker.Item key={c.name} label={c.name} value={c.name} />)
    }

    render(){
        const menuIcon = <Icon
                name='menu'
                color='#fff'
                onPress={() => this.props.navigation.toggleDrawer()} />

        return(
      <View>
          <Overlay 
            // isVisible={this.state.isFilterVisible}
            isVisible={this.props.products.isFilterOn}
            // onBackdropPress={() => this.setState({ isFilterVisible: false })}
            onBackdropPress={() => this.props.toggleFilter()}
            height='auto'
          >
            <Header leftComponent={{ text: 'Filter', style: { color: '#fff' } }}
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

              <Picker
                selectedValue={this.props.products.category}
                // use this technique toi gather returned values from onPress in ImageSlideShow
                onValueChange={(itemValue, itemIndex) => 
                        // this.setState({ language: itemValue })
                        this.props.updateProducts({category:itemValue})
                      }
                        
                        >
                {this.renderCategories()}
              </Picker>
            
        </Overlay>
      </View>
      )
    }
  }

// export default withNavigation(NavBar)
// export default FilterOverlay 

const mapStateToProps = (state) => {
  const { products } = state
  return { products }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    toggleFilter,
    updateProducts,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(FilterOverlay);
