import React, {Component} from 'react';
import ReactDom from 'react-dom';

import Message from '../Message/Message.jsx';

//UI Components
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import {IconButton, TextField, Tooltip } from '@material-ui/core';
// import SendOutlinedIcon from '@material-ui/icons/SendOutlinedIcon';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import { Card, CardContent} from '@material-ui/core';

const useStyles = (theme => ({
  root: {
    width: '400px',
    padding: '5px',
  }
}));

class MessageField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msgText: '',
      msgs: props.msgs,
    };
  }
  //methods
  sendMsg = () => {
    // const msg = document.querySelector('#msg'); //Так плохо, потому что не логично обращаться к DOM напрямую!!!
    this.setState ({
      msgs : [...this.state.msgs, {
        sender: 'Me',
        text: this.state.msgText,
      }],
      msgText: '',
    });
  };
  handleChange = (evt) => {
    if (evt.keyCode !== 13) {
      this.setState({ msgText: evt.target.value });
    } else {
      this.sendMsg();
    }
  };

  //hooks
  componentDidUpdate() {
    //Отвечаем на каждое нечетное сообщение через 1 сек
    if(this.state.msgs.length %2 === 1) {
      setTimeout(() => {
        this.setState({
          msgs: [...this.state.msgs, {
            sender: null,
            text: 'Leave me alone, human...',
          }]
        });
      }, 100);
    }
  }

  render() {
    const { classes } = this.props;
    let MessagesArr = this.state.msgs.map((msg, index) => <Message key={index.toString()} msg={msg} />);
    return (
      <div className="wrapper">
        <h2>ReactGram &copy;</h2>
        <div className={classes.root}>
          { MessagesArr }
        </div>
        <div className="sendMsgField">
          <Tooltip title="Введите текст сообщения">
            <TextField
              variant="outlined"
              size="small"
              onChange={this.handleChange}
              onKeyUp = {this.handleChange}
              value = {this.state.msgText}
              />
          </Tooltip>
          <Tooltip title="Отправить">
              <IconButton
              // size="small"
              name="sendMsgUI"
              onClick={this.sendMsg}>
                <SendOutlinedIcon />
              </IconButton>
          </Tooltip>
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(MessageField);