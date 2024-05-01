import React, { Component } from 'react'
import { View, Text, ImageBackground, StyleSheet, FlatList } from 'react-native'

import commonStyles from '../../commonStyles'
import todayImage from '../../assets/imgs/today.jpeg'
import moment from 'moment'
import 'moment/locale/pt-br' 
import Task  from '../components/Task'
export default class TaskList extends Component {

    state = {
        tasks: [{
            id: Math.random(),
            desc: 'Comprar Livro de React Native',
            estimateAt: new Date(),
            doneAt: new Date()
        },
        {
            id: Math.random(),
            desc: 'Comprar Curso de React Native',
            estimateAt: new Date(),
            doneAt: null
        }]
    }

    // Função para marcar/desmarcar uma tarefa
    toggleTask = taskId => {
        const tasks = [...this.state.tasks]
        tasks.find(task => {
            if (task.id === taskId) {
                task.doneAt = task.doneAt ? null : new Date()
            } 
        })
        this.setState({
            tasks: tasks
        })
    }


    // Renderiza nossa lista de tarefas de hoje
    render() {
        // Ex de formatação: sab, 27 de abril
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM') 
        return (
            <View style={styles.container}>
                <ImageBackground source={todayImage} style={styles.background}>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subtitle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskList}>
                    <FlatList 
                        data={this.state.tasks}
                        keyExtractor={item => item.id}
                        // Faz o spreed em cada atributo de item e passa no Task
                        renderItem={({item}) => <Task {...item} toggleTask={this.toggleTask} />}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 3
    },
    taskList: {
        flex: 7
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 50,
        color: commonStyles.colors.secondary,
        marginLeft: 20,
        marginBottom: 20,
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 20,
    }
})