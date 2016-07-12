$(document).ready(function() {

  var listQns = [{
    qns: 'Shiok means very awesome.',
    correctAns: 'true'
  }, {
    qns: 'Wa Lau Eh means you are stupid.',
    correctAns: 'false'
  }, {
    qns: 'I don\'t know sia means I don\'t know prawns.',
    correctAns: 'false'
  }, {
    qns: 'You know hor means you know who is Hor.',
    correctAns: 'false'
  }, {
    qns: 'Rojak is a food.',
    correctAns: 'true'
  }, {
    qns: 'I lub you means I love you.',
    correctAns: 'true'
  }, {
    qns: 'How ah.. means what should we do?',
    correctAns: 'true'
  }, {
    qns: 'Siam Lah means \"Excuse me, could you please make way?\"',
    correctAns: 'true'
  }, {
    qns: 'Bojio means to complain whenever someone did something with you.',
    correctAns: 'false'
  }, {
    qns: 'Blur like sotong means as mysterious as a squid.',
    correctAns: 'false'
  }];

  function Game(question) {
    this.question = question;
    this.rightAnsMsg = 'Steady lar!';
    this.wrongAnsMsg = 'Wrong Lah!';
    this.player1 = 'Player 1';
    this.player2 = 'Player 2';
    this.$player1 = $('#player1');
    this.$player2 = $('#player2');
    this.player1Score = 0;
    this.player2Score = 0;
    this.turn = 1;
    this.index = 0;
    this.currentQns = 1;
    this.$messageBox = $('#message-box');
    this.$questionHeader = $('#question-header');
    this.$playerTurn = $('#player-turn');
    this.$clickStart = $('#start-quiz');
    this.$clickRestart = $('#restart-quiz');
    this.$unhideQuestionBox = $('.question-box');
    this.$remarks = $('#remarks');
    this.$clickAnswer = $('.answer');
  }

  Game.prototype = {
    constructor: Game,

    numberOfQuestions: function() {
      return this.question.length;
    },

    setUpGame: function() {
      // this one adds an event listener to the click start button -> when it is clicked, it shows all the questions
      this.$clickStart.click(this.showAnswer.bind(this));
      // adding click event listener to all answers -> when answers are click it runs selectAnswer and binds it to this
      this.$clickAnswer.click($.proxy(this.selectAnswer, this));
      // adding ... and it calls the restart function
      this.$clickRestart.click(this.restart.bind(this));
      this.numberOfQuestions();
    },

    showAnswer: function() {
      this.$clickStart.hide();
      this.$unhideQuestionBox.show();
    },

    selectAnswer: function(ev) {
      //check the answer if true or false
      var result = ev.target.id;
      this.playTurn(result);
    },

    playTurn: function(trueFalseId) {
      //checkturn and updateScore
      if (this.turn == 1) {
        this.updateScore(this.index, trueFalseId);
        this.setMsg(this.$playerTurn, this.player2 + '\'s turn');
        this.turn = 2;
      } else if (this.turn == 2) {
        this.updateScore(this.index, trueFalseId);
        this.setMsg(this.$playerTurn, this.player1 + '\'s turn');
        this.turn = 1;
      }

      //output question
      this.index++;
      this.setMsg(this.$messageBox, this.question[this.index].qns);

      //increase current question number
      this.currentQns++;
      this.setMsg(this.$questionHeader, 'Question ' + this.currentQns);
    },

    updateScore: function(x, trueFalseId) {

      switch (this.turn) {
        case 1:
          if (trueFalseId == this.question[x].correctAns) {
            this.player1Score++;
            this.setMsg(this.$player1, this.player1Score);
            this.setMsg(this.$remarks, this.rightAnsMsg);
          } else {
            this.setMsg(this.$remarks, this.wrongAnsMsg);
          }
          break;
        case 2:
          if (trueFalseId == this.question[x].correctAns) {
            this.player2Score++;
            this.setMsg(this.$player2, this.player2Score);
            this.setMsg(this.$remarks, this.rightAnsMsg);
          } else {
            this.setMsg(this.$remarks, this.wrongAnsMsg);
          }
          break;
      }

      if (this.isGameOver()) {
        this.whoWon();
      }
    },
    //set Message
    setMsg: function(destination, message) {
      destination.text(message);
    },

    // check winner
    whoWon: function() {
      if (this.player1Score > this.player2Score) {
        this.setMsg(this.$remarks, "Player 1 Wins Lor!");
        this.$playerTurn.hide();

      } else if (this.player1Score < this.player2Score) {
        this.setMsg(this.$remarks, "Player 2 Wins Lor!");
        this.$playerTurn.hide();
      } else {
        this.setMsg(this.$remarks, "It\'s a Draw Lah!");
        this.$playerTurn.hide();
      }

    },

    //check if gameover and check winner
    isGameOver: function() {
      if (this.currentQns == this.numberOfQuestions()) {
        return true;
      }
    },

    restart: function() {
      this.player1Score = 0;
      this.player2Score = 0;
      this.currentQns = 1;
      this.index = 0;
      this.turn = 1;
      this.setMsg(this.$remarks, 'Remarks!');
      this.setMsg(this.$player1, 0);
      this.setMsg(this.$player2, 0);
      this.setMsg(this.$messageBox, this.question[0].qns);
      this.$playerTurn.show();
      this.$unhideQuestionBox.hide();
      this.setMsg(this.$questionHeader, 'Question 1');
      this.$clickStart.show();
    }
  };

  var game1 = new Game(listQns);
  game1.setUpGame();

  // document ready ends here
});
