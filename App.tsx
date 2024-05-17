import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Add from './components/New_book';
import BooksList from './components/BookList';

export default function App() {
  return (
      <React.Fragment>
        <Header></Header>
        <BooksList></BooksList>
        <Add></Add>
      </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
