// # IMPORTS
import React, { Component } from 'react';
import styled from 'styled-components';
import colors from './../constants/colors';
import { connect } from "react-redux";
import Thread from './Thread';
// # STYLED
const StyledThread = styled(Thread)``;
const WrappedThreadList = styled.div`
    border-top: 1px solid ${colors.smoothdark};
    padding-top: 10px;
`;
// # COMPONENT
class ThreadList extends Component {
    constructor(){
        super()
        this.counter = 0;
    }
    render(){
        return(
            <WrappedThreadList className={this.props.className}>
                {this.props.threads.threads.map((item ,index) => {
                    return <StyledThread 
                        refID={item.ref.id} 
                        title={item.data().title} 
                        text={item.data().text} 
                        authorID={item.data().authorID} 
                        authorURL={item.data().authorURL}
                        authorFirstname={item.data().authorFirstname}
                        authorSurname={item.data().authorSurname}
                        key={this.counter++}
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