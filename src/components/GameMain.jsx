import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchQuestionsAction from '../redux/actions/questionsAction';

class GameMain extends Component {
  constructor() {
    super();
    this.state = {
      arrOptions: [],
    };
  }

  componentDidMount() {
    this.getQuestions();
  }

  getQuestions = () => {
    const token = localStorage.getItem('token');
    console.log(token);
    // const { state } = this.props;
    // console.log(state);
    const { fetchQuestionsApi } = this.props;
    fetchQuestionsApi(token);
    this.handleOptions();
  }

  handleOptions = () => {
    const { questions } = this.props;
    if (questions.length > 0) {
      const arrOptions = [questions[0].correct_answer, ...questions[0].incorrect_answers];
      this.setState({ arrOptions });
    }
  };

  render() {
    const { questions } = this.props;
    const { arrOptions } = this.state;

    return (
      <section>
        <h5 data-testid="question-category">
          {questions.length > 0 && questions[0].category}
        </h5>
        <h5 data-testid="question-text">
          {questions.length > 0 && questions[0].question}
        </h5>
        <div data-testid="answer-options">
          {console.log(arrOptions)}
          {questions.length > 0 && arrOptions.map((option, index) => (
            <button
              data-testid={ (option === questions[0].correct_answer
              ) ? ('correct_answer') : (`wrong-answer-${index}`) }
              type="button"
              key={ option }
            >
              {option}
            </button>
          ))}
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questionsReducer.questions,
});
const mapDispatchToProps = (dispatch) => ({
  fetchQuestionsApi: (token) => dispatch(fetchQuestionsAction(token)),
});

GameMain.propTypes = {
  fetchQuestionsApi: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(GameMain);
