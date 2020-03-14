import React, { Component } from 'react'
import PropTypes from 'prop-types'

import api from '../../services/api'

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Loading,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles'

export default class User extends Component {
  constructor(props) {
    super(props)
    const { route, navigation } = this.props
    const { name } = route.params.user
    navigation.setOptions({
      title: name,
      headerTinColor: '#fff',
      headerBackTitlevisible: false,
    })

    this.state = {
      stars: [],
      page: 1,
      loading: true,
      refreshing: false,
    }
  }

  async componentDidMount() {
    this.load()
  }

  load = async (page = 1) => {
    const { stars } = this.state
    const { route } = this.props
    const { user } = route.params

    const response = await api.get(`/users/${user.login}/starred`, {
      params: { page },
    })

    this.setState({
      stars: page >= 2 ? [...stars, ...response.data] : response.data,
      page,
      loading: false,
      refreshing: false,
    })
  }

  loadMore = () => {
    const { page } = this.state

    const nextPage = page + 1

    this.load(nextPage)
  }

  refreshList = () => {
    this.setState({ refreshing: true, stars: [] }, this.load)
  }

  handleNavigate = repository => {
    const { navigation } = this.props

    navigation.navigate('Repository', { repository })
  }

  render() {
    const { route } = this.props
    const { stars, loading, refreshing } = this.state

    const { user } = route.params

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        {loading ? (
          <Loading />
        ) : (
          <Stars
            data={stars}
            onRefresh={this.refreshList}
            refreshing={refreshing}
            onEndReachedThreshold={0.2}
            onEndReached={this.loadMore}
            keyExtractor={star => String(star.id)}
            renderItem={({ item }) => (
              <Starred>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title onPress={() => this.handleNavigate(item)}>
                    {item.name}
                  </Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
          />
        )}
      </Container>
    )
  }
}

User.propTypes = {
  navigation: PropTypes.shape({
    setOptions: PropTypes.func,
    navigate: PropTypes.func,
  }).isRequired,

  route: PropTypes.shape({
    params: PropTypes.shape({
      user: PropTypes.shape({
        login: PropTypes.string,
        name: PropTypes.string,
        avatar: PropTypes.string,
        bio: PropTypes.string,
      }),
    }),
  }).isRequired,
}
