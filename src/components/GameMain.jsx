import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchQuestionsAction from '../redux/actions/questionsAction';

class GameMain extends Component {

  componentDidMount() {
    this.getQuestions();
  }

  getQuestions = () => {
    const token = localStorage.getItem('teken');
    console.log(token);
    const { state } = this.props;
    console.log(state);
    const { fetchQuestionsApi } = this.props;
    fetchQuestionsApi(token);
  }

  render() {
    return (
      <section>
        <h5 data-testid="question-category"> categoria </h5>
        <h5 data-testid="question-text"> pergunta </h5>
        <h5 data-testid="question-category"> alternativas</h5>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({ state });

const mapDispatchToProps = (dispatch) => ({
  fetchQuestionsApi: (token) => dispatch(fetchQuestionsAction(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameMain);
