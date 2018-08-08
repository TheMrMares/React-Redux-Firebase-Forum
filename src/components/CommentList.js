// # IMPORTS
import React, { Component } from 'react';
import styled from 'styled-components';
import colors from './../constants/colors';
import {firestore} from './../firebase/index';
import UserComment from './UserComment';
// # STYLED
const StyledComment = styled(UserComment)`

`;
const WrappedCommentList = styled.div`
    border-top: 1px solid ${colors.smoothdark};
    overflow-y: scroll;
    padding: 5px;
`;
// # COMPONENT
export default class CommentList extends Component {
    constructor(){
        super();
        this.counter = 0;
        this.state = {
            comments: []
        }
    }
    componentDidMount(){
        //comments live updatec
        console.log('xd');
        firestore.collection('threads').doc(this.props.refID).collection('comments')
        .onSnapshot(() => {
            firestore.collection('threads').doc(this.props.refID).collection('comments').orderBy('created', 'desc').get().then((data) => {
                let filteredData = data.docs.filter((item) => {
                    if(item.ref.id !== 'template'){
                        return item;
                    }
                });
                this.setState({
                    comments: filteredData
                })
            }).catch((error) => {
                console.log(`# SET THREADS ERROR - Code: ${error.code} Message: ${error.message}`);
            });
        });
    }
    render(){
        return(
            <WrappedCommentList>
                {this.state.comments.map((item, index) => {
                    return <UserComment 
                        comment={item.data().comment} 
                        userID={item.data().userID} 
                        key={this.counter++}/>
                })}
            </WrappedCommentList>
        );
    }
}