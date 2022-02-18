import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { fetchQuestions, fetchToken } from '../servicesAPI/servicesAPI';

// import { getQuestions } from '../redux/actions/questionsAction';

import fetchQuestionsAction from '../redux/actions/questionsAction';

const TIME_INTERVAL = 1000;
class GameMain extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      options: [],
      count: 10,
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
    fetchQuestionsApi();
    this.handleCount();
  }

  // handleOptions = () => {
  //   const MAGIC_NUMBER = 0.5;
  //   const { questions } = this.props;
  //   console.log(questions);
  //   if (questions.length > 0) {
  //     const arrOptions = [questions[0].correct_answer, ...questions[0].incorrect_answers];
  //     const shuffleOptions = arrOptions.sort(() => Math.random() - MAGIC_NUMBER);
  //     this.setState({ options: shuffleOptions });
  //   }
  // };

  handleCount = () => {
    const myInterval = setInterval(() => {
      this.setState((prevState) => ({
        count: prevState.count - 1,
      }), () => {
        const { count } = this.state;
        if (count === 0) {
          clearInterval(myInterval);
        }
      });
    }, TIME_INTERVAL);
  };

  render() {
    const { questions, loading, options } = this.props;
    const { count } = this.state;
    // const { options } = this.state;
    // const { loading } = this.props;

    if (loading) return <h1>loading</h1>;
    return (
      <section>
        <div>
          {count}
        </div>
        <h5 data-testid="question-category">
          {questions[0].category}
        </h5>
        <h5 data-testid="question-text">
          {questions[0].question}
        </h5>
        <div data-testid="answer-options">
          {options.length > 0 && options.map((option, index) => (
            <button
              data-testid={ (option === questions[0].correct_answer
              ) ? 'correct-answer' : `wrong-answer-${index}` }
              type="button"
              className={ count === 0 && 'wrong-answer' }
              disabled={ count === 0 }
              key={ option }
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
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state.token);
  return {
    questions: state.questionsReducer.questions,
    tokenState: state.token,
    loading: state.questionsReducer.loading,
    options: state.questionsReducer.options,
  };
};
const mapDispatchToProps = (dispatch) => ({
  fetchQuestionsApi: (token) => dispatch(fetchQuestionsAction(token)),
  // sendQuestions: (token) => dispatch(getQuestions(token)),
});

GameMain.propTypes = {
  fetchQuestionsApi: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(GameMain);
