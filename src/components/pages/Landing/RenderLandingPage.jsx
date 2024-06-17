import React from 'react';
import GrantRatesByOfficeImg from '../../../styles/Images/bar-graph-no-text.png';
import GrantRatesByNationalityImg from '../../../styles/Images/pie-chart-no-text.png';
import GrantRatesOverTimeImg from '../../../styles/Images/line-graph-no-text.png';
import HrfPhoto from '../../../styles/Images/paper-stack.jpg';
import '../../../styles/RenderLandingPage.less';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
// for the purposes of testing PageNav
import PageNav from '../../common/PageNav';

function RenderLandingPage(props) {
  const scrollToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  const history = useHistory();

  return (
    <div className="main">
      <div className="header">
        <div className="header-text-container">
          <h1>Asylum Office Grant Rate Tracker</h1>
          <h3>
            The Asylum Office Grant Rate Tracker provides asylum seekers,
            researchers, policymakers, and the public an interactive tool to
            explore USCIS data on Asylum Office decisions
          </h3>
        </div>
      </div>

      <div className="graphs-section">
        <div className="graph grant-rates-by-office-graph-container">
          <img src={GrantRatesByOfficeImg} alt="Grant Rates by Office" className="gr-office-img" />
          <p>Grant Rates by Office</p>
        </div>
        <div className="graph grant-rates-by-nationality-container">
          <img src={GrantRatesByNationalityImg} alt="Grant Rates by Nationality" className="gr-nationality-img" />
          <p>Grant Rates by Nationality</p>
        </div>
        <div className="graph grant-rates-over-time-container">
          <img src={GrantRatesOverTimeImg} alt="Grant Rates Over Time" className="gr-overtime-img" />
          <p>Grant Rates Over Time</p>
        </div>
      </div>

      <div className="view-more-data-btn-container">
        <Button
          type="default"
          style={{ backgroundColor: '#404C4A', color: '#FFFFFF' }}
          onClick={() => history.push('/graphs')}
        >
          View the Data
        </Button>
      </div>

      <div className="middle-section">
        <div className="hrf-img-container">
          <img src={HrfPhoto} alt="Human Rights First" className="hrf-img" />
        </div>
        <div className="middle-section-text-container">
          <h3>
            Human Rights First has created a search tool to give you a
            user-friendly way to explore a data set of asylum decisions between
            FY 2016 and May 2021 by the USCIS Asylum Office, which we received
            through a Freedom of Information Act request. You can search for
            information on asylum grant rates by year, nationality, and asylum
            office, visualize the data with charts and heat maps, and download
            the data set
          </h3>
        </div>
      </div>

      <div className="bottom-section">
        <div className="graph grant-rates-by-office-graph-container">
          <img src={GrantRatesByOfficeImg} alt="Grant Rates by Office" className="gr-office-img" />
          <p>Grant Rates by Office</p>
        </div>
        <div className="graph grant-rates-by-nationality-container">
          <img src={GrantRatesByNationalityImg} alt="Grant Rates by Nationality" className="gr-nationality-img" />
          <p>Grant Rates by Nationality</p>
        </div>
        <div className="graph grant-rates-over-time-container">
          <img src={GrantRatesOverTimeImg} alt="Grant Rates Over Time" className="gr-overtime-img" />
          <p>Grant Rates Over Time</p>
        </div>
      </div>

      <p onClick={() => scrollToTop()} className="back-to-top">
        Back To Top ^
      </p>
    </div>
  );
}

export default RenderLandingPage;


