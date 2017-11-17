import React, { Component } from 'react';

export default class SignUp extends Component {
  render() {
    return (
      <div className="container bg-lightgrey" style={styles.container}>
        <div className="row">
          <div className="medium-6 large-5">
            <strong style={styles.explore}>EXPLORE</strong>
            <h2>Sign Up Now for Free!</h2>
            <p >
              Create a free profile for your church or sign-up for one of our premium accounts to unlock some amazing
              features.You can also sign-up as a worshipper to access churches in your area.
            </p>
          </div>
          <div className="medium-6 large-7 text-right" style={styles.background}>
            <div className="text-right text-right-resp" style={{ marginBottom: 6 }}>
              <em>To have effective worship, you have to have the right kind of technology!<br /> - Pastor Mike Kiley (Home Church - Campbell, CA) </em>

              <form>
                <div style={styles.subscribe} >
                  <input type="text" className="subscribe-home" style={styles.subscribe.input} placeholder="Subscribe"/>
                 <i className="fa fa-chevron-right " style={styles.subscribe.input.icon}></i>
               </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    paddingLeft: "1.5625rem",
    paddingRight: "1.5625rem",
    paddingBottom: "37px"
  },
  explore: {
    color: "#00848b",
    fontWeight: 700
  },
  background: {
    background: "url(/images/quotes.jpg)-7px -8px no-repeat",
    backgroundSize: "80px 60px"
  },
  subscribe: {
    width: "500px",
    input: {
      padding: "13px",
      fontSize: "19px",
      fontWeight: "500",
      boxShadow: "-1px 5px 8px #ccc",
      icon: {
        fontSize: "28px"
      }
    }
  }
}
