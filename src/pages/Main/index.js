import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Keyboard, ActivityIndicator, AsyncStorage } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'
import api from '../../services/api'

import {
  Container,
  Form,
  Input,
  List,
  User,
  Avatar,
  Name,
  Bio,
  SubmitButton,
  ProfileButton,
  ProfileButtonText,
  RemoveButton,
  RemoveButtonText,
  Buttons,
} from './styles'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newUser: '',
      users: [],
      loading: false,
    }
  }

  async componentDidMount() {
    try {
      const users = await AsyncStorage.getItem('users')
      if (users) {
        this.setState({ users: JSON.parse(users) })
      }
    } catch (error) {
      console.log(error)
    }
  }

  async componentDidUpdate(_, prevState) {
    const { users } = this.state
    if (prevState.users !== users) {
      try {
        await AsyncStorage.setItem('users', JSON.stringify(users))
      } catch (error) {
        console.log(error)
      }
    }
  }

  handleAddUser = async () => {
    const { users, newUser } = this.state
    this.setState({ loading: true })
    const response = await api.get(`/users/${newUser}`)

    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url,
    }

    this.setState({
      users: [...users, data],
      newUser: '',
      loading: false,
    })

    Keyboard.dismiss()
  }

  handleNavigate = user => {
    const { navigation } = this.props
    navigation.navigate('User', { user })
  }

  handleRemoveUser(user) {
    const { users } = this.state
    const currentUser = users.indexOf(user)
    users.splice(currentUser, 1)
    console.tron.log(users)
    AsyncStorage.setItem('users', JSON.stringify(users))
    this.setState({
      users,
    })
  }

  render() {
    const { users, newUser, loading } = this.state
    return (
      <Container>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Adicionar usuário"
            value={newUser}
            onChangeText={text => this.setState({ newUser: text })}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
          />
          <SubmitButton loading={loading} onPress={this.handleAddUser}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Icon name="add" size={20} color="#FFF" />
            )}
          </SubmitButton>
        </Form>
        <List
          data={users}
          keyExtractor={user => user.login}
          renderItem={({ item }) => (
            <User>
              <Avatar source={{ uri: item.avatar }} />
              <Name>{item.name}</Name>
              <Bio>{item.bio}</Bio>
              <Buttons>
                <ProfileButton onPress={() => this.handleNavigate(item)}>
                  <ProfileButtonText>Ver Perfil</ProfileButtonText>
                </ProfileButton>
                <RemoveButton onPress={() => this.handleRemoveUser(item)}>
                  <RemoveButtonText>Remover Perfil</RemoveButtonText>
                </RemoveButton>
              </Buttons>
            </User>
          )}
        />
      </Container>
    )
  }
}
Main.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
}

export default Main
