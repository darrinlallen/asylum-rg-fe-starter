import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import CitizenshipMapAll from './Graphs/CitizenshipMapAll';
import CitizenshipMapSingleOffice from './Graphs/CitizenshipMapSingleOffice';
import TimeSeriesAll from './Graphs/TimeSeriesAll';
import OfficeHeatMap from './Graphs/OfficeHeatMap';
import TimeSeriesSingleOffice from './Graphs/TimeSeriesSingleOffice';
import YearLimitsSelect from './YearLimitsSelect';
import ViewSelect from './ViewSelect';
import axios from 'axios';
import { resetVisualizationQuery } from '../../../state/actionCreators';
import { colors } from '../../../styles/data_vis_colors';
import ScrollToTopOnMount from '../../../utils/scrollToTopOnMount';

const { background_color } = colors;

function GraphWrapper({ set_view, dispatch }) {
  const { office, view } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!view) {
      set_view('time-series');
    }
  }, [view, set_view]);

  const renderGraph = () => {
    if (!office) {
      switch (view) {
        case 'time-series':
          return <TimeSeriesAll />;
        case 'office-heat-map':
          return <OfficeHeatMap />;
        case 'citizenship':
          return <CitizenshipMapAll />;
        default:
          return null;
      }
    } else {
      switch (view) {
        case 'time-series':
          return <TimeSeriesSingleOffice office={office} />;
        case 'citizenship':
          return <CitizenshipMapSingleOffice office={office} />;
        default:
          return null;
      }
    }
  };

  const fetchData = async (endpoint, params, stateSettingCallback) => {
    try {
      setLoading(true);
      const result = await axios.get(`https://hrf-asylum-be-b.herokuapp.com/${endpoint}`, { params });
      stateSettingCallback(view, office, result.data);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStateWithNewData = (years, view, office, stateSettingCallback) => {
    const params = { from: years[0], to: years[1] };
    if (office && office !== 'all') {
      params.office = office;
    }
    
    let endpoint;
    switch (view) {
      case 'time-series':
        endpoint = 'fiscalSummary';
        break;
      case 'citizenship':
        endpoint = 'citizenshipSummary';
        break;
      default:
        endpoint = 'fiscalSummary';
        break;
    }
    fetchData(endpoint, params, stateSettingCallback);
  };

  const clearQuery = (view, office) => {
    dispatch(resetVisualizationQuery(view, office));
  };

  return (
    <div
      className="map-wrapper-container"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        minHeight: '50px',
        backgroundColor: background_color,
      }}
    >
      <ScrollToTopOnMount />
      {loading ? <div>Loading...</div> : error ? <div>Error loading data</div> : renderGraph()}
      <div
        className="user-input-sidebar-container"
        style={{
          width: '300px',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <ViewSelect set_view={set_view} />
        <YearLimitsSelect
          view={view}
          office={office}
          clearQuery={clearQuery}
          updateStateWithNewData={updateStateWithNewData}
        />
      </div>
    </div>
  );
}

GraphWrapper.propTypes = {
  set_view: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(GraphWrapper);
