import React from 'react';
import style from './leasebot.module.scss';
import PropTypes from 'prop-types';
import { LexRuntimeService  } from "@aws-sdk/client-lex-runtime-service-browser/LexRuntimeService";
import { CognitoIdentityClient }  from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool }  from "@aws-sdk/credential-provider-cognito-identity";
import { PostTextCommand  } from "@aws-sdk/client-lex-runtime-service-browser/commands/PostTextCommand";
class LeaseBot extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: '', 
      lexUserId: 'chatbot' + Date.now(), 
      sessionAttributes: {}
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    
    document.getElementById("inputField").focus();

    this.lexRuntimeService = new LexRuntimeService({ 
      region: "eu-west-1",
      IdentityPoolId: this.props.IdentityPoolId, 
      credentials: fromCognitoIdentityPool({
        client: new CognitoIdentityClient({ region: "eu-west-1" }),
        identityPoolId: this.props.IdentityPoolId // IDENTITY_POOL_ID
      }),
    });
   
    var params = {
      botAlias: 'LeaseBot',
      botName: this.props.botName,
      inputText: 'Hi',
      userId: this.state.lexUserId,      
      sessionAttributes: this.state.sessionAttributes
    };

    const postTextRequest = new PostTextCommand(params);

    this.lexRuntimeService.send(postTextRequest, (err, data) => {
      this.callback(err, data);
    });

    // this.lexruntime.postText(params, this.callback);
  }

 
  
  callback = (err, data) => {
    if (err) {
      console.log(err, err.stack);
      this.showError('Error:  ' + err.message + ' (see console for details)')
    }
    if (data) {
      // capture the sessionAttributes for the next cycle
      this.setState({sessionAttributes: data.sessionAttributes})
      //sessionAttributes = data.sessionAttributes;
      // show response and/or error/dialog status
      this.showResponse(data);
    }
    var inputFieldText = document.getElementById('inputField');
    // re-enable input
    inputFieldText.value = '';
    inputFieldText.locked = false;
  };

  pushChat(event) {
    event.preventDefault();

    var inputFieldText = document.getElementById('inputField');

    if (inputFieldText && inputFieldText.value && inputFieldText.value.trim().length > 0) {

      // disable input to show we're sending it
      var inputField = inputFieldText.value.trim();
      inputFieldText.value = '...';
      inputFieldText.locked = true;

      // send it to the Lex runtime
      var params = {
        botAlias: 'LeaseBot',
        botName: this.props.botName,
        inputText: inputField,
        userId: this.state.lexUserId,
        sessionAttributes: this.state.sessionAttributes
      };

      this.showRequest(inputField);

      const postTextRequest = new PostTextCommand(params);

      this.lexRuntimeService.send(postTextRequest, (err, data) => {
        this.callback(err, data);
      });
    }
    // we always cancel form submission
    return false;
  }

  showRequest(daText) {
    var conversationDiv = document.getElementById('conversation');
    var requestPara = document.createElement("P");
    requestPara.className = 'userRequest';
    requestPara.appendChild(document.createTextNode(daText));
    conversationDiv.appendChild(requestPara);
    conversationDiv.scrollTop = conversationDiv.scrollHeight;
  }

  showError(daText) {

    var conversationDiv = document.getElementById('conversation');
    var errorPara = document.createElement("P");
    errorPara.className = 'lexError';
    errorPara.appendChild(document.createTextNode(daText));
    conversationDiv.appendChild(errorPara);
    conversationDiv.scrollTop = conversationDiv.scrollHeight;
  }

  showResponse(lexResponse) {

    var conversationDiv = document.getElementById('conversation');
    var responsePara = document.createElement("P");
    responsePara.className = 'lexResponse';
    if (lexResponse.message) {
      responsePara.appendChild(document.createTextNode(lexResponse.message));
      responsePara.appendChild(document.createElement('br'));
    }
    if (lexResponse.dialogState === 'ReadyForFulfillment') {
      responsePara.appendChild(document.createTextNode(
        'Ready for fulfillment'));
      // TODO:  show slot values
    } else {
      responsePara.appendChild(document.createTextNode(''));
    }
    conversationDiv.appendChild(responsePara);
    conversationDiv.scrollTop = conversationDiv.scrollHeight;
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({data: event.target.value});
  }

  render() {

    const inputStyle = {
      padding: '4px',
      fontSize: 24,
      width: '388px',
      height: '40px',
      borderRadius: '1px',
      border: '10px'
    }

    const conversationStyle = {
      width: '400px',
      height: this.props.height,
      border: 'px solid #ccc',
      backgroundColor: this.props.backgroundColor,
      padding: '4px',
      overflow: 'scroll',
      borderBottom: 'thin ridge #bfbfbf'
    }

    
    const chatcontainerStyle = {
      backgroundColor: '#FFFFFF',
      width: 408
    }

    const chatFormStyle = {
      margin: '1px', 
      padding: '2px'
    }

    return (
            <>
              <div id="chatcontainer" className={`${style['chatcontainer']} ${style[this.props.visible]}`} style={chatcontainerStyle}>
                  <div id="chatheader" className={style['chatheader']}><img className="lazyload" alt="Leasing Options Leasebot will help you find the best deals 24/7!" width="50" height="50" data-src={`${process.env.NEXT_PUBLIC_CDN}/website/static/leasebot.png`} /><span>LeaseBot</span></div>
                  <div id="conversation" className={style['conversation']} style={conversationStyle} ></div>
                  <form id="chatform" className={style['chatform']} style={chatFormStyle} onSubmit={this.pushChat.bind(this)}>
                      <input type="text"
                              id="inputField"
                              size="40"
                              value={this.state.data}
                              placeholder={this.props.placeholder}
                              onChange={this.handleChange.bind(this)}
                              style={inputStyle}
                              />
                  </form>
              </div>
            </>
        )
  }
}

LeaseBot.propTypes = {
  botName: PropTypes.string,
  IdentityPoolId: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  height: PropTypes.number,
  headerText: PropTypes.string
}

export default LeaseBot;