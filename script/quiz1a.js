$(document).ready(function() {

  var listQns = [{
    qns: 'Shiok means very awesome.',
    correctAns: 1
  }, {
    qns: 'Wa Lau Eh means you are stupid.',
    correctAns: 0
  }, {
    qns: 'I don\'t know sia means I don\'t know prawns.',
    correctAns: 0
  }, {
    qns: 'You know hor means you know who is Hor.',
    correctAns: 0
  }, {
    qns: 'Rojak is a food.',
    correctAns: 1
  }, {
    qns: 'I lub you means I love you.',
    correctAns: 1
  }, {
    qns: 'How ah.. means what should we do?',
    correctAns: 1
  }, {
    qns: 'Siam Lah means \"Excuse me, could you please make way?\"',
    correctAns: 1
  }, {
    qns: 'Bojio means to complain whenever someone did something with you.',
    correctAns: 0
  }, {
    qns: 'Blur like sotong means as mysterious as a squid.',
    correctAns: 0
  }];

  function Game(question) {
    this.question = question;
    this.rightAnsMsg = 'Steady lar!';
    this.wrongAnsMsg = 'Wrong Lah!';
    this.player1 = 'Player 1';
    this.player2 = 'Player 2';
    this.player1Score = 0;
    this.player2Score = 0;
    this.turn = 1;
    this.$messageBox = $('#messageBox');
    this.$questionHeader = $('#question-header');
    this.$playerTurn = $('#player-turn');
    this.$clickTrue = $('#true');
    this.$clickFalse = $('#false');
    this.$clickStart = $('.start-quiz');
    this.currentQns = 1;
    this.$unhideQuestionBox = $('.question-box');
  }

  Game.prototype = {
    constructor: Game,

    numberOfQuestions: function() {
      return this.question.length;
    },

    setUpGame: function() {
      this.$clickStart.click(this.selectAnswer.bind(this));
      this.numberOfQuestions();
    },

    selectAnswer: function() {
      this.$unhideQuestionBox.show();
      this.$clickTrue.click(this.playTurn.bind(this));
      this.$clickFalse.click(this.playTurn.bind(this));
    },

    playTurn: function() {
      // this.setMsg(this.question[0].qns);
      this.currentQns++;
      this.setMsg(this.$questionHeader, 'Question ' + this.currentQns);

      if (this.turn == 1) {
        this.setMsg(this.$playerTurn, this.player2 + '\'s turn');
        this.turn = 2;
      } else if (this.turn == 2) {
        this.setMsg(this.$playerTurn, this.player1 + '\'s turn');
        this.turn = 1;
      }
      game1.isGameOver();
    },

    checkAnswer: function() {

      return true;
    },

    updateScore: function() {
      // if (this.turn == 1) {
      //   if ()
      //   this.player1Score
      // };
      //
    },


    setMsg: function(destination, message) {
      destination.text(message);
    },

    whoWon: function() {

    },

    isGameOver: function() {
      if (this.currentQns == this.numberOfQuestions()) {
        return true;
      }
    },

    restart: function() {
      this.player1Score = 0;
      this.player2Score = 0;
    }
  };

  var game1 = new Game(listQns);
  game1.setUpGame();




  // document ready ends here
});
