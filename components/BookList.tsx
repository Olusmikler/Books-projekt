import React, { useState, useEffect } from 'react';
import { FlatList, View, Text } from 'react-native';
import axios from 'axios';

const BooksList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState('');

  interface ApiError {
    message: string;
  }
  
  useEffect(() => {
    const fetchData = async () => {
        const accessToken: string = '6wQeJMfRojm6XPSx6wXfdTeBDSMoURqOjJFbk3DfxR1zC2PBq9LhLaRGXH0HQdUb';

        try {
          const response = await axios.get('https://test-api.dev.eura7.com/api/get-all-books', {
            headers: {
              'accept': 'application/ld+json',
              'Authorization': `Bearer ${accessToken}`, 
            },
          });
          const apiData: { data: Book[] } = response.data; 
          setBooks(apiData.data);
        } catch (error: unknown) {
            const typedError: ApiError = { message: 'An unknown error occurred' };
            if (error.response && error.response.data) { 
              typedError.message = error.response.data.message || 'API error';
            }
          setError(error.message);
        }
      };
  
      fetchData();
  }, []);

  if (error) {
    return <Text>Wystąpił błąd: {error}</Text>;
  }

  if (!books.length) {
    return <Text>Brak książek w bazie danych</Text>;
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', padding: 50, borderBottomWidth: 1, borderColor: '#ccc' }}>
            <Text style={{ flex: 1 }}>{item.name}</Text>
            <Text style={{ width: 50, textAlign: 'right' }}>{item.price}</Text>
          </View>
        )}
      />
    </View>
  );
};

interface Book {
    id: number;
    name: string;
    isbn: string;
    description: string;
    price: string;
    category: string;
  }
  
export default BooksList;
