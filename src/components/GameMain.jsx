import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchQuestions, fetchToken } from '../servicesAPI/servicesAPI';

import { getQuestions } from '../redux/actions/questionsAction';

class GameMain extends Component {
  constructor() {
    super();
    this.state = {
      options: [],
    };
  }

  componentDidMount() {
    this.getQuestions();
  }

  getQuestions = async () => {
    const token = localStorage.getItem('token');
    // const { fetchQuestionsApi } = this.props;
    const { sendQuestions } = this.props;
    const data = await fetchQuestions(token);
    if (data.response_code !== 0) {
      const dataToken = await fetchToken();
      const questions = await fetchQuestions(dataToken.token);
      return sendQuestions(questions.results);
    }
    console.log('socorro');
    sendQuestions(data.results);
    return this.handleOptions();
    // await fetchQuestionsApi(token);
  }

  handleOptions = () => {
    const MAGIC_NUMBER = 0.5;
    const { questions } = this.props;
    console.log(questions);
    // if (questions.length > 0) {
    const arrOptions = [questions[0].correct_answer, ...questions[0].incorrect_answers];
    const shuffleOptions = arrOptions.sort(() => Math.random() - MAGIC_NUMBER);
    this.setState({ options: shuffleOptions });
    // }
  };

  render() {
    const { questions, loading } = this.props;
    const { options } = this.state;
    return (
      <section>
        <h5 data-testid="question-category">
          {!loading && questions[0].category}
        </h5>
        <h5 data-testid="question-text">
          {!loading && questions[0].question}
        </h5>
        <div data-testid="answer-options">
          {options.map((option, index) => (
            <button
              data-testid={ (option === questions[0].correct_answer
              ) ? 'correct-answer' : `wrong-answer-${index}` }
              type="button"
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
  console.log(state);
  return {
    questions: state.questionsReducer.questions,
    loading: state.questionsReducer.loading,
  };
};
const mapDispatchToProps = (dispatch) => ({
  // fetchQuestionsApi: (token) => dispatch(fetchQuestionsAction(token)),
  sendQuestions: (token) => dispatch(getQuestions(token)),
});

GameMain.propTypes = {
  fetchQuestionsApi: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(GameMain);
