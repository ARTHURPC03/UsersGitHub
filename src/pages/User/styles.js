import styled from 'styled-components/native'

export const Container = styled.View`
  background: #131217;
  flex: 1;
  padding: 30px;
`

export const Header = styled.View`
  align-items: center;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-color: #eee;
`

export const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background: #eee;
`

export const Name = styled.Text`
  font-size: 20px;
  color: #ffffff;
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
`

export const Bio = styled.Text`
  font-size: 14px;
  line-height: 18px;
  color: #999;
  margin-top: 5px;
  text-align: center;
`

export const Stars = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`

export const Starred = styled.View`
  background: #1f1b1b;
  border-radius: 4px;
  padding: 10px 15px;
  margin-bottom: 20px;
  flex-direction: row;
  align-items: center;
`

export const OwnerAvatar = styled.Image`
  height: 42px;
  width: 42px;
  border-radius: 21px;
  background: #eee;
`

export const Info = styled.View`
  margin-left: 10px;
  flex: 1;
`

export const Title = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: 15px;
  font-weight: bold;
  color: #ffffff;
`

export const Author = styled.Text`
  font-size: 13px;
  color: #ffff;
  margin-top: 2px;
`
export const Loading = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
