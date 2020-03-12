import React, { useState, useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'
import api from '../../services/api'

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles'

export default function User({ route }) {
  const [stars, setStars] = useState([])
  const [loading, setLoading] = useState(false)
  const { user } = route.params

  useEffect(() => {
    async function getUserData() {
      setLoading(true)
      const response = await api.get(`/users/${user.login}/starred`)

      setStars(response.data)
      setLoading(false)
    }
    getUserData()
  }, [])

  return (
    <Container>
      <Header>
        <Avatar source={{ uri: user.avatar }} />
        <Name>{user.name}</Name>
        <Bio>{user.bio}</Bio>
      </Header>

      {loading ? (
        <ActivityIndicator />
      ) : (
        <Stars
          data={stars}
          keyExtractor={star => String(star.id)}
          renderItem={({ item }) => (
            <Starred>
              <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
              <Info>
                <Title>{item.name}</Title>
                <Author>{item.owner.login}</Author>
              </Info>
            </Starred>
          )}
        />
      )}
    </Container>
  )
}

User.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      user: PropTypes.shape({
        login: PropTypes.string,
        avatar: PropTypes.string,
        name: PropTypes.string,
        bio: PropTypes.string,
      }),
    }),
  }).isRequired,
}
