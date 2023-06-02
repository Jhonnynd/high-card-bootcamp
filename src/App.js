import React from "react";
import PlayingCards from "./components/PlayingCards";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
      scoreboard: [0, 0],
      startedGame: false,
      roundWinner: 0,
      totalScoreboard: [0, 0],
    };
  }

  dealCards = () => {
    let updatedScoreboard = [...this.state.scoreboard];
    let updatedCurrCards = this.state.cardDeck.slice(-2);
    let newRoundWinner = 0;

    if (updatedCurrCards[0].rank > updatedCurrCards[1].rank) {
      newRoundWinner = 1;
      updatedScoreboard[0] += 1;
    } else {
      newRoundWinner = 2;
      updatedScoreboard[1] += 1;
    }

    this.setState((state) => ({
      cardDeck: state.cardDeck.slice(0, -2),
      currCards: updatedCurrCards,
      scoreboard: updatedScoreboard,
      roundWinner: newRoundWinner,
      startedGame: true,
    }));
  };

  resetGame = () => {
    const updatedTotalScoreboard = [...this.state.totalScoreboard];

    if (this.state.scoreboard[0] > this.state.scoreboard[1]) {
      updatedTotalScoreboard[0] += 1;
    }
    if (this.state.scoreboard[1] > this.state.scoreboard[0]) {
      updatedTotalScoreboard[1] += 1;
    }

    this.setState({
      cardDeck: makeShuffledDeck(),
      currCards: [],
      gameStarted: false,
      startedGame: 0,
      roundWinner: 0,
      scoreboard: [0, 0],
      totalScoreboard: updatedTotalScoreboard,
    });
  };

  render() {
    const currCardElems = this.state.currCards.map(({ name, suit }) => (
      // Give each list element a unique key
      <div key={`${name}${suit}`}>
        {name} of {suit}
      </div>
    ));

    const numRoundsLeft = this.state.cardDeck.length / 2;

    return (
      <div className="App">
        <header className="App-header">
          <Container>
            <Row>
              <Col>
                <h2>Player 1</h2>
                {this.state.currCards.length > 0 && (
                  <PlayingCards
                    name={this.state.currCards[0].name}
                    suit={this.state.currCards[0].suit}
                  />
                )}
                <p>
                  {this.state.scoreboard[0] > 0
                    ? `Rounds won: ${this.state.scoreboard[0]}`
                    : "Rounds won: 0"}
                </p>
                <p>
                  {this.state.totalScoreboard[0] > 0
                    ? `Total games won: ${this.state.totalScoreboard[0]}`
                    : "Total games won: 0"}
                </p>
              </Col>
              <Col>
                <h3>High Card 🚀</h3>
                {currCardElems}

                {/* {console.log(this.state.currCards)}
          {console.log(this.state.currCards[0]?.rank)} */}
                <br />
                <button onClick={() => this.dealCards(numRoundsLeft)}>
                  Deal
                </button>
                <p>
                  {this.state.startedGame && this.state.roundWinner > 0
                    ? `Player  ${this.state.roundWinner} has won!`
                    : ""}
                </p>
                <p>
                  {this.state.startedGame && this.state.scoreboard[0] > 0
                    ? `Player  1 has won a total of ${this.state.scoreboard[0]} rounds!`
                    : ""}
                </p>
                <p>
                  {this.state.startedGame && this.state.scoreboard[1] > 0
                    ? `Player  2 has won a total of ${this.state.scoreboard[1]} rounds!`
                    : ""}
                </p>
                <p>
                  {numRoundsLeft > 0 && numRoundsLeft < 26
                    ? `${numRoundsLeft} rounds left!`
                    : numRoundsLeft === 0 &&
                      this.state.scoreboard[0] > this.state.scoreboard[1]
                    ? "Player 1 has won the game!"
                    : numRoundsLeft === 0 &&
                      this.state.scoreboard[1] > this.state.scoreboard[0]
                    ? "Player 2 has won the game!"
                    : this.state.startedGame &&
                      this.state.scoreboard[0] === this.state.scoreboard[1]
                    ? "IT WAS A TIE!"
                    : ""}
                </p>
                {numRoundsLeft === 0 ? (
                  <button onClick={() => this.resetGame(numRoundsLeft)}>
                    Reset game!
                  </button>
                ) : (
                  ""
                )}
                <br />
              </Col>
              <Col>
                <h2>Player 2</h2>
                {this.state.currCards.length > 0 && (
                  <PlayingCards
                    name={this.state.currCards[1].name}
                    suit={this.state.currCards[1].suit}
                  />
                )}
                <p>
                  {this.state.scoreboard[1] > 0
                    ? `Rounds won: ${this.state.scoreboard[0]}`
                    : "Rounds won: 0"}
                </p>
                <p>
                  {this.state.totalScoreboard[1] > 0
                    ? `Total games won: ${this.state.totalScoreboard[1]}`
                    : "Total games: 0"}
                </p>
              </Col>
            </Row>
          </Container>
        </header>
      </div>
    );
  }
}
export default App;
