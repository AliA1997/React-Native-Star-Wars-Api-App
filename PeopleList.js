//import React and PureComponent to have the ability to have a shallow comparison of props and state
import React, { PureComponent } from 'react';
//impo rt your UI from react-native
import { View, Text, StyleSheet } from 'react-native';
//import your action creator from store for getting assynchronous operations.
import {  getPeople } from './redux/store';
//import connect method connecting your component to have access to redux state and dispatchers
import { connect } from 'react-redux';

class PeopleList extends PureComponent {
    componentDidMount() {
        //Dispatch your dispatcher
        this.props.getPeople();
    }
    render() {
    const { people, loading } = this.props;
        if(!loading) {
            return (
            <View style={styles.container}>
                {people.length ? people.map((person, i) => <Text key={i}>{person.name}</Text>) : <Text>No People</Text>}
            </View>
            );
        } else {
            return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Loading...........</Text>
            </View>
            )
        }
    }
}

//Define your styles by using StyleSHeet from react-native to cerate a css abstraction
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
  })
  

//Map the redux state to your props.
const mapStateToProps = state => ({
    people: state.people,
    loading: state.loading,
  })

//Map your action creators to your props.
const mapDispatchToProps = {
    getPeople,
}

//export your list as a default export 
export default connect(mapStateToProps, mapDispatchToProps)(PeopleList);