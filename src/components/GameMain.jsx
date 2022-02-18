import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { fetchQuestions, fetchToken } from '../servicesAPI/servicesAPI';

// import { getQuestions } from '../redux/actions/questionsAction';
import { playerAction } from '../redux/actions';
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
      // questions: [],
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

  componentDidMount() {
    this.getQuestions();
  }

  getQuestions = async () => {
    // let token = localStorage.getItem('token');
    // console.log(token);
    // const { fetchQuestionsApi } = this.props;
    // const { sendQuestions } = this.props;
    // if (token === null || token === undefined) {
    //   const dataToken = await fetchToken();
    //   token = dataToken.token;
    // }
    // const data = await fetchQuestions(token);
    // console.log(data);
    // if (data.response_code === 3) {
    //   const dataToken = await fetchToken();
    //   console.log(dataToken.token);
    //   const questions = await fetchQuestions(dataToken.token);
    //   console.log(questions);

    // this.setState({ questions: questions.results }, () => {
    //   this.handleOptions();
    // });
    // return sendQuestions(questions.results);
    // } else {
    // this.setState({ questions: data.results }, () => {
    //   this.handleOptions();
    // });
    // }
    // await sendQuestions(data.results);
    const { fetchQuestionsApi } = this.props;
    await fetchQuestionsApi();
    this.handleOptions();
    this.handleCount();
  }

  handleOptions = () => {
    const MAGIC_NUMBER = 0.5;
    const { questions } = this.props;
    const { questionNumber } = this.state;
    if (questions.length > 0) {
      const arrOptions = [questions[questionNumber].correct_answer,
        ...questions[questionNumber].incorrect_answers];
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

  handleAnswer = (option) => {
    const { questions } = this.props;
    const { questionNumber } = this.state;
    // console.log(questions);
    if (option === questions[questionNumber].correct_answer) return CORRECT_ANSWER;
    return 'incorrect_answers';
  };

  handleLevel = () => {
    const { questions } = this.props;
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
    console.log('clicou');
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
    const { questions, loading } = this.props;
    const { timer, classNameCorrect,
      classNameWrong, showButton, questionNumber, options } = this.state;
    const question = questions[questionNumber];
    // const { options } = this.state;
    // const { loading } = this.props;

    if (loading) return <h1>loading</h1>;
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
              className={ (option === question.correct_answer
              ) ? `${classNameCorrect}` : `${classNameWrong}` }
              data-testid={ (option === question.correct_answer
              ) ? 'correct-answer' : `wrong-answer-${index}` }
              type="button"
              // className={ timer === 0 && 'wrong-answer' }
              disabled={ timer === 0 }
              name={ this.handleAnswer(option) }
              // onClick={ this.handleScore }
              key={ option }
              onClick={ this.handleClickFunctions }
            >
              {option}
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
  console.log(state);
  return {
    questions: state.questionsReducer.questions,
    tokenState: state.token,
    loading: state.questionsReducer.loading,
    playerInfo: state.player,
    options: state.questionsReducer.options,
  };
};
const mapDispatchToProps = (dispatch) => ({
  fetchQuestionsApi: (token) => dispatch(fetchQuestionsAction(token)),
  sendScoreBoard: (scoreboard) => dispatch(playerAction(scoreboard)),
  // sendQuestions: (token) => dispatch(getQuestions(token)),
});

GameMain.propTypes = {
  fetchQuestionsApi: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(GameMain);
