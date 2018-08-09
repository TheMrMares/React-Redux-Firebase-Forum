// # IMPORTS
import React, { Component } from 'react';
import styled from 'styled-components';
import colors from './../constants/colors';
import avatarThumbURL from './../images/avatar-thumb1.1.png';
import AddComment from './AddComment';
import CommentList from './CommentList';
import resolutions from './../constants/resolutions';
// # STYLED
const StyledCommentList = styled(CommentList)`
    flex: 1 1 100%;
`;
const StyledAddComment = styled(AddComment)`
    flex: 0 0 100%; 
`;
const Cancel = styled.button`
    background: ${colors.alert};
    &:hover {
        box-shadow: 0px 0px 5px 0px ${colors.alert};
    }
`;
const DetailedHeader = styled.div`
flex: 0 0 auto;
    border-bottom: 1px solid ${colors.smoothdark};
`;
const DetailedBody = styled.div`    
    flex: 1 1 auto; 
    text-align: left;
`;
const DetailedFooter = styled.div`
    flex: 0 0 auto;
    border-top: 1px solid ${colors.smoothdark};
    display: flex;
    flex-direction: row;
`;
const LeftFooter = styled.div`
    display: flex;
    flex: 0 0 50%;
    justify-content: flex-start;
    align-items: center;
`;
const RightFooter = styled.div`
    display: flex;
    flex: 0 0 50%;
    justify-content: flex-end;
    align-items: center;
`;
const CloseDetailed = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1050;
    background: rgba(0,0,0 , 0.8);
`;
const ThreadTitle = styled.h1`
    margin: 5px 15px 5px 5px;
`;
const ThreadAvatar = styled.img`
    border: 1px solid ${colors.smoothdark};
    width: 30px;
    height: 30px;
    border-radius: 100%;
`;
const ThreadAuthor = styled.h2`
    margin: 5px;
    font-size: 0.8em;
    color: ${colors.fair};
`;
const Content = styled.p`
    margin: 3px;
`;
const CommentLabel = styled.h1`
    margin: 3px;
    font-size: 1em;
`;
const Detailed = styled.div`
    display: flex;
    flex-direction: column;
    background: ${colors.dark};
    border: 1px solid ${colors.smoothdark};
    border-radius: 10px;
    padding: 10px;
    height: 100%;
    ${DetailedHeader}, ${DetailedBody} {
        padding: 10px;
    }
`;
const CommentsArea = styled.div`
    background: ${colors.dark};
    border: 1px solid ${colors.smoothdark};
    border-radius: 10px;
    padding: 10px;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    height: 100%;
`;
const Wrapper = styled.article`
    position: fixed;
    z-index: 1050;
    width: 80%
    @media only screen and (max-width: ${resolutions.big}){
        width: 90%;
    }
    @media only screen and (max-width: ${resolutions.medium}){
        width: 95%;
    }
    @media only screen and (max-width: ${resolutions.small}){
        width:100%;
    }
    display: flex;
    flex-direciton: row;
    max-height: 80%;
    ${Detailed}, ${CommentsArea}{ 
        min-height: 500px;
    }
    ${Detailed}{
        width: 70%;
    }
    ${CommentsArea}{
        width: 30%;
    }
    @media only screen and (max-width: ${resolutions.medium}) {
        ${Detailed}{
            width: 50%;
        }
        ${CommentsArea}{
            width: 50%;
        }
    }
`;
const WrappedDetailedThread = styled.div`
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100%;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;
// # COMPONENT
export default class DetailedThread extends Component {
    informParent(){
        this.props.callbackForThread();
    }
    replaceImage(evt){
        evt.target.src = avatarThumbURL;
    }
    render(){
        return(
            <WrappedDetailedThread className={this.props.className}>
                <CloseDetailed onClick={this.informParent.bind(this)}/>
                <Wrapper>
                    <Detailed>
                        <DetailedHeader>
                            <ThreadTitle>{this.props.title}</ThreadTitle>
                        </DetailedHeader>
                        <DetailedBody>
                            <Content>{this.props.text}</Content>
                        </DetailedBody>
                        <DetailedFooter>
                            <LeftFooter>
                                <Cancel onClick={this.informParent.bind(this)}>Close</Cancel>
                            </LeftFooter>
                            <RightFooter>
                                <ThreadAvatar src={this.props.avatarURL} onError={this.replaceImage.bind(this)}/>
                                <ThreadAuthor>{this.props.author}</ThreadAuthor>
                            </RightFooter>
                        </DetailedFooter>
                    </Detailed>
                    <CommentsArea>
                        <CommentLabel>Add comment</CommentLabel>
                        <StyledAddComment refID={this.props.refID}/>
                        <CommentLabel>User comments</CommentLabel>
                        <StyledCommentList refID={this.props.refID}/>
                    </CommentsArea>
                </Wrapper>
            </WrappedDetailedThread>
        );
    }
}