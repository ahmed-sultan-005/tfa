import { FlowRouter } from 'meteor/kadira:flow-router';
import React, {Component} from 'react';
import autoBind from 'react-autobind';
import moment from 'moment';
import MediaQuery from 'react-responsive';
import braintree from 'braintree-web';
import DropZone from 'react-dropzone';
import Calendar from 'rc-calendar';
import { NotificationManager } from 'react-notifications';

// components
import Transaction from '../../components/Transaction.jsx';

export default class ShowChurch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fees: 0.00,
      total: 0,
      saveCard: true,
      paymentsListing: false
    };

    //binding functions
    autoBind(this);
  }
  onDrop(acceptedFiles, rejectedFiles) {
      console.log('Accepted files: ', acceptedFiles);
      console.log('Rejected files: ', rejectedFiles);
  }

  handlePayment(){
    Meteor.call("generateClientToken", (err, clientToken) => {
      if (err) {
        console.log(err);
      } else {

        braintree.client.create({
          authorization: clientToken
        }, function (err, client) {
          client.request({
            endpoint: 'payment_methods/credit_cards',
            method: 'post',
            data: {
              creditCard: {
                number: '4111111111111111',
                expirationDate: '10/20',
                cvv: '123',
                billingAddress: {
                  postalCode: '12345'
                }
              }
            }
          }, function (err, response) {
            // Send response.creditCards[0].nonce to your server
            Meteor.call("newTransaction", response.creditCards[0].nonce, 10, (err, response) => {
              if (err) {
                console.log(err);
              } else {
              }
            });
          });
        });

      }
    });
  }

 onChangeFee(event){
    this.state[event.target.id] = event.target.value;
    this.setState({fees: (((parseInt(this.state.titheText) + parseInt(this.state.offeringText))/100)*4)});
    this.setState({total: ((parseInt(this.state.titheText) +  parseInt(this.state.offeringText)) + parseInt(this.state.fees))});
 }
 onChangeSaveCard(event) {
    this.setState({saveCard: !this.state.saveCard});

 }

 handleGiveData(data) {
  if (!this.state.titheText) { NotificationManager.error("TITHE is required"); return;}
  if (!this.state.offeringText) { NotificationManager.error("Offering Field is required"); return;}
  if (!this.state.cardholderName) { NotificationManager.error("Name on Card is required"); return;}
  if (!this.state.cardNumber) { NotificationManager.error("Credit Card Number is required"); return;}
  if ((this.state.cardNumber.length < 16) || (this.state.cardNumber.length > 16)  ) { NotificationManager.error("Credit Card Number is invalid"); return;}
  if (!this.state.expiryMonth) { NotificationManager.error("Month is required"); return;}
  if (!this.state.expiryYear) { NotificationManager.error("Year is required"); return;}
  if (!this.state.cvv) { NotificationManager.error("Cvv Number is required"); return;}
  if ((this.state.cvv.length < 3) || (this.state.cvv.length > 3)  ) { NotificationManager.error("cvv is invalid"); return;}
  const arguements = this.state;
  const { church } = this.props;
    Meteor.call("generateClientToken", (err, clientToken) => {
      if (err) {
        console.log(err);
      } else {
        braintree.client.create({
          authorization: clientToken
        }, function (err, client) {
          client.request({
            endpoint: 'payment_methods/credit_cards',
            method: 'post',
            data: {
              creditCard: {
                cardholderName: arguements.cardholderName,
                number: arguements.cardNumber,
                expirationMonth: arguements.expiryMonth,
                expirationYear: arguements.expiryYear,
                cvv: arguements.cvv
              }
            }
          }, function (err, response) {

            // Send response.creditCards[0].nonce to your server
            arguements['nonce'] = response.creditCards[0].nonce;
            Meteor.call('payers.new',arguements, (err, result) => {
              if (err) {
                NotificationManager.error(err.message);
              } else {
                arguements['isRecurring'] = arguements.saveCard;
                arguements['amount'] = arguements.total;
                arguements['churchId'] = church._id;
                Meteor.call('payments.new',arguements, (err, result) => {
                  if (err) {
                    NotificationManager.error(err.message);
                  } else {
                      Meteor.call("transactions.braintree.new", {
                        nonce: response.creditCards[0].nonce,
                        amount: arguements.total,
                        recurring: arguements.saveCard,
                        paymentId: result
                      }, (err, response) => {
                        if (err) {
                          NotificationManager.error(err.message);
                        } else {
                          NotificationManager.success("Transaction successful!");
                        }
                      });
                  }
                });
              }
            });
          });
        });
      }
    });
    this.setState({
      paymentsListing: true,
      cardNumber: null,
      titheText: null,
      offeringText: null,
      cardholderName: null,
      expiryMonth: null,
      expiryYear: null,
      cvv: null,
      fees: null,
      total: null
    });

  }

 handleCalenderEventsDisplay(date) {

 }
 onChange(event) {
  this.state[event.target.id] = event.target.value;
 }

 showPaymentListing(event) {
  const { churchTransactions } = this.props;
  this.setState({
      paymentsListing: true
    });
 }

 showProfile(event) {
  this.setState({
      paymentsListing: false
    });
 }
  // let defaultCalendarValue = now.clone();
  // defaultCalendarValue.add(-1, 'M');

  render() {
    const { paymentsListing } = this.state;
    const { churchTransactions } = this.props;
    let defaultCalendarValue = moment();
    defaultCalendarValue.add(-1, 'M');
    const { church } = this.props;
    const currentFullYear = parseInt(moment().format("YYYY"));
    const currentYear = parseInt(moment().format("YY"));
    let givingForm , givingMessage;
    if (Meteor.userId()) {
      givingForm = (
              <div className="mrgn-btm map-service-time columns medium-12 small-12 large-6 giving-service-container"  >
                <div style={styles.mrgnTop}>
                  <span style={styles.givingText}>
                    Giving
                  </span>
                  <span className="pull-right giving-padding" style={styles.givingText}>
                    Share
                  <img src="/images/facebook.png" className="givingFacebook" />
                  </span>
                </div>

                <div className="hrr" style={styles.hrMargin}>

                  <input type="number" style={styles.titheText} id="titheText" name="titheText" autoComplete="off" placeholder="TITHE                $00.00" required value={this.state.titheText} onChange={this.onChangeFee} />
                  <input type="number" style={styles.offeringText} id="offeringText" name="offeringText" autoComplete="off" placeholder="OFFERING         $00.00" required value={this.state.offeringText} onChange={this.onChangeFee} />
                </div>
                <div style={styles.mrgnTop}>
                     <span>
                        <span style={styles.givingText}>
                          Credit Card-4% fee
                        </span>
                     </span>
                     <div>
                        <input type="text" id="cardholderName" className="ccName" name="cardholderName" autoComplete="off" placeholder="NAME ON CARD" required value={this.state.ccName} onChange={this.onChange}  />
                        <input type="text" id="cardNumber" className="ccName" name="cardNumber" placeholder="XXXXXXXXXXXXXXXX" title="A credit card number" required value={this.state.cardNumber} onChange={this.onChange} onBlur={this.onCreditCardValidator}  />
                        <select id='expiryMonth' className="ccExp"  required value={this.state.expiryMonth} onChange={this.onChange} >
                            <option value=''>--SELECT MONTH--</option>
                            <option value='01'>Janaury</option>
                            <option value='02'>February</option>
                            <option value='03'>March</option>
                            <option value='04'>April</option>
                            <option value='05'>May</option>
                            <option value='06'>June</option>
                            <option value='07'>July</option>
                            <option value='08'>August</option>
                            <option value='09'>September</option>
                            <option value='10'>October</option>
                            <option value='11'>November</option>
                            <option value='12'>December</option>
                        </select>

                        <select id='expiryYear' className="ccExp" required value={this.state.expiryYear} onChange={this.onChange}>
                            <option value=''>--SELECT YEAR--</option>
                            <option value={currentYear + 1}> {currentFullYear + 1} </option>
                            <option value={currentYear + 2}> {currentFullYear + 2}
                            </option>
                            <option value={currentYear + 3}> {currentFullYear + 3}
                            </option>
                            <option value={currentYear + 4}> {currentFullYear + 4}
                            </option>
                        </select>
                        <input type="number" id="cvv" className="ccCCV" name="cvcText" autoComplete="off" placeholder="XXX" required value={this.state.cvv} onChange={this.onChange}  />
                        <label style={styles.ccText}>
                                        Save Card
                         <input type="checkbox" id="saveCard"  className="saveCard" required  value={this.state.saveCard} onChange={this.onChangeSaveCard} />
                        </label>
                     </div>
                    <div style={styles.bankAccount}>
                       <input type="text" style={styles.titheText} id="titheText" name="titheText" autoComplete="off" value= {this.state.fees} placeholder="FEES                $00.00" disabled  />
                       <span className="isEqual"> = </span>
                      <input type="text" style={styles.offeringText} id="totalFee" name="offeringText" autoComplete="off" value={this.state.total} placeholder="TOTAL             $00.00" disabled  />
                      <br />
                      <button type="button" className="pull-right success button" onClick={this.handleGiveData} >GIVE</button>
                      <button type="button" className="cnclButn pull-right success button">CANCEL</button>
                    </div>
                </div>
              </div> );
    } else {
       givingForm = (
              <div className="mrgn-btm map-service-time columns medium-12 small-12 large-6 giving-service-container" style={styles.givingMessage}  >
               <div style={styles.mrgnTop}>
                  <span style={styles.givingText}>
                    Giving
                  </span>
                  <span className="pull-right giving-padding" style={styles.givingText}>
                    Share
                  <img src="/images/facebook.png" className="givingFacebook" />
                  </span>
                </div>

                <label style={styles.labelSignIn}> Please Sign In to give the Donations
                </label>
                <a href="/login" className="button register_button primary-button" style={styles.loginButton}>Login</a>
              </div> );
    }

    $(document).foundation();
    return (
      <div  className="landing-contact container establishment-register" style={styles.container}>
        <div className="row">

        <div className="columns large-10 medium-10" style={{paddingLeft: "1px"}}>
        <div  id="container" style={styles.innerContainer}>
          <div id='cover_container' style={styles.coverContainer}>
          <div className="pull-left">
            <div style={styles.uploadCoverIcon}><i className="fa fa-camera"></i></div>
          </div>
          <div id="name-on-header"><b>{church ? church.name : undefined}</b></div>
            <div id='info_box' style={styles.infoBox}>
              <div id="profile_img">
                <img src='/images/church.jpg' className='avatar_img' style={styles.avatar} />
              </div>
              <div className="prof-pic-camera" style={styles.avatarUploadIcon}>
                <div><i className="fa fa-camera"></i></div>
              </div>

              <div id="info-box">
                <div id="info-content">
                  <div>
                  <MediaQuery minDeviceWidth={590}>
                    <i className="fa fa-phone" style={{position: "relative"}}></i>
                    </MediaQuery>
                    <input type="text" name="phone" className="phone-field" placeholder="phone" />
                    <i className="fa fa-pencil pencil-search" ></i>

                  </div>

                </div>
              </div>

              <div className="join-bookmark">
                <section className="join">
                   <i className="fa fa-home" style={styles.topBtn}></i>
                   <span>
                    <a href="#" style={styles.topBtnIcon}> Join </a>
                   </span>
                </section>
                <MediaQuery minDeviceWidth={499}>
                <section className="bookmark">
                  <i className="fa fa-bookmark" style={styles.topBtn}></i>
                   <span>
                    <a href="#" style={styles.topBtnIcon}> Bookmark </a>
                   </span>
                </section>
                </MediaQuery>
                  <section className="ed-en-d">
                     <i className="fa fa-edit" onClick={this.showProfile} style={styles.topIcons}></i>
                     <i className="fa fa-envelope" style={styles.topIcons}></i>
                     <i className="fa fa-dollar" onClick={this.showPaymentListing} style={styles.topIcons}></i>
                  </section>


              </div>
              <div className="clear"></div>
            </div>
          </div>
          { !paymentsListing && (
          <div id="container-content">
            <div className="row">
              <div className="mrgn-btm map-service-time columns medium-12 small-12 large-6 map-service-container" style={styles.mapContainer}  >
                <div className="map-input-area">
                    <input type="text" name="mapTextArea" className="mapTextArea" placeholder="Map Text Area" />
                    <span className="fa fa-pencil map-pencil "></span>
                </div>
                <img src="/images/map.png" className="map-app" />
                <div className="serviceTime">
                  <span>service Time</span>
                  <div className="pull-right" >
                    <i className="fa fa-plus pull-right" style={styles.plusIcon}></i>
                  </div>
                  <div>
                    <i className="fa fa-pencil pull-right" style={styles.editIcon}></i>
                  </div>
                  <p className="service-time-text">
                    Create service times below by selecting the day of the week, time and type of service. Use the same line foe multiple worship times that occur on the same day. i-e. Sunday worship at 9:00am & 11:00am.
                  </p>
                </div>
              </div>
              <div className="mrgn-btm map-service-time columns small-12 medium-12 large-6" style={styles.bodyContainerHeader} >
                <section className="about-us-sec">
                  <div className="about-us">
                    <span className="text-about-us">
                      About Us
                    </span>
                    <i className="fa fa-pencil" style={styles.bodyContainerHeaderIcon} ></i>
                  </div>
                  <textarea className="description-about" placeholder="Type Description Here" rows="12">

                  </textarea>
                </section>
              </div>
            </div>
          </div>
          )}
          { !paymentsListing && (
          <div id="container-content" style={styles.containerPadding}>
            <div className="row">
              <div className="photoUpload mrgn-btm map-service-time columns medium-12 small-12 large-6 photo-service-container">
                <section style={styles.mrgnTopPhotos}>
                  <span style={styles.givingText}>
                    Photos
                  </span>
                </section>
                <DropZone className="dropzone photoUploadInner" onDrop={this.onDrop} multiple={false} accept={"image/*"}>
                  <div className="photoUploadArea">
                    <div className="photosAdd">
                      <i className="fa fa-plus" style={styles.photoUploadAdd}></i>
                      <span className="addImageText">
                        Add Image
                      </span>
                    </div>
                  </div>
                </DropZone>
             </div>
              <div className="member-login-area mrgn-btm map-service-time columns small-12 medium-12 large-6" style={styles.memberContainer} >

                  <section style={styles.mrgnTopPhotos}>
                  <span style={styles.givingText}>
                    Members
                  </span>
                </section>

              </div>
            </div>
          </div>
          )}
          { !paymentsListing && (
          <div id="container-content giving-container" style={styles.containerPadding}>
            <div className="row">
              { givingForm }

             <div className="live-streams-area mrgn-btm map-service-time columns small-12 medium-12 large-6" style={styles.liveStremsContainer} >

                  <section style={styles.mrgnTopPhotos}>
                  <span style={styles.givingText}>
                    Live Streams
                  </span>
                </section>

                <div className="calendar-area mrgn-btm map-service-time columns small-12 medium-12 large-6" style={styles.calendarContainer}>
                 <section style={styles.mrgnTopPhotos}>
                  <span style={styles.givingText}>
                    Calendar & Events
                  </span>
                  <i className="fa fa-plus" style={styles.calendarAddIcon}></i>
                </section>
                <div className="upComing">
                  Up Coming Events
                  <Calendar
                    showDateInput={false}
                    defaultValue={moment()}
                    showToday={false}
                    showOk={false}
                    defaultValue={this.props.defaultCalendarValue}
                    onChange={this.handleCalenderEventsDisplay}
                  />
                </div>
              </div>
             </div>
            </div>
            </div>
          )}

           { paymentsListing && (
            <div id="container-content">
              <div className="row">
                <table className="table-bordered">
                  <thead>
                    <tr>
                      <th> Name </th>
                      <th>Email</th>
                      <th> Order Id </th>
                      <th>Amount</th>
                      <th>Status </th>
                      <th>Date </th>
                    </tr>
                  </thead>
                  <tbody>
                    { churchTransactions.map((transaction,index)=>{
                     return <Transaction transaction={ transaction } key={index} />
                    })}
                  </tbody>
                </table>
              </div>
            </div>
           )}

        </div>
       </div>
       <MediaQuery minDeviceWidth={1000}>
         <div className="columns medium-2 large-2">
          <section style={styles.adContainer}>
            <h6> Ad Goes Here </h6>
          </section>
          <br />
          <section style={styles.adContainer}>
            <h6> Ad Goes Here </h6>
          </section>
          <br />
          <section style={styles.adContainer}>
            <h6> Ad Goes Here </h6>
          </section>
         </div>
        </MediaQuery>
       </div>
      </div>

    )
  }
}

const styles = {
  container: {
    padding: "0px"
  },
  innerContainer: {
    width: "100%"
  },
  coverContainer: {
    background: "url('/images/home.jpg')",
    backgroundSize: "100% 100%"
  },
  uploadCoverIcon: {
    margin: "15px"
  },
  infoBox: {
    paddingTop: "65px"
  },
  avatar: {
    borderRadius: "50%"
  },
  avatarUploadIcon: {
    float: "left",
    position: "absolute"
  },
  topBtn: {
    position: "relative",
    paddingLeft: "20px",
    fontSize: "26px",
    paddingTop: "16px"
  },
  topBtnIcon: {
    color: "gray",
    paddingLeft: "10px"
  },
  topIcons: {
    position: "relative",
    paddingLeft: "20px",
    fontSize: "23px",
    paddingTop: "16px"
  },
  bodyContainerHeader: {
    height: "320px",
    border: "1px solid #ccc",
    boxShadow: "3px 1px 2px #ccc"
  },
  bodyContainerHeaderIcon: {
    float: "right",
    marginRight: "10px",
    marginTop: "4px"
  },
  adContainer: {
    width: "209px",
    height: "234px",
    border: "1px solid gray",
    marginLeft: "-26px",
    textAlign: "center",
    paddingTop: "90px"
  },
  containerPadding:{
    paddingTop: "0px"
  },
  memberContainer: {
    background: "white",
    border: "1px solid rgb(204, 204, 204)",
    boxShadow: "rgb(204, 204, 204) 3px 1px 2px",
    height: "174px"
  },
  plusIcon: {
    marginRight: "34px",
    marginTop: "4px",
    border: "1px solid #ccc",
    borderRadius: "50%",
    padding: "3px",
    width: "22px",
    height: "22px"
  },
  editIcon:{
    marginRight: "7px",
    marginTop: "-22px"
  },
  mapContainer: {
    height: "603px"
  },
  givingText:{
    color: "gray",
    fontWeight: "400",
    fontFamily: "inherit"
  },
  titheText: {
    width: "41%",
    marginTop: "13px",
    fontSize: "15px",
    display: "inline-block",
    border: "1px solid #ccc",
    boxSizing: "border-box",
    height: "33px"
  },
  offeringText:{
    width: "41%",
    marginTop: "13px",
    fontSize: "15px",
    display: "inline-block",
    border: "1px solid #ccc",
    boxSizing: "border-box",
    height: "33px",
    float: "right"
  },
   totalFee:{
    width: "41%",
    marginTop: "13px",
    fontSize: "15px",
    display: "inline-block",
    border: "1px solid #ccc",
    boxSizing: "border-box",
    height: "33px",
    float: "right"
  },
  hrMargin:{
    borderBottom: "1px solid #cacaca",
    borderTop: "1px solid #cacaca",
    marginTop: "12px",

  },
  mrgnTop:{
    marginTop: "8px"
  },
  ccText: {
    color: "gray",
    fontWeight: "400",
    fontFamily: "inherit",
    marginTop: "14px"

  },
  bankAccount:{
    borderTop: "1px solid rgb(202, 202, 202)",
    paddingTop: "11px",
    marginTop: "13px"
  },
  photoUploadAdd:{
    border: "1px solid gray",
    borderRadius: "50%",
    padding: "5px"
  },
  mrgnTopPhotos: {
    marginTop: "8px",
    borderBottom: "1px solid rgb(202, 202, 202)",
    paddingBottom: "16px"
  },
  liveStremsContainer:{
    background: "white",
    border:"1px solid rgb(204, 204, 204)",
    boxShadow: "rgb(204, 204, 204) 3px 1px 2px",
  },
  calendarContainer: {
    background: "white",
    border:"1px solid rgb(204, 204, 204)",
    boxShadow: "rgb(204, 204, 204) 3px 1px 2px",
    height: "auto"
  },
  calendarAddIcon:{
    border: "1px solid #ddd",
    borderRadius: "50%",
    padding: "5px",
    float: "right",
    marginRight: "6px",
    color: "#ddd",
    fontSize: "11px"
  },
  givingMessage: {
    height: "368px"
  },
  labelSignIn: {
    textAlign: "center",
    fontSize: "17px",
    paddingTop: "104px"
  },
  loginButton: {
    margin: "24px 180px"
  }
}
