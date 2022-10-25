import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import { Plus } from 'react-feather'
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from '@mui/material';

import { url } from '../Components/Url';

export default function Home(){
  const navigate = useNavigate();
  const defaultMaterialTheme = createTheme();
  const [data, setData] = useState([]);
  const [statistics, setStatistics] = useState({})

  useEffect(() => {
    axios.post(url(), {})
    .then(res => {
      if(res.data.status){
        setData(res.data.appointments);
        setStatistics(res.data.statistics);
      }
    })
  }, []);

  return(
    <React.Fragment>
      <Styles>
        <Container>
          <Row style={{ margin: 0 }}>
            <Col md="6" sm="12" className="d-flex">
              <div className="heading">
                <h5 className="headtxt">Appointments</h5>
                <div className="under" />
              </div>
            </Col>
          </Row>
          <Row className="secondrow">
            <Col className="d-flex resize" sm="12" md="4" style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div className="missed bigdiv">
                <span>Missed</span>
                <h4>{statistics.missed}</h4>
              </div>
            </Col>
            <Col className="d-flex resize" sm="12" md="4">
              <div className='rescheduled bigdiv'>
                <span>Rescheduled</span>
                <h4>{statistics.rescheduled}</h4>
              </div>
            </Col>
            <Col className="d-flex resize" sm="12" md="4">
              <div className="passed bigdiv">
                <span>Passed</span>
                <h4>{statistics.passed}</h4>
              </div>
            </Col>
          </Row>
        </Container>
        <Container style={{ marginTop: 20, width: '100%' }}>
          <div style={{ maxWidth: '100%' }}>
            <ThemeProvider theme={defaultMaterialTheme}>
              <MaterialTable
                columns={[
                  { title: 'Name', field: 'name' },
                  { title: 'Code', field: 'code' },
                  { title: 'Age', field: 'age', type: 'numeric' },
                  { title: 'Address', field: 'address' },
                  { title: 'Phone', field: 'phone' },
                  { 
                    title: 'Status',
                    field: 'status',
                    render: rowData => <div>{(rowData.status == "Passed")?(
                      <div className="passed smallstat">{rowData.status}</div>
                    ): (rowData.status == "Missed")?(
                      <div className="missed smallstat">{rowData.status}</div>
                    ): (rowData.status == "Rescheduled")?(
                      <div className="rescheduled smallstat">{rowData.status}</div>
                    ): (
                      <div className="pending smallstat">{rowData.status}</div>
                    )}</div>
                  },
                  { title: 'Appointment Date', field: 'appdate' },
                  { title: 'Recorded On', field: 'recdate' },
                  ]}
                  data={data}
                  actions={[
                    {
                      icon: 'visibility',
                      tooltip: 'Dispaly/Edit Appointment',
                      onClick: (event, rowData) => navigate("/appointment/" + rowData.id)
                    },
                  ]}
                  title="Appointments"
                  options={{
                    headerStyle: {
                      backgroundColor: 'white',
                      color: 'black',
                    },
                  }}
              />
            </ThemeProvider>
          </div>
          <button onClick={() => navigate('/appointment')} className="fab">
            <Plus />
          </button>
        </Container>
      </Styles>
    </React.Fragment>
  )
}

const Styles = styled.div`
  background-color: #eee;
  min-height: 92vh;
  margin-top: 8vh;
  padding-top: 50px;
  z-index: 10;

  .secondrow{
    margin: 0px;
    margin-top: 25px;
  }
  .heading{
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: flex-start;
  }
  .headtxt{
    color: #cc0000;
    font-family: "Open Sans", Arial, sans-serif;
  }
  .under{
    width: 80px;
    height: 2px;
    background-color: #cc0000;
  }
  .searchable{
    display: flex;
    justify-content: flex-end;
  }
  .inp{
    background-color: white;
    border-radius: 7px;
    display: flex;
    align-items: center;
    padding-right: 4px;
    width: 300px;
  }
  .input{
    border: 0px;
    padding: 4px 10px;
    outline: none;
    flex: 1;
    border-top-left-radius: 7px;
    border-bottom-left-radius: 7px;
  }
  .smallstat{
    display: flex;
    padding: 4px 10px;
    border-radius: 6px;
    flex-direction: column;
    font-weight: bold;
    font-size: 14px;
  }
  .bigdiv{
    // width: 100%;
    flex: 1;
    height: 100px;
    padding: 10px 25px;
    border-top-right-radius: 25px;
    border-bottom-left-radius: 25px;
  }
  .missed{
    background-color: rgba(250,0,0,0.1);
    color: red;
  }
  .rescheduled{
    background-color: rgba(255,255,0,0.2);
    color: orange;
  }
  .passed{
    background-color: rgba(0,250,0,0.1);
    color: green;
  }
  .pending{
    background-color: #dbdbdb;
    color: black;
  }
  span{
    color: black;
    font-weight: bold;
  }
  h4{
    font-size: 30px;
  }
  .headt{
    width: 100%;
    border-collapse: separate;
    border-spacing: 7px;
  }
  td{
    background-color: white;
    color: black;
    padding: 10px;
  }
  .head{
    font-weight: bold;
    border-spacing: 10px;
    border-radius: 5px;
  }
  tr{
    background-color: white;
  }
  .fab{
    position: fixed;
    bottom: 20px;
    right: 25px;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    color: white;
    background-color: #7a0a31;
    box-shadow: 1px 3px 20px 2px rgba(0,0,0,0.4);
    border: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    outline: none;
    &: hover{
      opacity: 0.7;
    }
  }

  @media screen and (max-width: 770px){
    .heading{
      font-size: 30px;
      line-height: 35.4px;
      font-family: "Open Sans", Arial, sans-serif;
      font-weight: 500;
    }
    .inp{
      width: 100%;
      margin-top: 20px;
    }
    .resize{
      margin-bottom: 10px;
    }
  }

`;