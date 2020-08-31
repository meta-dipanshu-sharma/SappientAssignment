import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Datatable from '../component/data-table'
import { withRouter } from 'react-router';
import './style.scss'

const Homepage = (props) => {

  const [url,] = useState('https://api.spaceXdata.com/v3/launches?')
  const [pathParamUrl, setPathParamUrl] = useState('limit=100')
  const [satelliteData, setSatelliteData] = useState()
  const [launchSuccess, setLaunchSuccess] = useState()
  const [landSuccess, setLandSuccess] = useState()
  const [selectedLaunchYear, setSelectedLaunchYear] = useState()

  useEffect(() => {
    let pathParams = 'limit=100'

    pathParams = launchSuccess ? `${pathParams}&launch_success=${launchSuccess}` : `${pathParams}`

    pathParams = landSuccess ? `${pathParams}&land_success=${landSuccess}` : `${pathParams}`

    pathParams = selectedLaunchYear ? `${pathParams}&launch_year=${selectedLaunchYear}` : `${pathParams}`

    setPathParamUrl(pathParams)

    const fetchData = async () => {
      return axios
        .get(`${url}${pathParamUrl}`)
        .then(response => {
          setSatelliteData(response.data)
        })
    }

    props.history.push(`/api.spaceXdata.com/v3/launches?${pathParamUrl}`);

    pathParams === pathParamUrl && fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [launchSuccess, landSuccess, selectedLaunchYear, pathParamUrl])

  const handleLandFilter = (value) => {
    landSuccess && landSuccess === value ? setLandSuccess() : setLandSuccess(value)
  }

  const handleLaunchFilter = (value) => {
    launchSuccess && launchSuccess === value ? setLaunchSuccess() : setLaunchSuccess(value)
  }

  const handleYearFilter = (value) => {
    selectedLaunchYear && selectedLaunchYear === value ? setSelectedLaunchYear() : setSelectedLaunchYear(value)
  }

  return (
    <>
      <h1>SpaceX Launch Programs</h1>
      <Datatable
        data={satelliteData}
        handleLandFilter={handleLandFilter}
        handleLaunchFilter={handleLaunchFilter}
        handleYearFilter={handleYearFilter}
        landSuccess={landSuccess}
        launchSuccess={launchSuccess}
        launchYear={launchYear}
        selectedLaunchYear={selectedLaunchYear}

      />
      <h3>Developed by: Dipanshu Sharma</h3>
    </>
  )
}

const launchYear = [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020]

export default withRouter(Homepage)
