import React from 'react'
import firebase from 'firebase'

const FreelancerContext = React.createContext({freelancer: firebase.auth().onAuthStateChanged(freelancer => {return freelancer})});

export const FreelancerProvider = FreelancerContext.Provider
export const FreelancerConsumer = FreelancerContext.Consumer

export default FreelancerContext
