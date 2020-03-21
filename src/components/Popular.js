import React from "react";
import Loading from "./Loading";

class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: "All",
      repos: [],
      loading: false
    };
    this.updateLanguage = this.updateLanguage.bind(this);
  }
  componentDidMount = () => {
    this.setState({ loading: true });
    fetch(
      "https://api.github.com/search/repositories?q=stars:%3E1+language:All&sort=stars&order=desc&type=Repositories"
    )
      .then(res => res.json())
      .then(({ items }) => this.setState({ repos: items, loading: false }));
  };

  //update langauges

  updateLanguage(lang) {
    this.setState(function() {
      return {
        selectedLanguage: lang
      };
    });
  }

  render() {
    var languages = ["All", "javaScript", "Ruby", "java", "CSS", "Python"];
    const { currentRepos } = this.state;
    return (
      <div className="wrapper">
        <div className="popular">
          <button className="hamburger">Languages</button>
          <ul className="languages">
            {languages.map(lang => (
              <li
                style={
                  lang === this.state.selectedLanguage
                    ? { color: "#d0021b" }
                    : null
                }
                onClick={this.updateLanguage.bind(null, lang)}
                key={lang}
              >
                {lang}
              </li>
            ))}
          </ul>
        </div>
        <div className="popularData">
          {this.state.loading ? (
            <Loading />
          ) : (
            this.state.repos.map((repo, index) => (
              <Repo repoData={repo} rank={index + 1} />
            ))
          )}
        </div>
      </div>
    );
  }
}
function Repo(props) {
  const { name, owner } = props.repoData;
  return (
    <div className="data">
      <p className="text-center rank">{"#" + props.rank}</p>
      <img
        style={{
          borderRadius: "50%",
          width: "130px",
          padding: "0 20px",
          height: "130px"
        }}
        src={owner.avatar_url}
      />
      <h1 className="text-center">{name}</h1>
    </div>
  );
}
export default Popular;
