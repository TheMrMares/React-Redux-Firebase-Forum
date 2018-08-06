// # IMPORTS
import React, { Component } from 'react';
import styled from 'styled-components';
import colors from './../constants/colors';
import { connect } from "react-redux";
import Thread from './Thread';

// # STYLED
const StyledThread = styled(Thread)``;
const WrappedThreadList = styled.div`
    border-top: 1px solid ${colors.special};
    padding-top: 10px;
`;
// # COMPONENT
class ThreadList extends Component {
    render(){
        return(
            <WrappedThreadList className={this.props.className}>
                {this.props.data.threads.map((item ,index) => {
                    return <StyledThread title={item.title} text={item.text} userID={item.userID} key={index}/>
                })}
            </WrappedThreadList>
        );
    }
}
// # REDUX
const mapStateToProps = state => {
    return {
        data: state.data
    };
};
export default connect(mapStateToProps, null)(ThreadList);