import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Store
import { bindActionCreators } from 'redux'
import connect from 'react-redux/es/connect/connect'
import { loadChats } from '../../../store/actions/chats_action.js'

// Components
import ChatItem from './ChatItem.jsx'

// Styles, UI
import { CircularProgress } from '@material-ui/core'

class ChatField extends Component {
   static propTypes = {
      currentUser: PropTypes.object.isRequired,
      loadChats: PropTypes.func.isRequired,
      isLoading: PropTypes.bool.isRequired,
      chatId: PropTypes.string,
      chatRooms: PropTypes.object.isRequired,
      searchRequest: PropTypes.string,
      classes: PropTypes.object,
   }

   componentDidMount () {
      this.props.loadChats()
   }

   render() {
      const { currentUser, isLoading, chatId, chatRooms, searchRequest } = this.props
      
      const ChatsArr = []
      Object.keys(chatRooms).forEach(chatRoomId => {
         if (chatRooms[chatRoomId] !== undefined ) {

            const messages = chatRooms[chatRoomId].messageList
            const lastMsgIndex = messages.length - 1

            let title = ''
            chatRooms[chatRoomId].participants.forEach(user => (
               user._id === currentUser._id ? '' : title = user.userName))
         
            ChatsArr.push( 
               <ChatItem 
                  chatRoomId={ chatRoomId }
                  title={ title }
                  lastMessage={ messages.length ? messages[lastMsgIndex].text : '* No messages yet *'}
                  isSelected={ chatId === chatRoomId }
                  key={ chatRoomId }
               />
            )
         }
      })

      let ChatsFilteredArr = []
      if (searchRequest !== '') {
         const searchRegExp = new RegExp(searchRequest, 'gi')
         ChatsFilteredArr = ChatsArr.filter(room => {
            return searchRegExp.test(room.props.title)
         })
      } else ChatsFilteredArr = ChatsArr

      return (
         <>{ isLoading 
            ? <CircularProgress/> 
            : ChatsFilteredArr
         }</>
      )
   }
}

const mapStateToProps = ({ chatReducer, authReducer }) => ({
   currentUser: authReducer.currentUser,
   isLoading: chatReducer.isLoading,
   chatRooms: chatReducer.chatRooms,
})
const mapDespatchToProps = dispatch => bindActionCreators({ loadChats }, dispatch)

export default connect(mapStateToProps, mapDespatchToProps)(ChatField)