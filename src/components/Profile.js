// # IMPORTS
import React, { Component } from 'react';
import styled from 'styled-components';
import colors from './../constants/colors';
import { connect } from "react-redux";
import { UpdateData } from './../actions/index';
import { firestore, auth } from './../firebase/index';
import avatarThumbURL from './../images/avatar-thumb1.1.png';
// # STYLED
const ProfileTitle = styled.h1`
    font-size: 1.5em;
`;
const PreviewHolder = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
`;
const Preview = styled.img`
    width: 130px;
    height: 130px
    border-radius: 100%;
    border: 1px solid ${colors.grey};
    margin: auto;
`;
const ProfileAlert = styled.p`
    color: ${colors.alert};
    font-weight: bold;
    font-size: 0.9em;
    margin: 0px 10px;
    display: flex;
    flex-wrap: wrap;
    max-width: 300px;
    text-align: center;
    justify-content: center;
`;
const ProfileSubtitle = styled.h2`
    font-size: 1.3em;
    color: ${colors.special};
`;
const ValueTitle = styled.h3`
    font-size: 1.1em;
`;
const SectionForm = styled.form`
    border-radius: 10px;
    border: 1px solid ${colors.grey};
    padding: 10px;
`;
const WrappedProfile = styled.section`
    background: ${colors.fair};
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    padding: 40px 0px;
`;
// # COMPONENT
class Profile extends Component {
    constructor(){
        super()
        this.state = {
            firstnameValue: '',
            surnameValue: '',
            urlValue: '',
            avatarAler: null,
            personalAlert: null
        }
    }
    handleChange(evt){
        switch(evt.target.id){
            case 'updateFirstname':
                this.setState({firstnameValue: evt.target.value})
            break;
            case 'updateSurname':
                this.setState({surnameValue: evt.target.value})
            break;
            case 'updateURL':
                this.setState({urlValue: evt.target.value})
            break;
            default:
            break;
        }
    }
    submitAvatar(evt){
        evt.preventDefault();
        evt.stopPropagation();

        let urlCond = (this.state.urlValue.length > 0);

        if(urlCond){
            firestore.collection('users').doc(auth.currentUser.uid).update({
                imageURL: this.state.urlValue,
            })
            .then((data) => {
                this.updateStore();
            })
            .catch(function(error) {
                console.log(`# UPDATE ERROR - Code: ${error.code} Message: ${error.message}`);
            });
        } else {
            if(!urlCond){
                this.setState({avatarAlert: 'Paste valid image URL'});
            }
        }
    }
    submitPersonal(evt){
        evt.preventDefault();
        evt.stopPropagation();

        let firstnameCond = (this.state.firstnameValue.length > 0);
        let surnameCond = (this.state.surnameValue.length > 0);
        
        if(firstnameCond && surnameCond){
            firestore.collection('users').doc(auth.currentUser.uid).update({
                firstname: this.state.firstnameValue,
                surname: this.state.surnameValue
            })
            .then((data) => {
                this.updateStore();
            })
            .catch(function(error) {
                console.log(`# UPDATE ERROR - Code: ${error.code} Message: ${error.message}`);
            });
            
        } else {
            if(!firstnameCond){
                this.setState({personalAlert: 'Set your firstname.'})
            }
            if(!surnameCond){
                this.setState({personalAlert: 'Set your surname.'})
            }
        }
    }
    updateStore(){
        let user = auth.currentUser;
        let docRef = firestore.collection('users').doc(user.uid);
        docRef.get().then((doc) => {
            if(doc.exists){
                this.props.sendData(doc.data());
            }
        }).catch((error) => {
            console.log(`# READ ERROR - Code: ${error.code} Message: ${error.message}`);
        });
    }
    renderAvatarAlert(){
        if(this.state.avatarAlert != null){
            return <ProfileAlert>{this.state.avatarAlert}</ProfileAlert>
        }
    }
    renderPersonalAlert(){
        if(this.state.personalAlert != null){
            return <ProfileAlert>{this.state.personalAlert}</ProfileAlert>
        }
    }
    replaceImage(evt){
        evt.target.src = avatarThumbURL;
    }
    render(){
        return(
            <WrappedProfile>
                <ProfileTitle>Edit your profile</ProfileTitle>
                <ProfileSubtitle>Avatar</ProfileSubtitle>
                    <SectionForm>
                        <PreviewHolder>
                            <Preview src={this.state.urlValue} onError={this.replaceImage.bind(this)}/>
                        </PreviewHolder>
                        <ValueTitle>Image URL</ValueTitle>
                        <input 
                            type='text' 
                            id='updateURL' 
                            placeholder='URL of your avatar'  
                            value={this.state.urlValue}
                            onChange={this.handleChange.bind(this)}
                        />
                        <input type='submit' value='Udpate avatar' onClick={this.submitAvatar.bind(this)}/>
                        {this.renderAvatarAlert()}
                    </SectionForm>
                <ProfileSubtitle>Personal data</ProfileSubtitle>
                    <SectionForm>
                        <ValueTitle>First name</ValueTitle>
                        <input 
                            type='text' 
                            id='updateFirstname' 
                            placeholder='Your first name'  
                            value={this.state.firstnameValue}
                            onChange={this.handleChange.bind(this)}
                        />
                        <ValueTitle>Surname</ValueTitle>
                        <input 
                            type='text' 
                            id='updateSurname' 
                            placeholder='Your surname'  
                            value={this.state.surnameValue}
                            onChange={this.handleChange.bind(this)}
                        />
                        <input type='submit' value='Udpate personal' onClick={this.submitPersonal.bind(this)}/>
                        {this.renderPersonalAlert()}
                    </SectionForm>
            </WrappedProfile>
        );
    }
}
// # REDUX
const mapDispatchToProps = dispatch => {
    return {
        sendData: payload => dispatch(UpdateData(payload))
    };
};

export default connect(null, mapDispatchToProps)(Profile);