import React, { useState, useEffect } from 'react';
import { Container, Row, Modal } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import { ChevronLeft } from 'react-feather';
import { url } from './../Components/Url';

export default function Appointment(){
  const navigate = useNavigate();
  const params = useParams();
  const appointment_id = params.appointment_id;
  const [code, setCode] = useState('');
  const [status, setStatus] = useState("Pending");
  const [first, setFirst] = useState(true);
  const [comment, setComment] = useState('')              // before comment
  const [remark, setRemark] = useState('');               // after comment
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [user, setUser] = useState({ name: "", phone: "", email: "", male: true, age: 13 });
  const [address, setAddress] = useState({ location: '', city: '' });
  const [timestamp, setTimestamp] = useState({ createdAt: new Date(), updatedAt: new Date() });
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if(appointment_id){
      //fetch appointment
      axios.post(url()+"one", { id: appointment_id })
      .then(res => {
        if(res.data.status){
          setUser(res.data.appointment.user);
          setCode(res.data.appointment.code);
          setStatus(res.data.appointment.status);
          setFirst(res.data.appointment.first);
          setComment(res.data.appointment.comment);
          setRemark(res.data.appointment.remark);
          setDate(res.data.appointment.date);
          setTime(res.data.appointment.time);
          setAddress(res.data.appointment.address);
          setTimestamp({ createdAt: new Date(res.data.appointment.createdAt), updatedAt: new Date(res.data.appointment.updatedAt) });
          document.getElementById('reqdate').valueAsDate = new Date(res.data.appointment.date)
        }
      })
    }
  }, []);

  const handleEdit = () => {
    const data = { id: appointment_id, user: user, status: status, first: first, comment: comment, remark: remark, date: date, time: time, address: address }
    if(!user.name || !user.phone || !user.email || !user.age || !address.location || !address.city || !date || !time){
      console.table(data);
      return alert("Please fill all required fields");
    }
    axios.post(url()+`edit`, data)
      .then(res => {
        if(res.data.status){
          setShow(false);
          navigate("/");
        }else{
          setShow(false);
          alert("Errorrrr")
        }
      })
      .catch(err => setLoading(false))
  }

  const handleSave = () => {
    if(appointment_id){
      // Update existing appointment
      setShow(true);
    }else{
      setLoading(true);
      // Create new appointment
      if(!user.name || !user.phone || !user.email || !user.age || !address.location || !address.city || !date || !time){
        setLoading(false);
        return alert("Please fill all required fields");
      }
      const data = { user: user, status: status, first: first, comment: comment, remark: remark, date: date, time: time, address: address }
      axios.post(url()+`new`, data)
      .then(res => {
        if(res.data.status){
          setLoading(false);
          navigate("/");
        }else{
          setLoading(false);
          alert("Errorrrr")
        }
      })
      .catch(err => setLoading(false))
    }
  }

  const handleUser = event => {
    const {name, value} = event.target
    setUser(existingValues => ({
      ...existingValues,
      [name]: value
    })) 
  }

  const parseDate = (date) => {
    const today = new Date(date);
    const year = String(today.getFullYear());
    let month = today.getMonth() + 1;
    let day = today.getDate();

    if(day < 10){
      day = "0"+day;
    }
    if(month < 10){
      month = "0"+month;
    }
    
    return `${day}/${month}/${year}`;
  }

  const editModal = () => {
    const styles = {
      footer: {
        borderTop: '1px solid #dbdbdb',
        padding: '15px 0px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
      },
    }
    return(
      <Modal size={"sm"} backdrop={"static"} show={show} onHide={() => setShow(false)}>
        <Modal.Body className="tbar" style={{ borderRadius: '5px'}}>
          <div style={{ textAlign: 'center' }}>
            <h5 style={{ fontSize: 23, lineHeight: '50px', fontFamily: "Open Sans, Arial, sans-serif", }}>Update Appointment?</h5>
            <p>Are you sure you want to update this appointment.</p>
          </div>
          <div style={styles.footer}>
            <button onClick={() => setShow(false)} className="cbtn">Cancel</button>
            <button onClick={() => handleEdit()} style={{ marginLeft: 15, backgroundColor: '#7a0a31' }} className="sbtn">Save Appointment</button>
          </div>
        </Modal.Body>
      </Modal>
    )
  }

  return(
    <Styles>
      <Container>
        <Row calssName="ml-0">
          <button onClick={() => navigate(-1)} className="backbtn">
            <ChevronLeft />
          </button>
          <span className="heading">{appointment_id?"EDIT RECORD":"NEW RECORD"}</span>
        </Row>
        <div className="section">
          <span className="heading">General Information</span>
          <Row className="ml-0 datarow">
            <div className="inpgroup">
              <label>Unique Code</label>
              <input value={code} type="text" disabled className="input" />
            </div>
            <div className="inpgroup">
              <label>Name *</label>
              <input value={user.name} onChange={e => handleUser(e)} name="name" type="text" className="input" />
            </div>
            <div className="inpgroup">
              <label>Sex *</label>
              <select value={user.male} name="male" onChange={e => handleUser(e)} className="input">
                <option label='Male' value={true} />
                <option label="Female" value={false} />
              </select>
            </div>
            <div className="inpgroup">
              <label>Phone *</label>
              <input value={user.phone} onChange={e => handleUser(e)} name="phone" type="text" className="input" />
            </div>
            <div className="inpgroup">
              <label>Email *</label>
              <input value={user.email} onChange={e => handleUser(e)} name="email" type="email" className="input" />
            </div>
            <div className="inpgroup">
              <label>Age *</label>
              <input value={user.age} onChange={e => handleUser(e)} name="age" type="number" className="input age" />
            </div>
          </Row>
        </div>
        <div className="section">
          <span className="heading">Appointment Information</span>
          <Row className="ml-0 datarow">
            <div className="inpgroup">
              <label>Created On</label>
              <input value={parseDate(timestamp.createdAt)} type="text" disabled className="input" />
            </div>
            <div className="inpgroup">
              <label>Last Updated</label>
              <input value={parseDate(timestamp.updatedAt)} disabled type="text" className="input" />
            </div>
            <div className="inpgroup">
              <label>First Time *</label>
              <select value={first} name="male" onChange={e => setFirst(e.target.value)} className="input">
                <option label='Yes' value={true} />
                <option label="No" value={false} />
              </select>
            </div>
            <div className="inpgroup">
              <label>Request Date *</label>
              <input id="reqdate" value={date} onChange={e => setDate(e.target.value)} type="date" className="input" />
            </div>
            <div className="inpgroup">
              <label>Requested Time *</label>
              <input value={time} onChange={e => setTime(e.target.value)} type="time" className="input" />
            </div>
            <div className="inpgroup">
              <label>Status *</label>
              <select value={status} name="male" onChange={e => setStatus(e.target.value)} className="input">
                <option label="Pending" value={"Pending"} />
                <option label="Passed" value={"Passed"} />
                <option label="Rescheduled" value={"Rescheduled"} />
                <option label="Missed" value={"Missed"} />
              </select>
            </div>
          </Row>
        </div>
        <div className="section">
          <span className="heading">Address Information</span>
          <Row className="ml-0 datarow" style={{ justifyContent: 'flex-start' }}>
            <div className="inpgroup" style={{ marginRight: 10 }}>
              <label>Address 1 *</label>
              <input value={address.location} onChange={e => setAddress({ location: e.target.value, city: address.city })} type="text" className="input" />
            </div>
            <div className="inpgroup">
              <label>City *</label>
              <input value={address.city} onChange={e => setAddress({ location: address.location, city: e.target.value })} type="text" className="input" />
            </div>
          </Row>
        </div>
        <div className="section">
          <span className="heading">Notes</span>
          <Row className="ml-0 datarow" style={{ justifyContent: 'flex-start', borderBottom: 0, marginBottom: 0 }}>
            <div className="inpgroup" style={{ marginRight: 10 }}>
              <label>Before Appointment</label>
              <textarea value={comment} onChange={e => setComment(e.target.value)} className="textarea"></textarea>
            </div>
            <div className="inpgroup">
              <label>After Appointment</label>
              <textarea value={remark} onChange={e => setRemark(e.target.value)} className="textarea" ></textarea>
            </div>
          </Row>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={() => handleSave()} className="savebtn">Save</button>
        </div>
      </Container>
      {editModal()}
    </Styles>
  )
}

const Styles = styled.div`
  margin-top: 8vh;
  padding-top: 50px;
  background-color: #eee;
  min-height: 92vh;
  padding-bottom: 30px;

  .backbtn{
    border: 0px;
    background-color: transparent;
    cursor: pointer;
    outline: none;
  }
  .heading{
    font-weight: bold;
  }
  .section{
    margin-top: 15px;
  }
  .inpgroup{
    display: inline-flex;
    flex-direction: column;
  }
  .datarow{
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    padding-bottom: 40px;
    margin-bottom: 40px;
    border-bottom: 1px solid #888;
  }
  label{
    font-size: 14px;
    font-weight: 500;
  }
  .input{
    border: 1px solid black;
    border-radius: 3px;
    background-color: white;
    min-width: 120px;
    padding: 5px 8px;
  }
  .age{
    width: 70px;
  }
  .textarea{
    height: 140px;
    resize: none;
    border: 1px solid black;
    border-radius: 3px;
    background-color: white;
    min-width: 300px;
    padding: 5px 8px;
  }
  .savebtn{
    border: 0px;
    padding: 6px 20px;
    background-color: #7a0a31;
    color: white;
    border-radius: 3px;
    cursor: pointer;
    outline: none;
  }

  @media screen and (max-width: 770px){
    .inpgroup{
      display: inline-flex;
      flex-direction: column;
      width: 95%;
      margin-bottom: 5px;
    }
  }
`;