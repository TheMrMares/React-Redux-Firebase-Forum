// # IMPORTS
import React, { Component } from 'react';
import styled from 'styled-components';
import colors from './../constants/colors';
import { connect } from "react-redux";
import Thread from './Thread';
import uuidv4 from 'uuid/v4'
// # STYLED
const StyledThread = styled(Thread)``;
const WrappedThreadList = styled.div`
    border-top: 1px solid ${colors.smoothdark};
    padding-top: 10px;
`;
// # COMPONENT
class ThreadList extends Component {
    render(){
        return(
            <WrappedThreadList className={this.props.className}>
                {this.props.threads.threads.map((item ,index) => {
                    let timestamp = item.data().created;
                    let date = new Date(timestamp.seconds*1000);
                    let day = `${date.getDate()}`;
                    let month = `${date.getMonth()+1}`;
                    if(day.length === 1){
                        day = `0${day}`;
                    }
                    if(month.length === 1){
                        month = `0${month}`;
                    }
                    let year = date.getFullYear();
                    let normalDate = `${day} / ${month} / ${year}`;
                    return <StyledThread 
                        refID={item.ref.id} 
                        title={item.data().title} 
                        text={item.data().text} 
                        authorID={item.data().authorID} 
                        authorURL={item.data().authorURL}
                        authorFirstname={item.data().authorFirstname}
                        authorSurname={item.data().authorSurname}
                        created={normalDate}
                        key={uuidv4()}
                    />
                })}
            </WrappedThreadList>
        );
    }
}
// # REDUX
const mapStateToProps = state => {
    return {
        threads: state.threads
    };
};
export default connect(mapStateToProps, null)(ThreadList);