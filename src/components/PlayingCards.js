import React from "react";

function importAll(r) {
  let images = {};
  r.keys().forEach((key) => {
    let imageKey = key.replace("./", "");
    images[imageKey] = r(key);
  });
  return images;
}

const images = importAll(
  require.context("../img/", false, /\.(png|jpe?g|svg)$/)
);

class PlayingCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { name, suit } = this.props;
    let card = "";
    name === "King"
      ? (card = card.concat("K"))
      : name === "Queen"
      ? (card = card.concat("Q"))
      : name === "Jack"
      ? (card = card.concat("J"))
      : name === "Ace"
      ? (card = card.concat("A"))
      : (card = card.concat(name));

    card = card.concat(suit.charAt(0));

    console.log(card);
    return <img width="150px" src={images[`${card}.png`]} alt="Card" />;
  }
}

export default PlayingCards;
