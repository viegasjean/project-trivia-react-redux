import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchQuestions, fetchToken } from '../servicesAPI/servicesAPI';
// import { getQuestions } from '../redux/actions/questionsAction';
import { tokenAction, playerAction } from '../redux/actions';
import fetchQuestionsAction from '../redux/actions/questionsAction';

const TIME_INTERVAL = 1000;
const CORRECT_ANSWER = 'correct-answer';
const TRYBE_MAGIC = 10;
const LEVELS = [
  { level: 'hard', value: 3 },
  { level: 'medium', value: 2 },
  { level: 'easy', value: 1 }];
class GameMain extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      // options: [],
      timer: 30,
      assertions: 0,
      score: 0,
      classNameCorrect: CORRECT_ANSWER,
      classNameWrong: 'wrong-answer',
      showButton: false,
      questionNumber: 0,
      options: [],
    };
  }

  componentDidUpdate() {
    const { questions } = this.state;
    if (questions.length === 0) this.getQuestions();
  }

  getQuestions = async () => {
    const { tokenState, sendToken } = this.props;
    this.handleCount();
    const res = await fetchQuestions(tokenState);
    if (res.response_code === 0) this.setState({ questions: res.results });
    if (res.response_code !== 0) {
      const token = await fetchToken();
      sendToken(token);
      fetchQuestions(token);
    }
    this.handleOptions();

  /*   fetchQuestions(tokenState)
      .then((res) => {
        console.log('ress', res);
        if (res.response_code === 0) {
          this.setState({
            questions: res.results },
          () => this.handleOptions());
        }
        if (res.response_code === 3) {
          fetchToken().then((token) => {
            console.log('rechamaToken', token);
            console.log('rechamaTokenaaaa', res);
            sendToken(token);
            this.fetchQuestions(token);
          });
        }
      });
    this.handleCount(); */
  }

  handleOptions = () => {
    const { questions } = this.state;
    const MAGIC_NUMBER = 0.5;
    const { questionNumber } = this.state;
    if (questions.length > 0) {
      const question = questions[questionNumber];
      const correctAnswer = { text: question.correct_answer, correct: true };
      const incorrectAnswers = question.incorrect_answers
        .map((incAswr) => ({ text: incAswr, correct: false }));
      const arrOptions = [correctAnswer, ...incorrectAnswers];
      const shuffleOptions = arrOptions.sort(() => Math.random() - MAGIC_NUMBER);
      this.setState({ options: shuffleOptions });
    }
  };

  handleCount = () => {
    const myInterval = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }), () => {
        const { timer } = this.state;
        if (timer === 0) {
          clearInterval(myInterval);
        }
      });
    }, TIME_INTERVAL);
  };

  handleAnswer = (correct) => {
    // console.log(questions);
    if (correct) return CORRECT_ANSWER;
    return 'incorrect_answers';
  };

  handleLevel = () => {
    const { questions } = this.state;
    const { questionNumber } = this.state;
    const levelQuestion = questions[questionNumber].difficulty;
    //     LEVELS.find(({ level, value }) => {
    //       if (levelQuestion === level) return value;
    //   });
    // }
    if (levelQuestion === LEVELS[0].level) return LEVELS[0].value;
    if (levelQuestion === LEVELS[1].level) return LEVELS[1].value;
    if (levelQuestion === LEVELS[2].level) return LEVELS[2].value;
  }

  handleScore = ({ target }) => {
    const { timer } = this.state;
    if (target.name === CORRECT_ANSWER) {
      const getDifficultValue = this.handleLevel();
      this.setState((prevState) => ({
        assertions: prevState.assertions + 1,
        score: prevState.score + TRYBE_MAGIC + (timer * getDifficultValue),
      }), () => {
        const { sendScoreBoard, playerInfo } = this.props;
        const { score, assertions } = this.state;
        sendScoreBoard({ score, assertions });
        localStorage.setItem('player', JSON.stringify(playerInfo));
        console.log('localStorage');
      });
    }
  };

  toggleAnswer = () => {
    this.setState({
      classNameCorrect: 'correct-answer-active',
      classNameWrong: 'wrong-answer-active',
      showButton: true,
    });
  }

  handleClickFunctions = (event) => {
    this.toggleAnswer();
    this.handleScore(event);
  };

  nextQuestion = () => {
    const { questionNumber } = this.state;
    this.setState({
      questionNumber: questionNumber + 1,
      showButton: false,
      classNameWrong: '',
      classNameCorrect: '',
    });
    this.handleOptions();
  }

  render() {
    const feedbackRedirect = 5;
    const { timer, classNameCorrect,
      classNameWrong, showButton, questionNumber, options, questions } = this.state;
    const question = questions[questionNumber];
    if (questions.length === 0) return <h1> loading... </h1>;
    console.log('renderQuestions', questions);

    if (questionNumber === feedbackRedirect) return <Redirect to="/feedback" />;

    return (
      <section>
        <div>
          {timer}
        </div>
        <h5 data-testid="question-category">
          {question.category}
        </h5>
        <h5 data-testid="question-text">
          {question.question}
        </h5>
        <div data-testid="answer-options">
          {options.length > 0 && options.map((option, index) => (
            <button
              className={ (option.correct
              ) ? `${classNameCorrect}` : `${classNameWrong}` }
              data-testid={ (option.correct
              ) ? 'correct-answer' : `wrong-answer-${index}` }
              type="button"
              // className={ timer === 0 && 'wrong-answer' }
              disabled={ timer === 0 }
              name={ this.handleAnswer(option.correct) }
              // onClick={ this.handleScore }
              key={ option.text }
              onClick={ this.handleClickFunctions }
            >
              {option.text}
            </button>
          ))}
          {/* {options.map((option, index) => (
            <button
              data-testid={ (option === questions[0].correct_answer
              ) ? ('correct_answer') : (`wrong-answer-${index}`) }
              type="button"
              key={ option }
            >
              {option}
            </button>
          ))} */}
          { showButton && (
            <button
              type="button"
              onClick={ this.nextQuestion }
              data-testid="btn-next"
            >
              NEXT
            </button>)}
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('state na gameMain', state);
  return {
    questions: state.questionsReducer.questions,
    responseCode: state.questionsReducer.responseCode,
    tokenState: state.token,
    loading: state.questionsReducer.loading,
    playerInfo: state.player,
    options: state.questionsReducer.options,
  };
};
const mapDispatchToProps = (dispatch) => ({
  fetchQuestionsApi: (token) => dispatch(fetchQuestionsAction(token)),
  sendScoreBoard: (scoreboard) => dispatch(playerAction(scoreboard)),
  sendToken: (token) => dispatch(tokenAction(token)),
  // sendQuestions: (token) => dispatch(getQuestions(token)),
});

GameMain.propTypes = {
  fetchQuestionsApi: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(GameMain);
