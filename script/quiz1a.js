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
    this.$player1 = $('#player1');
    this.$player2 = $('#player2');
    this.player1Score = 0;
    this.player2Score = 0;
    this.turn = 1;
    this.index = 0;
    this.$messageBox = $('#messageBox');
    this.$questionHeader = $('#question-header');
    this.$playerTurn = $('#player-turn');
    this.$clickTrue = $('#true');
    this.$clickFalse = $('#false');
    this.$clickStart = $('.start-quiz');
    this.currentQns = 1;
    this.$unhideQuestionBox = $('.question-box');
    this.$remarks = $('#remarks');

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
      //output question
      this.index++;
      this.setMsg(this.$messageBox, this.question[this.index].qns);

      //increase current question number
      this.currentQns++;
      this.setMsg(this.$questionHeader, 'Question ' + this.currentQns);

      //checkturn and updateScore
      if (this.gameover()) {
        this.whoWon();
      } else {
      if (this.turn == 1) {
        this.updateScore(this.index);
        this.setMsg(this.$playerTurn, this.player2 + '\'s turn');
        this.turn = 2;
      } else if (this.turn == 2) {
        this.updateScore(this.index);
        this.setMsg(this.$playerTurn, this.player1 + '\'s turn');
        this.turn = 1;
      }
    }
    },

    updateScore: function(x) {

        if (this.$clickTrue == this.question[x].correctAns) {
          if (this.turn == 1) {
            this.player1Score++;
            console.log(this.$player1);
            this.setMsg(this.$player1, this.player1Score);
          } else if (this.turn == 2) {
            this.player2Score++;
            this.setMsg(this.$player2, this.player2Score);
          }
        } else if (this.$clickFalse == this.question[x].correctAns) {
          if (this.turn == 1) {
            this.player1Score++;
            this.setMsg(this.$player1, this.player1Score);
          } else if (this.turn == 2) {
            this.player2Score++;
            this.setMsg(this.$player2, this.player2Score);
          }
        }
    },

    setMsg: function(destination, message) {
      destination.text(message);
    },

    // check winner
    whoWon: function() {
      if (this.player1Score > this.player2Score) {
        this.setMsg(this.$remarks, "Player 1 Wins Lor!");
      } else if (this.player1Score < this.player2Score) {
        this.setMsg(this.$remarks, "Player 2 Wins Lor!");
      } else {
        this.setMsg(this.$remarks, "It\'s a Draw Lah!");
      }
    },

    //check if gameover and check winner
    isGameOver: function() {
      if (this.currentQns == this.numberOfQuestions()) {
        this.turn = 3;
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
