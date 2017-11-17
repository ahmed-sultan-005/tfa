import React, { Component } from 'react';

export default class NotFound extends Component {
  render() {
    return (
      <div>
        <div className='container errors-page'>
          <div className='row align-center'>
            <div className='small-12 medium-6 columns error-404-lord-column'>
              <div className='header-lord'>Lord,</div>
              <div className='subheader-lord'>have mercy!</div>
              <div className='common-lord'>We can’t seem to find the page that scripture is on.</div>
              <div className='common-lord'>Check back with us once service is over.</div>
            </div>
            <div className='small-12 medium-4 columns'>
              <div className='big-pink-error header-404'>404</div>
              <div className='big-pink-error error-404'>error</div>
              <div className='image-pastor-404 show-for-medium'>
                <img src="/images/error-pages/404-pastor.png" />
              </div>
            </div>
          </div>
        </div>
        <div className='container errors-page-contact'>
          <div className='row align-center'>
            <div className='small-12 medium-8'>
              <p className='text-center'>
                Taking the first steps into any new technology can be daunting and
                we want to help make your transition smooth and stress free. Send us a
                message with your questions or concerns and we will be sure to respond
                promptly.
                <br />
                <br />
                Please fill out the form below.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
