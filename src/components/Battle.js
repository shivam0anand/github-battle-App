import React, { Component } from "react";

class Battle extends Component {
  state = {
    user1: "",
    user2: "",
    userOneData: null,
    userTwoData: null,
    winner: null,
    looser: null
  };
  // startCompare

  // TODO:
  // 1 - Make an whatever mathod
  // 2 - Inside that Grab data of both users.
  // 3 - Add business logic for comparing users
  // 4 - set the winner

  startBattle = e => {
    const { userOneData, userTwoData } = this.state;
    const userOneScore =
      `${userOneData.followers}` * 1 +
      `${userOneData.following}` * 1 +
      `${userOneData.public_repos}` * 0.5;
    const userTwoScore =
      `${userTwoData.followers}` * 1 +
      `${userTwoData.following}` * 1 +
      `${userTwoData.public_repos}` * 0.5;
    let winner;

    // console.log(score1);
    // console.log(score2);
    if (userOneScore > userTwoScore) {
      winner = {
        name: userOneData.name,
        score: userOneScore
      };
    } else {
      winner = {
        name: userTwoData.name,
        score: userTwoScore
      };
    }

    this.setState({
      winner
    });
  };

  onUpdateUser = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  fetchUserData = (user, userIdentifier) => {
    fetch(`https://api.github.com/users/${user}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          [userIdentifier]: data
        });
      });
  };

  onSubmitUser = (e, { onUser }) => {
    e.preventDefault();
    const { user1, user2 } = this.state;

    onUser === "user1"
      ? this.fetchUserData(user1, "userOneData")
      : this.fetchUserData(user2, "userTwoData");
  };

  render() {
    const { user1, user2, userOneData, userTwoData, winner } = this.state;

    return (
      <div className="wrapper section">
        <div className="grid-col-2 user-prompt">
          <div className="user-prompt-01">
            <h1>Player One</h1>
            <div>
              {userOneData ? (
                <div>
                  {/* {userOneData.login} */}
                  <div className="container">
                    <img src={userOneData.avatar_url}></img>
                    <h1>{userOneData.name}</h1>
                    <p>location: {userOneData.location}</p>
                    {/* <p>{userOneData.bio.trim() || "Atleat Update your Bio."}</p> */}
                    <p>Followers: {userOneData.followers}</p>
                    <p>Following: {userOneData.following}</p>
                    <p>public_repos: {userOneData.public_repos}</p>
                    <p className="red">{userOneData.blog}</p>
                  </div>
                </div>
              ) : (
                <>
                  <form
                    onSubmit={e => this.onSubmitUser(e, { onUser: "user1" })}
                  >
                    <div className="form-group">
                      <input
                        name="user1"
                        className="form-control"
                        onChange={this.onUpdateUser}
                        placeholder="Github username"
                        type="text"
                        value={user1}
                      />
                    </div>
                    <div className="form-group col-sm-4 col-sm-offset-4">
                      <button type="submit" className="btn">
                        Submit
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
          <div className="user-prompt-02">
            <h1>Player Two</h1>
            <div className="col-sm-12">
              {userTwoData ? (
                <div>
                  {/* {userTwoData.login} */}
                  <div className="container">
                    <img src={userTwoData.avatar_url}></img>
                    <h1>{userTwoData.name}</h1>
                    <p>location: {userTwoData.location}</p>
                    {/* <p>{userTwoData.bio.trim() || "Atleat Update your Bio."}</p> */}
                    <p>Followers: {userTwoData.followers}</p>
                    <p>Following: {userTwoData.following}</p>
                    <p>public_repos: {userTwoData.public_repos}</p>
                    <p className="red">{userTwoData.blog}</p>
                  </div>
                </div>
              ) : (
                <>
                  <form
                    onSubmit={e => this.onSubmitUser(e, { onUser: "user2" })}
                  >
                    <div className="form-group">
                      <input
                        name="user2"
                        className="form-control"
                        onChange={this.onUpdateUser}
                        placeholder="Github username"
                        type="text"
                        value={user2}
                      />
                    </div>
                    <div className="form-group ">
                      <button
                        type="submit"
                        className="btn btn-block btn-success"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="center">
          {userOneData && userTwoData ? (
            <button className="start-battle" onClick={this.startBattle}>
              Start Battle
            </button>
          ) : (
            ""
          )}
          {winner ? (
            <>
              <p>WINNER: {winner.name}</p>
              <p>WinnerScore:{winner.score}</p>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default Battle;
