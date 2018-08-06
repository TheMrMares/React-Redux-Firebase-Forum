// # IMPORTS
import React, { Component } from 'react';
import styled from 'styled-components';
import colors from './../constants/colors';
import avatarThumbURL from './../images/avatar-thumb1.1.png';
// # STYLED
const Cancel = styled.button`
    background: ${colors.alert};
`;
const DetailedHeader = styled.div`
    border-bottom: 1px solid ${colors.grey};
`;
const DetailedBody = styled.div`    
    text-align: left;
`;
const DetailedFooter = styled.div`
    border-top: 1px solid ${colors.grey};
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
    border: 1px solid ${colors.grey};
    width: 30px;
    height: 30px;
    border-radius: 100%;
    margin-right: 10px;
`;
const ThreadAuthor = styled.h2`
    margin: 5px;
    font-size: 0.8em;
    color: ${colors.special};
`;
const Content = styled.p`
    margin: 3px;
`;
const Detailed = styled.article`
    position: fixed;
    z-index: 1050;
    border: 1px solid ${colors.grey};
    border-radius: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    background: ${colors.fair};
    min-width: 60%
    ${DetailedHeader}, ${DetailedBody} {
        padding: 10px;
    }
`;
const WrappedDetailedThread = styled.div`
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;
// # COMPONENT
export default class DetailedThread extends Component {
    informParent(){
        console.log('inform');
        this.props.callbackForThread();
    }
    replaceImage(evt){
        evt.target.src = avatarThumbURL;
    }
    render(){
        return(
            <WrappedDetailedThread className={this.props.className}>
                <CloseDetailed onClick={this.informParent.bind(this)}/>
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
            </WrappedDetailedThread>
        );
    }
}