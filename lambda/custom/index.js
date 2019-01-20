/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechText = '<lang xml:lang="en-IN">Welcome to the BAPS Swaminarayan, you can say play dhun!</lang>';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard(CARD_TITLE, speechText)
      .getResponse();
  },
};

const DhunIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'DhunIntent';
  },
  handle(handlerInput) {
    const speechText = CONTENT.DHUN;

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(CARD_TITLE, speechText)
      .getResponse();
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = '<lang xml:lang="en-IN">You can say play dhun to me</lang>';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard(CARD_TITLE, speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = '<lang xml:lang="en-IN">Goodbye!</lang>';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(CARD_TITLE, speechText)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say play dhun.')
      .reprompt('Sorry, I can\'t understand the command. Please say play dhun.')
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();
const CARD_TITLE = '<lang xml:lang="en-IN">BAPS Swaminarayan</lang>';
const CONTENT = {
  'DHUN': '<lang xml:lang="en-IN">Playing dhun!</lang> <audio src="https://s3-eu-west-1.amazonaws.com/baps-assets/dhun_alexafriendly.mp3" />'
}

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    DhunIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
