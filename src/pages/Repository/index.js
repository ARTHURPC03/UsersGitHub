import React from 'react'
import { WebView } from 'react-native-webview'
import PropTypes from 'prop-types'

export default function Repository({ route, navigation }) {
  const { repository } = route.params

  navigation.setOptions({ title: repository.name })

  return <WebView source={{ uri: repository.html_url }} style={{ flex: 1 }} />
}

Repository.propTypes = {
  navigation: PropTypes.shape({
    setOptions: PropTypes.func,
  }).isRequired,

  route: PropTypes.shape({
    params: PropTypes.object,
    user: PropTypes.object,
  }).isRequired,
}
