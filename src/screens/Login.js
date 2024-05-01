import { Component } from "react";
import { View, ActivityIndicator, TextInput } from "react-native"
import firebase from 'firebase'

export default class Login extends Component {

    // Instanciando classe
    constructor() {
        super()
        const state = {
            name: "",
            email: "",
            password: "",
            isLoading: "",
        }
    }

    // Salva valor dos inputs
    savePropValue = (value, prop) => {
        // Pegar valor atual dos inputs
        const state = this.state
        // Salva
        state[prop] = value
        this.setState(state)
    }

    login = () => {

    }

    render() {
        // Mostra se a tela estiver carregando
        if (this.state.isLoading) {
            return (
                <ActivityIndicator size="large"  />
            )
        }
        return (
            <View>
                <TextInput value={this.state.email}  ></TextInput>

                <TextInput value={this.state.email}  ></TextInput>

                <Button onPress={() => this.login}  />


            </View>
        )
    }

}