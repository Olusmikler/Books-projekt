import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, TextInput, Button, Alert, Modal, TouchableOpacity } from 'react-native';
import axios from 'axios';
import BooksList from './BookList';

interface Book {
  name: string;
  isbn: string;
  description: string;
  price: number;
  category: string;
}

const FormInput: React.FC<{ placeholder: string; value: string; onChangeText: (text: string) => void }> = ({
  placeholder,
  value,
  onChangeText,
}) => {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      style={styles.formInput}
    />
  );
};

const Add: React.FC = () => {
  const [name, setName] = useState('');
  const [isbn, setIsbn] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [showAddInfoModal, setShowAddInfoModal] = useState(false);
  const toggleAddInfoModal = () => {
    setShowAddInfoModal(!showAddInfoModal);
  };

  const handleAddBook = async () => {
    // Validate form data if needed
    if (name.trim() === '' || isbn.trim() === '') {
      Alert.alert('You have to input data in fields ISBN and name');
      return; 
    }
    const newBook: Book = { name, isbn, description, price, category };

    try {
      const response = await axios.post('https://test-api.dev.eura7.com/api/add-book', newBook, {
        headers: {
          accept: '*/*',
          Authorization: 'Bearer 6wQeJMfRojm6XPSx6wXfdTeBDSMoURqOjJFbk3DfxR1zC2PBq9LhLaRGXH0HQdUb',
          'Content-Type': 'multipart/form-data', // Use multipart/form-data for file uploads
        },
      });

      if (response.status === 200) {
        console.log('Book added successfully!');
        setName('');
        setIsbn('');
        setDescription('');
        setPrice('');
        setCategory('');
        toggleAddInfoModal();
        Alert.alert('You add book sucessfully!')
      } else {
        console.error('Error adding book:', response.data);
      }
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* <Button title="Add Book" onPress={toggleAddInfoModal}/> */}
      <TouchableOpacity style={styles.button} onPress={toggleAddInfoModal}>
        <Text style={styles.bolder}>Add book</Text>
      </TouchableOpacity>
      <Modal visible={showAddInfoModal} animationType="slide">
        <View style={styles.form}>
          <View style={styles.row}>
            <Text style={styles.title}>Add New Book</Text>
            <TouchableOpacity onPress={toggleAddInfoModal} style={styles.littleBtn}>
              <Text style={styles.littleTitle}>Back</Text>
            </TouchableOpacity>
          </View>
          <FormInput placeholder="Book Name" value={name} onChangeText={setName} />
          <FormInput placeholder="ISBN" value={isbn} onChangeText={setIsbn} />
          <FormInput placeholder="Description" value={description} onChangeText={setDescription} />
          <FormInput placeholder="Price" value={price} onChangeText={setPrice} keyboardType="numeric" />
          <FormInput placeholder="Category" value={category} onChangeText={setCategory} />
          <TouchableOpacity onPress={handleAddBook} style={styles.littleBtn}>
              <Text style={styles.littleTitle}>Add Book</Text>
          </TouchableOpacity>
          </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  formInput: {
    marginBottom: 10,
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  container: {
    position: 'absolute',
    bottom: 40,
    right: 30,
    zIndex: 1000
  },
  button: {
    backgroundColor: '#f0fddd',
    height:  80,
    zIndex: 1010,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    alignContent: 'center'
  },
  bolder: {
    fontWeight: 'bold',
    fontSize: 20,
    padding: 10
  },
  row: {
    flexDirection:'row',
    justifyContent: 'space-between',
    margin: 10
  },
  littleBtn: {
    alignItems: 'center',
    backgroundColor: '#f0fddd',
    borderRadius: 5
  },
  littleTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    padding: 5,
  }
});

export default Add;
