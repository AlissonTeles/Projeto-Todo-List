import React, { Component } from 'react'
import { View, Text, ImageBackground, StyleSheet, FlatList, TouchableOpacity, Platform } from 'react-native'

import commonStyles from '../../commonStyles'
import todayImage from '../../assets/imgs/today.jpeg'
import Icon from "react-native-vector-icons/FontAwesome";
import moment from 'moment'
import 'moment/locale/pt-br' 
import Task  from '../components/Task'
import AddTask from '../components/addTask';
export default class TaskList extends Component {

    state = {
        showDoneTasks: true,
        showAddTask: false,
        visibleTasks: [],
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

    // Quando o componente for montado ele executa
    componentDidMount = () => {
        this.filterTasks()
    }

    // Mostra as tasks ativas ou não, filtrando elas
    toggleFilter = () => {
        this.setState({
            showDoneTasks: !this.state.showDoneTasks
        }, this.filterTasks)
    }

    filterTasks = () => {
        let visibleTasks = null
        if (this.state.showDoneTasks) {
            visibleTasks = [...this.state.tasks]
        } else if (!this.state.showDoneTasks) {
            // vai pegar apenas as tasks pendentes
            const pending = task => task.doneAt === null
            visibleTasks = this.state.tasks.filter(pending)
        }

        this.setState({ visibleTasks: visibleTasks })
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
        }, this.filterTasks)
    }


    // Renderiza nossa lista de tarefas de hoje
    render() {
        // Ex de formatação: sab, 27 de abril
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM') 
        return (
            <View style={styles.container}>
                <AddTask isVisible={this.state.showAddTask} onCancel={() => this.setState({ showAddTask: false})} />
                <ImageBackground source={todayImage} style={styles.background}>
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={this.toggleFilter}>
                            <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'} size={20} color={commonStyles.colors.secondary} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subtitle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskList}>
                    <FlatList 
                        data={this.state.visibleTasks}
                        keyExtractor={item => item.id}
                        // Faz o spreed em cada atributo de item e passa no Task
                        renderItem={({item}) => <Task {...item} toggleTask={this.toggleTask} />}
                    />
                </View>
                <TouchableOpacity activeOpacity={0.7} style={styles.addButton} onPress={() => this.setState({ showAddTask: true})}>
                    <Icon name='plus' size={20} color={commonStyles.colors.secondary}  />
                </TouchableOpacity>
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
    },
    iconBar: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'flex-end',
        marginTop: Platform.OS === 'ios' ? 50 : 50
    },
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: commonStyles.colors.today,
        justifyContent: 'center',
        alignItems: 'center'
    }
})